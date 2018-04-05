import { CreateElement, ElementTypeGetter, Node } from '../../types'
import { Markup, Atom, MarkupSection } from '../../types/Mobiledoc'
import { throwError } from '../../utils'
import MarkersRenderer from '../MarkersRenderer'

export interface Options {
  createElement: CreateElement
  getAtomComponent: ElementTypeGetter
  getElement: ElementTypeGetter
}

export interface Context {
  markups: Markup[]
  atoms: Atom[]
}

export default ({ createElement, getAtomComponent, getElement }: Options) => ({
  markups,
  atoms
}: Context) => ([, tagName, markers]: MarkupSection): Node =>
  createElement(
    getElement(tagName) ||
      throwError(
        `Unhandled element: the markup section \`'${tagName}'\` has no corresponding handler.`
      ),
    {},
    ...MarkersRenderer({ createElement, getAtomComponent, getElement })({
      markups,
      atoms
    })(markers)
  )
