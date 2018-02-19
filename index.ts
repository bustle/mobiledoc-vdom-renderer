import Mobiledoc, * as MobiledocTypes from './types/Mobiledoc'
import * as Renderer from './types/Renderer'
import * as Vdom from './types/Vdom'
import SectionRenderer from './SectionRenderer'
import upgradeMobiledoc, { matchesMinorVersion } from './upgradeMobiledoc'
import pipe from './pipe'
import throwError from './throwError'

/* Defines supported Mobiledoc versions for this renderer: */

export const canParse = ({ version }: Mobiledoc): boolean =>
  matchesMinorVersion('0.3')(version) ||
  matchesMinorVersion('0.2')(version) ||
  matchesMinorVersion('0.1')(version) ||
  throwError(
    `The passed Mobiledoc could not be parsed by \`MobiledocVdomRenderer\`.`
  )

export { upgradeMobiledoc }

/* Enforce Mobiledoc tag whitelist: */

const VALID_ELEMENT_TAGNAMES = Object.values({
  ...MobiledocTypes.MarkupSectionTagName,
  ...MobiledocTypes.ImageSectionTagName,
  ...MobiledocTypes.ListSectionTagName,
  ...MobiledocTypes.ListItemTagName,
  ...MobiledocTypes.MarkupTagName
})

export const getElementDefault: Renderer.ComponentGetter = (
  tagName: string
): Vdom.Component =>
  VALID_ELEMENT_TAGNAMES.includes(tagName)
    ? tagName
    : throwError(`\`${tagName}\` is not a supported Mobiledoc tag.`)

/* Our friendly renderer */

interface Options {
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
