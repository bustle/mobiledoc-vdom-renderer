import {
  CreateElement,
  ElementTypeGetter,
  Node
} from 'mobiledoc-vdom-renderer/types'
import {
  Atom,
  Marker,
  MarkerTypeIdentifier
} from 'mobiledoc-vdom-renderer/types/Mobiledoc'
import AtomRenderer from './AtomRenderer'

export interface Options {
  createElement: CreateElement
  getAtomComponent: ElementTypeGetter
}

export interface Context {
  atoms: Atom[]
}

interface RendererDictionary {
  [type: number]: (value: string | number) => Node
}

export default ({ createElement, getAtomComponent }: Options) => ({
  atoms
}: Context) => ([typeIdentifier, , , value]: Marker): Node =>
  (({
    [MarkerTypeIdentifier.TEXT]: (text: string) => text,
    [MarkerTypeIdentifier.ATOM]: (index: number) =>
      AtomRenderer({ createElement, getAtomComponent })(atoms[index])
  } as RendererDictionary)[typeIdentifier](value))
