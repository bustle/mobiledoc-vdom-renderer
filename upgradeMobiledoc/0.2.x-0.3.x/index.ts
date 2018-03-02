import Mobiledoc, * as MobiledocTypes from '../../types/Mobiledoc'
import Mobiledoc02x, * as Mobiledoc02xTypes from '../../types/Mobiledoc02x'
import pipe from '../../pipe'

const TARGET_VERSION = '0.3.1'

interface Accumulator {
  cards: MobiledocTypes.Card[]
  sections: Mobiledoc02xTypes.Section[]
}

const expandSections = (mobiledoc: Mobiledoc02x) => ({
  markups: mobiledoc.sections[0],
  ...mobiledoc.sections[1].reduce(
    ({ cards, sections }: Accumulator, section: Mobiledoc02xTypes.Section) =>
      section[0] === MobiledocTypes.SectionTypeIdentifier.CARD
        ? {
            cards: [
              ...cards,
              [section[1], section[2]]
            ] as MobiledocTypes.Card[],
            sections: [
              ...sections,
              [MobiledocTypes.SectionTypeIdentifier.CARD, cards.length]
            ] as Mobiledoc02xTypes.Section[]
          }
        : { cards, sections: [...sections, section] },
    { cards: [], sections: [] }
  )
})

const upgradeMarker = (
  marker: Mobiledoc02xTypes.Marker
): MobiledocTypes.Marker =>
  [MobiledocTypes.MarkerTypeIdentifier.TEXT, ...marker] as MobiledocTypes.Marker

const upgradeMarkupSection = ([
  typeIdentifier,
  tagName,
  markers
]: Mobiledoc02xTypes.MarkupSection): MobiledocTypes.MarkupSection => [
  typeIdentifier,
  (tagName === 'pull-quote'
    ? 'aside'
    : tagName) as MobiledocTypes.MarkupSectionTagName,
  markers.map(upgradeMarker)
]

const upgradeListSection = ([
  typeIdentifier,
  tagName,
  items
]: Mobiledoc02xTypes.ListSection): MobiledocTypes.ListSection => [
  typeIdentifier,
  tagName as MobiledocTypes.ListSectionTagName,
  items.map((markers: Mobiledoc02xTypes.Marker[]): MobiledocTypes.Marker[] =>
    markers.map(upgradeMarker)
  )
]

interface SectionUpgraderDictionary {
  [type: number]: (section: Mobiledoc02xTypes.Section) => MobiledocTypes.Section
}

const upgradeSection = (section: Mobiledoc02xTypes.Section) =>
  (({
    [MobiledocTypes.SectionTypeIdentifier.MARKUP]: upgradeMarkupSection,
    [MobiledocTypes.SectionTypeIdentifier.LIST]: upgradeListSection,
    [MobiledocTypes.SectionTypeIdentifier.IMAGE]: imageSection => imageSection,
    [MobiledocTypes.SectionTypeIdentifier.CARD]: cardSection => cardSection
  } as SectionUpgraderDictionary)[section[0]](section))

const upgradeSections = (mobiledoc: Mobiledoc02x) => ({
  ...mobiledoc,
  sections: mobiledoc.sections.map(upgradeSection)
})

const addAtoms = (mobiledoc: Mobiledoc02x) => ({ ...mobiledoc, atoms: [] })

export default (mobiledoc: Mobiledoc02x): Mobiledoc => ({
  version: TARGET_VERSION,
  ...pipe([expandSections, upgradeSections, addAtoms])(mobiledoc)
})
