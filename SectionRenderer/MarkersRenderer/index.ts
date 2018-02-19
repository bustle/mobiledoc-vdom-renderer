import * as Mobiledoc from '../../types/Mobiledoc'
import * as Vdom from '../../types/Vdom'
import * as Renderer from '../../types/Renderer'
import MarkupRenderer from './MarkupRenderer'
import MarkerContentRenderer from './MarkerContentRenderer'

const addToLast = (array: any[][], item: any): any[][] => [
  ...array.slice(0, -1),
  [...array[array.length - 1], item]
]

interface Options {
  createElement: Vdom.Renderer
  getAtomComponent: Renderer.ComponentGetter
  getElement: Renderer.ComponentGetter
}

interface Context {
  markups: Mobiledoc.Markup[]
  atoms: Mobiledoc.Atom[]
}

interface Accumulator {
  openMarkupsChildren: Vdom.Node[][]
  openMarkups: Mobiledoc.Markup[]
}

export default ({ createElement, getAtomComponent, getElement }: Options) => ({
  markups,
  atoms
}: Context) => (markers: Mobiledoc.Marker[]): Vdom.Node[] =>
  markers.reduce(
    (
      { openMarkupsChildren, openMarkups }: Accumulator,
      marker: Mobiledoc.Marker
    ): Accumulator => {
      const [, openMarkupIndexes, closedMarkupCount] = marker
      const currentOpenMarkups = [
        ...openMarkups,
        ...openMarkupIndexes.map(index => markups[index])
      ]
      const currentOpenMarkupsChildren = addToLast(
        [
          ...openMarkupsChildren,
          ...Array.from({ length: openMarkupIndexes.length }).map(() => [])
        ],
        MarkerContentRenderer({ createElement, getAtomComponent })({ atoms })(
          marker
        )
      )
      return {
        openMarkups: currentOpenMarkups.slice(
          0,
          currentOpenMarkups.length - closedMarkupCount
        ),
        openMarkupsChildren: closedMarkupCount
          ? addToLast(
              currentOpenMarkupsChildren.slice(
                0,
                currentOpenMarkupsChildren.length - closedMarkupCount
              ),
              currentOpenMarkupsChildren
                .slice(currentOpenMarkupsChildren.length - closedMarkupCount)
                .reduceRight(
                  (
                    innerNode: Vdom.Node | void,
                    currentChildren: Vdom.Node[],
                    index
                  ): Vdom.Node =>
                    MarkupRenderer({ createElement, getElement })(
                      currentOpenMarkups[ // eslint-disable-line standard/computed-property-even-spacing
                        currentOpenMarkupsChildren.length -
                          closedMarkupCount +
                          index
                      ],
                      [...currentChildren, innerNode]
                    ),
                  undefined // eslint-disable-line fp/no-nil
                )
            )
          : currentOpenMarkupsChildren
      }
    },
    {
      openMarkupsChildren: [[]],
      openMarkups: [[Mobiledoc.MarkupTagName.sup, []]]
    }
  ).openMarkupsChildren[0]
