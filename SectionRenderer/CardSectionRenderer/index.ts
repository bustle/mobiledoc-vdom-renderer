import * as Mobiledoc from '../../types/Mobiledoc'
import * as Vdom from '../../types/Vdom'
import * as Renderer from '../../types/Renderer'
import CardRenderer from './CardRenderer'

interface Options {
  createElement: Vdom.Renderer
  getCardComponent: Renderer.ComponentGetter
}

interface Context {
  cards: Mobiledoc.Card[]
}

export default ({ createElement, getCardComponent }: Options) => ({
  cards
}: Context) => ([, index]: Mobiledoc.CardSection): Vdom.Node =>
  CardRenderer({ createElement, getCardComponent })(cards[index])
