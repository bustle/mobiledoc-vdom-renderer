import {
  CreateElement,
  ElementTypeGetter,
  Node
} from 'mobiledoc-vdom-renderer/types'
import {
  ListItemTagName,
  ListSection,
  Atom,
  Markup
} from 'mobiledoc-vdom-renderer/types/Mobiledoc'
import { throwError } from 'mobiledoc-vdom-renderer/utils'
import MarkersRenderer from '../MarkersRenderer'

const ITEM_TAG_NAME = ListItemTagName.li

export interface Options {
  createElement: CreateElement
  getElement: ElementTypeGetter
  getAtomComponent: ElementTypeGetter
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
