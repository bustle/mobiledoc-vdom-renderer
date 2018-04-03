import * as Mobiledoc from '../types/Mobiledoc'
import * as Vdom from '../types/Vdom'
import * as Renderer from '../types/Renderer'
import MarkupSectionRenderer from './MarkupSectionRenderer'
import ImageSectionRenderer from './ImageSectionRenderer'
import ListSectionRenderer from './ListSectionRenderer'
import CardSectionRenderer from './CardSectionRenderer'

export interface Options {
  createElement: Vdom.Renderer
  getCardComponent: Renderer.ComponentGetter
  getAtomComponent: Renderer.ComponentGetter
  getElement: Renderer.ComponentGetter
}

export interface Context {
  markups: Mobiledoc.Markup[]
  cards: Mobiledoc.Card[]
  atoms: Mobiledoc.Atom[]
}

interface RendererDictionary {
  [type: number]: (section: Mobiledoc.Section) => Vdom.Node
}

export default ({
  createElement,
  getCardComponent,
  getAtomComponent,
  getElement
}: Options) => ({ markups, cards, atoms }: Context) => (
  section: Mobiledoc.Section
): Vdom.Node =>
  (({
    [Mobiledoc.SectionTypeIdentifier.MARKUP]: MarkupSectionRenderer({
      createElement,
      getAtomComponent,
      getElement
    })({ markups, atoms }),

    [Mobiledoc.SectionTypeIdentifier.IMAGE]: ImageSectionRenderer({
      createElement,
      getElement
    }),

    [Mobiledoc.SectionTypeIdentifier.LIST]: ListSectionRenderer({
      createElement,
      getAtomComponent,
      getElement
    })({ markups, atoms }),

    [Mobiledoc.SectionTypeIdentifier.CARD]: CardSectionRenderer({
      createElement,
      getCardComponent
    })({ cards })
  } as RendererDictionary)[section[0]](section))
