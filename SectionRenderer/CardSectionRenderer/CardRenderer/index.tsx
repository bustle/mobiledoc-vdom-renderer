import { ElementTypeGetter, Node } from '../../../types'
import { Card } from '../../../types/Mobiledoc'
import { throwError } from '../../../utils'

export interface Options {
  getCardComponent: ElementTypeGetter
}

export default ({ getCardComponent }: Options) => ([
  type,
  payload
]: Card): Node => {
  const Type =
    getCardComponent(type) ||
    throwError(
      `Unhandled card: \`getCardComponent('${type}')\` did not return a corresponding component.`
    )
  return <Type payload={payload} />
}
