export type Node = any

export type Component = (properties: Record<string, any>) => Node

export type ElementType = string | Component
