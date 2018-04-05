/*
  Abstract `createElement` definitions; we’re not worried about the
  particulars
*/

export type Node = any

export type Component = (properties: object) => Node

export type ElementType = string | Component

export type CreateElement = (
  elementType: ElementType,
  properties?: object,
  ...children: Node[] // eslint-disable-line fp/no-rest-parameters
) => Node

export default CreateElement
