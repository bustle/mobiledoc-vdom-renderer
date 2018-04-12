import {
  CreateElement,
  AtomComponentGetter,
  ElementTypeGetter,
  Node
} from '../../types'
import {
  ListItemTagName,
  ListSection,
  Atom,
  Markup
} from '../../types/Mobiledoc'
import { throwError } from '../../utils'
import MarkersRenderer from '../MarkersRenderer'

const ITEM_TAG_NAME = ListItemTagName.li

export interface Options {
  createElement: CreateElement
  getElement: ElementTypeGetter
  getAtomComponent: AtomComponentGetter
}

export interface Context {
  markups: Markup[]
  atoms: Atom[]
}

export default ({ createElement, getAtomComponent, getElement }: Options) => ({
  markups,
  atoms
}: Context) => ([, tagName, items]: ListSection): Node =>
  createElement(
    getElement(tagName) ||
      throwError(
        `Unhandled element: the list section tag name \`'${tagName}'\` has no corresponding handler.`
      ),
    {},
    ...items.map((item): Node =>
      createElement(
        getElement(ITEM_TAG_NAME) ||
          throwError(
            `Unhandled element: the list item tag name \`'${tagName}'\` has no corresponding handler.`
          ),
        {},
        ...MarkersRenderer({ createElement, getAtomComponent, getElement })({
          markups,
          atoms
        })(item)
      )
    )
  )
