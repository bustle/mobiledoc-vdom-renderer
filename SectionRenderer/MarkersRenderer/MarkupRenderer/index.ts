import {
  CreateElement,
  ElementTypeGetter,
  Node
} from 'mobiledoc-vdom-renderer/types'
import { Markup } from 'mobiledoc-vdom-renderer/types/Mobiledoc'
import { throwError } from 'mobiledoc-vdom-renderer/utils'

const attributesArrayToAttributes = (attributesArray: string[]): object =>
  attributesArray.reduce(
    (accumulator, value, index) =>
      index % 2 !== 0
        ? { ...accumulator, [attributesArray[index - 1]]: value }
        : accumulator,
    {}
  )

export interface Options {
  createElement: CreateElement
  getElement: ElementTypeGetter
}

export default ({ createElement, getElement }: Options) => (
  [tagName, attributesArray = []]: Markup,
  children: Node[]
): Node =>
  createElement(
    getElement(tagName) ||
      throwError(
        `Unhandled element: the markup tag name \`'${tagName}'\` has no corresponding handler.`
      ),
    attributesArrayToAttributes(attributesArray),
    ...children
  )
