import * as Mobiledoc from '../../../types/Mobiledoc'
import * as Vdom from '../../../types/Vdom'
import * as Renderer from '../../../types/Renderer'
import throwError from '../../../throwError'

interface Options {
  createElement: Vdom.Renderer
  getCardComponent: Renderer.ComponentGetter
}

export default ({ createElement, getCardComponent }: Options) => ([
  type,
  payload
]: Mobiledoc.Card): Vdom.Node =>
  createElement(
    getCardComponent(type) ||
      throwError(
        `Unhandled card: \`getCardComponent('${type}')\` did not return a corresponding component.`
      ),
    { payload }
  )
