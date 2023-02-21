import { ElementTypeGetter, Node } from '../../../types'
import { Markup } from '../../../types/Mobiledoc'
import { throwError } from '../../../utils'

const attributesArrayToAttributes = (attributesArray: string[]): object =>
  attributesArray.reduce(
    (accumulator, value, index) =>
      index % 2 !== 0
        ? { ...accumulator, [attributesArray[index - 1]]: value }
        : accumulator,
    {}
  )

export interface Options {
  getMarkupComponent: ElementTypeGetter
}

export default ({ getMarkupComponent }: Options) => (
  [tagName, attributesArray = []]: Markup,
  children: Node[]
): Node => {
  const Tag =
    getMarkupComponent(tagName) ||
    throwError(
      `Unhandled element: the markup tag name \`'${tagName}'\` has no corresponding handler.`
    )

  return <Tag {...attributesArrayToAttributes(attributesArray)}>{children}</Tag>
}
