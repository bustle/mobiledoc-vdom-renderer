import {
  CreateElement,
  ElementTypeGetter,
  Node
} from 'mobiledoc-vdom-renderer/types'
import { Marker, Atom, Markup } from 'mobiledoc-vdom-renderer/types/Mobiledoc'
import { pipe } from 'mobiledoc-vdom-renderer/utils'
import MarkupRenderer, {
  Options as MarkupRendererOptions
} from './MarkupRenderer'
import MarkerContentRenderer from './MarkerContentRenderer'

interface MarkupNode {
  markup?: Markup
  children: Node[]
}

const MarkupNodesChildAppender = (child: Node) => (nodes: MarkupNode[]) => [
  ...nodes.slice(0, -1),
  ...nodes
    .slice(-1)
    .map(({ markup, children }) => ({ markup, children: [...children, child] }))
]

interface MarkerMarkupsOpenerContext {
  markups: Markup[]
}

const MarkerMarkupNodesOpener = ({ markups }: MarkerMarkupsOpenerContext) => ([
  ,
  openMarkupIndexes
]: Marker) => (nodes: MarkupNode[]): MarkupNode[] => [
  ...nodes,
  ...openMarkupIndexes.map((markupIndex): MarkupNode => ({
    markup: markups[markupIndex],
    children: []
  }))
]

const MarkupNodesRenderer = ({
  createElement,
  getElement
}: MarkupRendererOptions) => (nodes: MarkupNode[]): Node =>
  nodes.reduceRight(
    (innerNode: Node, { markup, children }: MarkupNode): Node =>
      markup
        ? MarkupRenderer({ createElement, getElement })(markup, [
            ...children,
            innerNode
          ])
        : [...children, innerNode],
    []
  )

const MarkerMarkupNodesCloser = ({
  createElement,
  getElement
}: MarkupRendererOptions) => ([, , closedMarkupCount]: Marker) => (
  nodes: MarkupNode[]
): MarkupNode[] =>
  closedMarkupCount
    ? MarkupNodesChildAppender(
        MarkupNodesRenderer({ createElement, getElement })(
          nodes.slice(-closedMarkupCount)
        )
      )(nodes.slice(0, -closedMarkupCount))
    : nodes

export interface Options {
  createElement: CreateElement
  getAtomComponent: ElementTypeGetter
  getElement: ElementTypeGetter
}

export interface Context {
  markups: Markup[]
  atoms: Atom[]
}

export default ({ createElement, getAtomComponent, getElement }: Options) => ({
  markups,
  atoms
}: Context) => (markers: Marker[]): Node[] =>
  markers.reduce(
    (openMarkups: MarkupNode[], marker: Marker): MarkupNode[] =>
      pipe([
        MarkerMarkupNodesOpener({ markups })(marker),
        MarkupNodesChildAppender(
          MarkerContentRenderer({ createElement, getAtomComponent })({ atoms })(
            marker
          )
        ),
        MarkerMarkupNodesCloser({ createElement, getElement })(marker)
      ])(openMarkups),
    [{ children: [] }]
  )[0].children
