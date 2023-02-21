import { ElementTypeGetter, Node } from '../../types'
import { ImageSectionTagName, ImageSection } from '../../types/Mobiledoc'
import { throwError } from '../../utils'

const TAG_NAME = ImageSectionTagName.img

export interface Options {
  getMarkupComponent: ElementTypeGetter
}

export default ({ getMarkupComponent }: Options) => ([
  ,
  src
]: ImageSection): Node => {
  const Tag =
    getMarkupComponent(TAG_NAME) ||
    throwError(
      `Unhandled element: the image section tag name \`'${TAG_NAME}'\` has no corresponding handler.`
    )
  return <Tag src={src} />
}
