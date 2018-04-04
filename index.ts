import Mobiledoc, * as MobiledocTypes from './types/Mobiledoc'
import * as Renderer from './types/Renderer'
import * as Vdom from './types/Vdom'
import SectionRenderer from './SectionRenderer'
import upgradeMobiledoc, { parseVersion } from './upgradeMobiledoc'
import { includedIn, objectValues, throwError, pipe } from './utils'

const SUPPORTED_MOBILEDOC_VERSION = '0.3.1'

/* Export the upgrader */

export { upgradeMobiledoc }
export { Mobiledoc, MobiledocTypes }

/* Export Mobiledoc types */

/* Define supported Mobiledoc versions for this renderer: */

const currentVersion = parseVersion(SUPPORTED_MOBILEDOC_VERSION)
export const canParse = (version: string) => {
  const { major, minor } = parseVersion(version)
  return major <= currentVersion.major && minor <= currentVersion.minor
}

/* Enforce Mobiledoc tag whitelist: */

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
}: Options) =>
  pipe([
    upgradeMobiledoc,
    (mobiledoc: Mobiledoc) =>
      mobiledoc.sections.map(
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
  ])
