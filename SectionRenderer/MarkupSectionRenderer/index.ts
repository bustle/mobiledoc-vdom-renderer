import * as Mobiledoc from '../../types/Mobiledoc'
import * as Vdom from '../../types/Vdom'
import * as Renderer from '../../types/Renderer'
import throwError from '../../throwError'
import MarkersRenderer from '../MarkersRenderer'

interface Options {
  createElement: Vdom.Renderer
  getAtomComponent: Renderer.ComponentGetter
  getElement: Renderer.ComponentGetter
}

interface Context {
  markups: Mobiledoc.Markup[]
  atoms: Mobiledoc.Atom[]
}

export default ({ createElement, getAtomComponent, getElement }: Options) => ({
  markups,
  atoms
}: Context) => ([, tagName, markers]: Mobiledoc.MarkupSection): Vdom.Node =>
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
