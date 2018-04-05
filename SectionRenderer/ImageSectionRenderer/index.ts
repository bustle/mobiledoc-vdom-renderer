import {
  CreateElement,
  ElementTypeGetter,
  Node
} from 'mobiledoc-vdom-renderer/types'
import {
  ImageSectionTagName,
  ImageSection
} from 'mobiledoc-vdom-renderer/types/Mobiledoc'
import { throwError } from 'mobiledoc-vdom-renderer/utils'

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
