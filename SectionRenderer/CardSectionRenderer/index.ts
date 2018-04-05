import { CreateElement, ElementTypeGetter, Node } from '../../types'
import { Card, CardSection } from '../../types/Mobiledoc'
import CardRenderer from './CardRenderer'

export interface Options {
  createElement: CreateElement
  getCardComponent: ElementTypeGetter
}

export interface Context {
  cards: Card[]
}

export default ({ createElement, getCardComponent }: Options) => ({
  cards
}: Context) => ([, index]: CardSection): Node =>
  CardRenderer({ createElement, getCardComponent })(cards[index])
