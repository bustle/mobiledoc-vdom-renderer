import Mobiledoc, * as MobiledocTypes from './types/Mobiledoc'
import * as Renderer from './types/Renderer'
import * as Vdom from './types/Vdom'
import SectionRenderer from './SectionRenderer'
import upgradeMobiledoc from './upgradeMobiledoc'
import {
  includedIn,
  objectValues,
  throwError,
  semverMatchesMinor
} from './utils'

export { upgradeMobiledoc, Mobiledoc, MobiledocTypes }

export const SUPPORTED_MOBILEDOC_VERSION = '0.3.1'

export const canParse = semverMatchesMinor(SUPPORTED_MOBILEDOC_VERSION)

const isValidElement: (tagName: string) => boolean = includedIn(
  objectValues({
    ...MobiledocTypes.MarkupSectionTagName,
    ...MobiledocTypes.ImageSectionTagName,
    ...MobiledocTypes.ListSectionTagName,
    ...MobiledocTypes.ListItemTagName,
    ...MobiledocTypes.MarkupTagName
  })
)

export const getElementDefault: Renderer.ComponentGetter = (
  tagName: string
): Vdom.Component =>
  isValidElement(tagName)
    ? tagName
    : throwError(`\`${tagName}\` is not a supported Mobiledoc tag.`)

/* Our friendly renderer */

export interface Options {
  createElement: Vdom.Renderer
  getCardComponent: Renderer.ComponentGetter
  getAtomComponent: Renderer.ComponentGetter
  getElement: Renderer.ComponentGetter
}

export default ({
  createElement = () =>
    throwError(
      `You must pass a \`createElement\` (\`(type, props, children) => Node\`) function to \`MobiledocVdomRenderer\` in order to render output.`
    ),
  getCardComponent = type =>
    throwError(
      `You must pass a \`getCardComponent\` (\`type => Component\`) function to \`MobiledocVdomRenderer\` in order to render cards (i.e. \`'${type}'\`).`
    ),
  getAtomComponent = type =>
    throwError(
      `You must pass a \`getAtomComponent\` (\`type => Component\`) function to \`MobiledocVdomRenderer\` in order to render atoms (i.e. \`'${type}'\`).`
    ),
  getElement = getElementDefault
}: Options) => (mobiledoc: Mobiledoc): Vdom.Node[] =>
  canParse(mobiledoc.version)
    ? mobiledoc.sections.map(
        SectionRenderer({
          createElement,
          getCardComponent,
          getAtomComponent,
          getElement
        })({
          markups: mobiledoc.markups,
          cards: mobiledoc.cards,
          atoms: mobiledoc.atoms
        })
      )
    : throwError(
        `Unable to parse the passed Mobiledoc version \`'${
          mobiledoc.version
        }'\`.`
      )
