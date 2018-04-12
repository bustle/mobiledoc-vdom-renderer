import { ElementType, Node } from './CreateElement'

export { default as Mobiledoc } from './Mobiledoc'
export { default as CreateElement, Node } from './CreateElement'

export type CardComponent = (properties: object) => Node

export type AtomComponent = (properties: object) => Node

export type Getter<type> = (type: string) => type

export type CardComponentGetter = Getter<CardComponent>

export type AtomComponentGetter = Getter<AtomComponent>

export type ElementTypeGetter = Getter<ElementType>
