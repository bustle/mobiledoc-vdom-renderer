import { CreateElement, AtomComponentGetter, Node } from '../../../../types'
import { Atom } from '../../../../types/Mobiledoc'
import { throwError } from '../../../../utils'

export interface Options {
  createElement: CreateElement
  getAtomComponent: AtomComponentGetter
}

export default ({ createElement, getAtomComponent }: Options) => ([
  type,
  text,
  payload
]: Atom): Node =>
  createElement(
    getAtomComponent(type) ||
      throwError(
        `Unhandled atom: \`getAtomComponent('${type}')\` did not return a corresponding component.`
      ),
    { payload },
    text
  )
