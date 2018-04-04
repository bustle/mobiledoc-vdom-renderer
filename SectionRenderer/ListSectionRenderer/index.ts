import * as Mobiledoc from '../../types/Mobiledoc'
import * as Vdom from '../../types/Vdom'
import * as Renderer from '../../types/Renderer'
import { throwError } from '../../utils'
import MarkersRenderer from '../MarkersRenderer'

const ITEM_TAG_NAME = Mobiledoc.ListItemTagName.li

export interface Options {
  createElement: Vdom.Renderer
  getElement: Renderer.ComponentGetter
  getAtomComponent: Renderer.ComponentGetter
}

export interface Context {
  markups: Mobiledoc.Markup[]
  atoms: Mobiledoc.Atom[]
}

export default ({ createElement, getAtomComponent, getElement }: Options) => ({
  markups,
  atoms
}: Context) => ([, tagName, items]: Mobiledoc.ListSection): Vdom.Node =>
  createElement(
    getElement(tagName) ||
      throwError(
        `Unhandled element: the list section tag name \`'${tagName}'\` has no corresponding handler.`
      ),
    {},
    ...items.map((item): Vdom.Node =>
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
