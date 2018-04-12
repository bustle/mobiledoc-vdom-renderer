import { Mobiledoc, CreateElement, ElementTypeGetter, Node } from './types'
import SectionRenderer from './SectionRenderer'
import upgradeMobiledoc from './upgradeMobiledoc'
import getElementDefault from './getElementDefault'
import { throwError, semverMatchesMinor } from './utils'

export { Mobiledoc }
export { upgradeMobiledoc, getElementDefault }

export const SUPPORTED_MOBILEDOC_VERSION = '0.3.1'

export const canParse = semverMatchesMinor(SUPPORTED_MOBILEDOC_VERSION)

/* Our friendly renderer */

export interface Options {
  createElement: CreateElement
  getCardComponent?: ElementTypeGetter
  getAtomComponent?: ElementTypeGetter
  getElement?: ElementTypeGetter
}

export default ({
  createElement = () =>
    throwError(
      `You must pass a \`createElement\` (\`(type, properties, children) => Node\`) function to \`MobiledocVdomRenderer\` in order to render output.`
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
}: Options) => (mobiledoc: Mobiledoc): Node[] =>
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
