import { ElementType } from './CreateElement'

export { default as Mobiledoc } from './Mobiledoc'
export { Node } from './CreateElement'

export type ElementTypeGetter = (type: string) => ElementType
