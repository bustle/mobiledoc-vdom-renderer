import { CreateElement, ElementTypeGetter, Node } from '../../types'
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
  getMarkupComponent: ElementTypeGetter
  getAtomComponent: ElementTypeGetter
}

export interface Context {
  markups: Markup[]
  atoms: Atom[]
}

export default ({
  createElement,
  getAtomComponent,
  getMarkupComponent
}: Options) => ({ markups, atoms }: Context) => ([
  ,
  tagName,
  items
]: ListSection): Node =>
  createElement(
    getMarkupComponent(tagName) ||
      throwError(
        `Unhandled element: the list section tag name \`'${tagName}'\` has no corresponding handler.`
      ),
    {},
    ...items.map(
      (item): Node =>
        createElement(
          getMarkupComponent(ITEM_TAG_NAME) ||
            throwError(
              `Unhandled element: the list item tag name \`'${tagName}'\` has no corresponding handler.`
            ),
          {},
          ...MarkersRenderer({
            createElement,
            getAtomComponent,
            getMarkupComponent
          })({
            markups,
            atoms
          })(item)
        )
    )
  )
