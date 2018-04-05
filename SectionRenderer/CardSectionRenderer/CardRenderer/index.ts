import {
  CreateElement,
  ElementTypeGetter,
  Node
} from 'mobiledoc-vdom-renderer/types'
import { Card } from 'mobiledoc-vdom-renderer/types/Mobiledoc'
import { throwError } from 'mobiledoc-vdom-renderer/utils'

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
