import * as Mobiledoc from '../../../types/Mobiledoc'
import * as Vdom from '../../../types/Vdom'
import * as Renderer from '../../../types/Renderer'
import AtomRenderer from './AtomRenderer'

interface Options {
  createElement: Vdom.Renderer
  getAtomComponent: Renderer.ComponentGetter
}

interface Context {
  atoms: Mobiledoc.Atom[]
}

interface RendererDictionary {
  [type: number]: (value: string | number) => Vdom.Node
}

export default ({ createElement, getAtomComponent }: Options) => ({
  atoms
}: Context) => ([typeIdentifier, , , value]: Mobiledoc.Marker): Vdom.Node =>
  (({
    [Mobiledoc.MarkerTypeIdentifier.TEXT]: (text: string) => text,
    [Mobiledoc.MarkerTypeIdentifier.ATOM]: (index: number) =>
      AtomRenderer({ createElement, getAtomComponent })(atoms[index])
  } as RendererDictionary)[typeIdentifier](value))
