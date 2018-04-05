import { ElementTypeGetter } from 'mobiledoc-vdom-renderer/types'
import {
  MarkupSectionTagName,
  ImageSectionTagName,
  ListSectionTagName,
  ListItemTagName,
  MarkupTagName
} from 'mobiledoc-vdom-renderer/types/Mobiledoc'
import { ElementType } from 'mobiledoc-vdom-renderer/types/CreateElement'
import {
  includedIn,
  objectValues,
  throwError
} from 'mobiledoc-vdom-renderer/utils'

const isValidElement: (tagName: string) => boolean = includedIn(
  objectValues({
    ...MarkupSectionTagName,
    ...ImageSectionTagName,
    ...ListSectionTagName,
    ...ListItemTagName,
    ...MarkupTagName
  })
)

const getElementDefault: ElementTypeGetter = (tagName: string): ElementType =>
  isValidElement(tagName)
    ? tagName
    : throwError(`\`${tagName}\` is not a supported Mobiledoc tag.`)

export default getElementDefault
