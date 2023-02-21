import { ElementTypeGetter, Node } from '../../types'
import { Card, CardSection } from '../../types/Mobiledoc'
import CardRenderer from './CardRenderer'

export interface Options {
  getCardComponent: ElementTypeGetter
}

export interface Context {
  cards: Card[]
}

export default ({ getCardComponent }: Options) => ({ cards }: Context) => ([
  ,
  index
]: CardSection): Node => CardRenderer({ getCardComponent })(cards[index])
