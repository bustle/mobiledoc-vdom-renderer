import { CreateElement, ElementTypeGetter, Node } from '../../../types'
import { Card } from '../../../types/Mobiledoc'
import { throwError } from '../../../utils'

export interface Options {
  createElement: CreateElement
  getCardComponent: ElementTypeGetter
}

export default ({ createElement, getCardComponent }: Options) => ([
  type,
  payload
]: Card): Node =>
  createElement(
    getCardComponent(type) ||
      throwError(
        `Unhandled card: \`getCardComponent('${type}')\` did not return a corresponding component.`
      ),
    { payload }
  )
