import * as Mobiledoc from '../../../../types/Mobiledoc'
import * as Vdom from '../../../../types/Vdom'
import * as Renderer from '../../../../types/Renderer'
import throwError from '../../../../throwError'

interface Options {
  createElement: Vdom.Renderer
  getAtomComponent: Renderer.ComponentGetter
}

export default ({ createElement, getAtomComponent }: Options) => ([
  type,
  text,
  payload
]: Mobiledoc.Atom): Vdom.Node =>
  createElement(
    getAtomComponent(type) ||
      throwError(
        `Unhandled atom: \`getAtomComponent('${type}')\` did not return a corresponding component.`
      ),
    payload,
    [text]
  )
