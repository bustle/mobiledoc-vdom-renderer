import Mobiledoc, {
  SectionTypeIdentifier,
  Section,
  Marker,
  MarkerTypeIdentifier,
  ListSectionTagName,
  MarkupSectionTagName,
  ListSection,
  MarkupSection,
  CardSection,
  Card
} from 'mobiledoc-vdom-renderer/types/Mobiledoc/0.3'
import Mobiledoc02, {
  Section as Section02,
  Marker as Marker02,
  MarkupSection as MarkupSection02,
  ListSection as ListSection02
} from 'mobiledoc-vdom-renderer/types/Mobiledoc/0.2'
import { pipe } from 'mobiledoc-vdom-renderer/utils'

const TARGET_VERSION = '0.3.1'

/* Extract cards from sections */

interface ContentAccumulator {
  cards: Card[]
  sections: Section[]
}

const expandSections = (mobiledoc: Mobiledoc02) => ({
  markups: mobiledoc.sections[0],
  ...mobiledoc.sections[1].reduce(
    ({ cards, sections }: ContentAccumulator, section: Section02) =>
      section[0] === SectionTypeIdentifier.CARD
        ? {
            cards: [...cards, [section[1], section[2]]] as Card[],
            sections: [
              ...sections,
              [SectionTypeIdentifier.CARD, cards.length] as CardSection
            ]
          }
        : { cards, sections: [...sections, section as Section] },
    { cards: [], sections: [] }
  )
})

/* Upgrade markers by adding `typeIdentifier` */

const upgradeMarker = (marker: Marker02): Marker =>
  [MarkerTypeIdentifier.TEXT, ...marker] as Marker

/* Upgrade markup sections (`pull-quote` -> `aside`, upgrade markers) */

const upgradeMarkupSection = ([
  typeIdentifier,
  tagName,
  markers
]: MarkupSection02): MarkupSection => [
  typeIdentifier,
  (tagName === 'pull-quote' ? 'aside' : tagName) as MarkupSectionTagName,
  markers.map(upgradeMarker)
]

/* Upgrade list sections (upgrade markers) */

const upgradeListSection = ([
  typeIdentifier,
  tagName,
  items
]: ListSection02): ListSection => [
  typeIdentifier,
  tagName as ListSectionTagName,
  items.map((markers: Marker02[]): Marker[] => markers.map(upgradeMarker))
]

/* Section handler */

interface SectionUpgraderDictionary {
  [type: number]: (section: Section02) => Section
}

const upgradeSection = (section: Section02) =>
  (({
    [SectionTypeIdentifier.MARKUP]: upgradeMarkupSection,
    [SectionTypeIdentifier.LIST]: upgradeListSection,
    [SectionTypeIdentifier.IMAGE]: imageSection => imageSection,
    [SectionTypeIdentifier.CARD]: cardSection => cardSection
  } as SectionUpgraderDictionary)[section[0]](section))

const upgradeSections = (mobiledoc: Mobiledoc02) => ({
  ...mobiledoc,
  sections: mobiledoc.sections.map(upgradeSection)
})

/* Add atoms */

const addAtoms = (mobiledoc: Mobiledoc02) => ({ ...mobiledoc, atoms: [] })

/* Update the version */

const setVersion = (targetVersion: string) => (mobiledoc: Mobiledoc) => ({
  ...mobiledoc,
  version: targetVersion
})

const updateVersion = setVersion(TARGET_VERSION)

/* Upgrade Mobiledoc 0.2.x to 0.3.x */

export default (mobiledoc: Mobiledoc02): Mobiledoc =>
  pipe([expandSections, upgradeSections, addAtoms, updateVersion])(mobiledoc)
