import { CreateElement, ElementTypeGetter, Node } from '../../types'
import { ImageSectionTagName, ImageSection } from '../../types/Mobiledoc'
import { throwError } from '../../utils'

const TAG_NAME = ImageSectionTagName.img

export interface Options {
  createElement: CreateElement
  getElement: ElementTypeGetter
}

export default ({ createElement, getElement }: Options) => ([
  ,
  src
]: ImageSection): Node =>
  createElement(
    getElement(TAG_NAME) ||
      throwError(
        `Unhandled element: the image section tag name \`'${TAG_NAME}'\` has no corresponding handler.`
      ),
    { src }
  )
