// any `createElement` output; we’re not interested in its implementation
export type Node = string | object | void

// React-like pure component signature
export type Component = string | ((props: object) => Node)

// Hyperscript-like `createElement` signature
export type Renderer = (
  el: string | Component,
  props?: object,
  children?: Node[]
) => any
