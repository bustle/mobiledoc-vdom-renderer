import * as Mobiledoc from '../../../types/Mobiledoc'
import * as Vdom from '../../../types/Vdom'
import * as Renderer from '../../../types/Renderer'
import { throwError } from '../../../utils'

const attributesArrayToAttributes = (attributesArray: string[]): object =>
  attributesArray.reduce(
    (accumulator, value, index) =>
      index % 2 !== 0
        ? { ...accumulator, [attributesArray[index - 1]]: value }
        : accumulator,
    {}
  )

export interface Options {
  createElement: Vdom.Renderer
  getElement: Renderer.ComponentGetter
}

export default ({ createElement, getElement }: Options) => (
  [tagName, attributesArray = []]: Mobiledoc.Markup,
  children: Vdom.Node[]
): Vdom.Node =>
  createElement(
    getElement(tagName) ||
      throwError(
        `Unhandled element: the markup tag name \`'${tagName}'\` has no corresponding handler.`
      ),
    attributesArrayToAttributes(attributesArray),
    ...children
  )
