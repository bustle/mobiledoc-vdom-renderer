import { ElementTypeGetter, Node } from '../../../../types'
import { Atom } from '../../../../types/Mobiledoc'
import { throwError } from '../../../../utils'

export interface Options {
  getAtomComponent: ElementTypeGetter
}

export default ({ getAtomComponent }: Options) => ([
  type,
  text,
  payload
]: Atom): Node => {
  const Tag =
    getAtomComponent(type) ||
    throwError(
      `Unhandled atom: \`getAtomComponent('${type}')\` did not return a corresponding component.`
    )

  return <Tag payload={payload}>{text}</Tag>
}
