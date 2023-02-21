import { ElementTypeGetter, Node } from '../../types'
import { Marker, Atom, Markup } from '../../types/Mobiledoc'
import { pipe } from '../../utils'
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
  ...openMarkupIndexes.map(
    (markupIndex): MarkupNode => ({
      markup: markups[markupIndex],
      children: []
    })
  )
]

const MarkupNodesRenderer = ({ getMarkupComponent }: MarkupRendererOptions) => (
  nodes: MarkupNode[]
): Node =>
  nodes.reduceRight(
    (innerNode: Node, { markup, children }: MarkupNode): Node =>
      markup
        ? MarkupRenderer({ getMarkupComponent })(markup, [
            ...children,
            innerNode
          ])
        : [...children, innerNode],
    []
  )

const MarkerMarkupNodesCloser = ({
  getMarkupComponent
}: MarkupRendererOptions) => ([, , closedMarkupCount]: Marker) => (
  nodes: MarkupNode[]
): MarkupNode[] =>
  closedMarkupCount
    ? MarkupNodesChildAppender(
        MarkupNodesRenderer({ getMarkupComponent })(
          nodes.slice(-closedMarkupCount)
        )
      )(nodes.slice(0, -closedMarkupCount))
    : nodes

export interface Options {
  getAtomComponent: ElementTypeGetter
  getMarkupComponent: ElementTypeGetter
}

export interface Context {
  markups: Markup[]
  atoms: Atom[]
}

export default ({ getAtomComponent, getMarkupComponent }: Options) => ({
  markups,
  atoms
}: Context) => (markers: Marker[]): Node[] =>
  markers.reduce(
    (openMarkups: MarkupNode[], marker: Marker): MarkupNode[] =>
      pipe([
        MarkerMarkupNodesOpener({ markups })(marker),
        MarkupNodesChildAppender(
          MarkerContentRenderer({ getAtomComponent })({ atoms })(marker)
        ),
        MarkerMarkupNodesCloser({ getMarkupComponent })(marker)
      ])(openMarkups),
    [{ children: [] }]
  )[0].children
