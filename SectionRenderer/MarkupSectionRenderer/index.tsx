import { ElementTypeGetter, Node } from '../../types'
import { Markup, Atom, MarkupSection } from '../../types/Mobiledoc'
import { throwError } from '../../utils'
import MarkersRenderer from '../MarkersRenderer'

export interface Options {
  getAtomComponent: ElementTypeGetter
  getMarkupComponent: ElementTypeGetter
}

export interface Context {
  markups: Markup[]
  atoms: Atom[]
}

const attributesArrayToAttributes = (attributesArray: string[]): object =>
  attributesArray.reduce(
    (accumulator, value, index) =>
      index % 2 !== 0
        ? { ...accumulator, [attributesArray[index - 1]]: value }
        : accumulator,
    {}
  )

export default ({ getAtomComponent, getMarkupComponent }: Options) => ({
  markups,
  atoms
}: Context) => ([, tagName, markers, attributes]: MarkupSection): Node => {
  const Tag =
    getMarkupComponent(tagName) ||
    throwError(
      `Unhandled element: the markup section \`'${tagName}'\` has no corresponding handler.`
    )

  return (
    <Tag {...attributesArrayToAttributes(attributes || [])}>
      {MarkersRenderer({ getAtomComponent, getMarkupComponent })({
        markups,
        atoms
      })(markers)}
    </Tag>
  )
}
