import { CreateElement, ElementTypeGetter, Node } from '../../types'
import { Markup, Atom, MarkupSection } from '../../types/Mobiledoc'
import { throwError } from '../../utils'
import MarkersRenderer from '../MarkersRenderer'

export interface Options {
  createElement: CreateElement
  getAtomComponent: ElementTypeGetter
  getMarkupComponent: ElementTypeGetter
}

export interface Context {
  markups: Markup[]
  atoms: Atom[]
}

const attributesArrayToAttributes = (attributesArray: string[]): object =>
  attributesArray.reduce(
    (accumulator, value, index) =>
      index % 2 !== 0
        ? { ...accumulator, [attributesArray[index - 1]]: value }
        : accumulator,
    {}
  )

export default ({
  createElement,
  getAtomComponent,
  getMarkupComponent
}: Options) => ({ markups, atoms }: Context) => ([
  ,
  tagName,
  markers,
  attributes
]: MarkupSection): Node =>
  createElement(
    getMarkupComponent(tagName) ||
      throwError(
        `Unhandled element: the markup section \`'${tagName}'\` has no corresponding handler.`
      ),
    attributesArrayToAttributes(attributes || []),
    ...MarkersRenderer({ createElement, getAtomComponent, getMarkupComponent })(
      {
        markups,
        atoms
      }
    )(markers)
  )
