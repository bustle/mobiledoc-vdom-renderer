import { ElementTypeGetter, Node } from '../../types'
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
  getMarkupComponent: ElementTypeGetter
  getAtomComponent: ElementTypeGetter
}

export interface Context {
  markups: Markup[]
  atoms: Atom[]
}

export default ({ getAtomComponent, getMarkupComponent }: Options) => ({
  markups,
  atoms
}: Context) => ([, tagName, items]: ListSection): Node => {
  const Tag =
    getMarkupComponent(tagName) ||
    throwError(
      `Unhandled element: the list section tag name \`'${tagName}'\` has no corresponding handler.`
    )

  return (
    <Tag>
      {items.map(
        (item): Node => {
          const Tag =
            getMarkupComponent(ITEM_TAG_NAME) ||
            throwError(
              `Unhandled element: the list item tag name \`'${tagName}'\` has no corresponding handler.`
            )
          return (
            <Tag>
              {MarkersRenderer({ getAtomComponent, getMarkupComponent })({
                markups,
                atoms
              })(item)}
            </Tag>
          )
        }
      )}
    </Tag>
  )
}
