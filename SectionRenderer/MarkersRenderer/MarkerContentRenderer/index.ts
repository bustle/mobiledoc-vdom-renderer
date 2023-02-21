import { ElementTypeGetter, Node } from '../../../types'
import { Atom, Marker, MarkerTypeIdentifier } from '../../../types/Mobiledoc'
import AtomRenderer from './AtomRenderer'

export interface Options {
  getAtomComponent: ElementTypeGetter
}

export interface Context {
  atoms: Atom[]
}

interface RendererDictionary {
  [type: number]: (value: string | number) => Node
}

export default ({ getAtomComponent }: Options) => ({ atoms }: Context) => ([
  typeIdentifier,
  ,
  ,
  value
]: Marker): Node =>
  (({
    [MarkerTypeIdentifier.TEXT]: (text: string) => text,
    [MarkerTypeIdentifier.ATOM]: (index: number) =>
      AtomRenderer({ getAtomComponent })(atoms[index])
  } as RendererDictionary)[typeIdentifier](value))
