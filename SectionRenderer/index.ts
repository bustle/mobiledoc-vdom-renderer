import { ElementTypeGetter, Node } from '../types'
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
  getCardComponent: ElementTypeGetter
  getAtomComponent: ElementTypeGetter
  getMarkupComponent: ElementTypeGetter
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
  getCardComponent,
  getAtomComponent,
  getMarkupComponent
}: Options) => ({ markups, cards, atoms }: Context) => (
  section: Section
): Node =>
  (({
    [SectionTypeIdentifier.MARKUP]: MarkupSectionRenderer({
      getAtomComponent,
      getMarkupComponent
    })({ markups, atoms }),

    [SectionTypeIdentifier.IMAGE]: ImageSectionRenderer({
      getMarkupComponent
    }),

    [SectionTypeIdentifier.LIST]: ListSectionRenderer({
      getAtomComponent,
      getMarkupComponent
    })({ markups, atoms }),

    [SectionTypeIdentifier.CARD]: CardSectionRenderer({
      getCardComponent
    })({ cards })
  } as RendererDictionary)[section[0]](section))
