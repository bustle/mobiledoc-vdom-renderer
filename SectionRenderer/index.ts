import {
  CreateElement,
  CardComponentGetter,
  AtomComponentGetter,
  ElementTypeGetter,
  Node
} from '../types'
import {
  Markup,
  Card,
  Atom,
  Section,
  SectionTypeIdentifier
} from '../types/Mobiledoc'
import MarkupSectionRenderer from './MarkupSectionRenderer'
import ImageSectionRenderer from './ImageSectionRenderer'
import ListSectionRenderer from './ListSectionRenderer'
import CardSectionRenderer from './CardSectionRenderer'

export interface Options {
  createElement: CreateElement
  getCardComponent: CardComponentGetter
  getAtomComponent: AtomComponentGetter
  getElement: ElementTypeGetter
}

export interface Context {
  markups: Markup[]
  cards: Card[]
  atoms: Atom[]
}

interface RendererDictionary {
  [type: number]: (section: Section) => Node
}

export default ({
  createElement,
  getCardComponent,
  getAtomComponent,
  getElement
}: Options) => ({ markups, cards, atoms }: Context) => (
  section: Section
): Node =>
  (({
    [SectionTypeIdentifier.MARKUP]: MarkupSectionRenderer({
      createElement,
      getAtomComponent,
      getElement
    })({ markups, atoms }),

    [SectionTypeIdentifier.IMAGE]: ImageSectionRenderer({
      createElement,
      getElement
    }),

    [SectionTypeIdentifier.LIST]: ListSectionRenderer({
      createElement,
      getAtomComponent,
      getElement
    })({ markups, atoms }),

    [SectionTypeIdentifier.CARD]: CardSectionRenderer({
      createElement,
      getCardComponent
    })({ cards })
  } as RendererDictionary)[section[0]](section))
