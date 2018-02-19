import * as Mobiledoc from '../../types/Mobiledoc'
import * as Vdom from '../../types/Vdom'
import * as Renderer from '../../types/Renderer'
import throwError from '../../throwError'

const TAG_NAME = Mobiledoc.ImageSectionTagName.img

interface Options {
  createElement: Vdom.Renderer
  getElement: Renderer.ComponentGetter
}

export default ({ createElement, getElement }: Options) => ([
  ,
  src
]: Mobiledoc.ImageSection): Vdom.Node =>
  createElement(
    getElement(TAG_NAME) ||
      throwError(
        `Unhandled element: the image section tag name \`'${TAG_NAME}'\` has no corresponding handler.`
      ),
    { src }
  )
