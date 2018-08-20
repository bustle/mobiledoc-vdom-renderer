import { CreateElement, ElementTypeGetter, Node } from '../../types'
import { ImageSectionTagName, ImageSection } from '../../types/Mobiledoc'
import { throwError } from '../../utils'

const TAG_NAME = ImageSectionTagName.img

export interface Options {
  createElement: CreateElement
  getMarkupComponent: ElementTypeGetter
}

export default ({ createElement, getMarkupComponent }: Options) => ([
  ,
  src
]: ImageSection): Node =>
  createElement(
    getMarkupComponent(TAG_NAME) ||
      throwError(
        `Unhandled element: the image section tag name \`'${TAG_NAME}'\` has no corresponding handler.`
      ),
    { src }
  )
