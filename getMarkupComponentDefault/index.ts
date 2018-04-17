import { ElementTypeGetter } from '../types'
import {
  MarkupSectionTagName,
  ImageSectionTagName,
  ListSectionTagName,
  ListItemTagName,
  MarkupTagName
} from '../types/Mobiledoc'
import { ElementType } from '../types/CreateElement'
import { includedIn, objectValues, throwError } from '../utils'

const isValidElement: (tagName: string) => boolean = includedIn(
  objectValues({
    ...MarkupSectionTagName,
    ...ImageSectionTagName,
    ...ListSectionTagName,
    ...ListItemTagName,
    ...MarkupTagName
  })
)

const getMarkupComponentDefault: ElementTypeGetter = (
  tagName: string
): ElementType =>
  isValidElement(tagName)
    ? tagName
    : throwError(`\`${tagName}\` is not a supported Mobiledoc tag.`)

export default getMarkupComponentDefault
