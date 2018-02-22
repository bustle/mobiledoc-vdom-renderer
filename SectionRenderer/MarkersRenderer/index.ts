import pipe from '../../pipe'
import * as Mobiledoc from '../../types/Mobiledoc'
import * as Vdom from '../../types/Vdom'
import * as Renderer from '../../types/Renderer'
import MarkupRenderer from './MarkupRenderer'
import MarkerContentRenderer from './MarkerContentRenderer'

interface MarkupNode {
  markup?: Mobiledoc.Markup
  children: Vdom.Node[]
}

const MarkupNodesChildAppender = (child: Vdom.Node) => (
  nodes: MarkupNode[]
) => [
  ...nodes.slice(0, -1),
  ...nodes
    .slice(-1)
    .map(({ markup, children }) => ({ markup, children: [...children, child] }))
]

interface MarkerMarkupsOpenerContext {
  markups: Mobiledoc.Markup[]
}

const MarkerMarkupNodesOpener = ({ markups }: MarkerMarkupsOpenerContext) => ([
  ,
  openMarkupIndexes
]: Mobiledoc.Marker) => (nodes: MarkupNode[]): MarkupNode[] => [
  ...nodes,
  ...openMarkupIndexes.map((markupIndex): MarkupNode => ({
    markup: markups[markupIndex],
    children: []
  }))
]

interface MarkerMarkupsCloserOptions {
  createElement: Vdom.Renderer
  getElement: Renderer.ComponentGetter
}

const MarkerMarkupNodesCloser = ({
  createElement,
  getElement
}: MarkerMarkupsCloserOptions) => ([
  ,
  ,
  closedMarkupCount
]: Mobiledoc.Marker) => (nodes: MarkupNode[]): MarkupNode[] =>
  closedMarkupCount
    ? MarkupNodesChildAppender(
        nodes
          .slice(-closedMarkupCount)
          .reduceRight(
            (innerNode: Vdom.Node, { markup, children }): Vdom.Node =>
              markup
                ? MarkupRenderer({ createElement, getElement })(markup, [
                    ...children,
                    innerNode
                  ])
                : [...children, innerNode],
            []
          )
      )(nodes.slice(0, -closedMarkupCount))
    : nodes

interface Options {
  createElement: Vdom.Renderer
  getAtomComponent: Renderer.ComponentGetter
  getElement: Renderer.ComponentGetter
}

interface Context {
  markups: Mobiledoc.Markup[]
  atoms: Mobiledoc.Atom[]
}

export default ({ createElement, getAtomComponent, getElement }: Options) => ({
  markups,
  atoms
}: Context) => (markers: Mobiledoc.Marker[]): Vdom.Node[] =>
  markers.reduce(
    (openMarkups: MarkupNode[], marker: Mobiledoc.Marker): MarkupNode[] =>
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
