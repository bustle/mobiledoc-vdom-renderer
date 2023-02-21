import { Mobiledoc, ElementTypeGetter, Node } from './types'
import * as MobiledocTypes from './types/Mobiledoc'
import SectionRenderer from './SectionRenderer'
import getMarkupComponentDefault from './getMarkupComponentDefault'
import { throwError, semverMatchesMinor } from './utils'

export { Mobiledoc, MobiledocTypes }
export { getMarkupComponentDefault }

export const SUPPORTED_MOBILEDOC_VERSION = '0.3.1'

export const canParse = semverMatchesMinor(SUPPORTED_MOBILEDOC_VERSION)

export interface Options {
  getCardComponent?: ElementTypeGetter
  getAtomComponent?: ElementTypeGetter
  getMarkupComponent?: ElementTypeGetter
}

export default ({
    getCardComponent = (type) =>
      throwError(
        `You must pass a \`getCardComponent\` (\`type => Component\`) function to \`MobiledocVdomRenderer\` in order to render cards (i.e. \`'${type}'\`).`
      ),
    getAtomComponent = (type) =>
      throwError(
        `You must pass a \`getAtomComponent\` (\`type => Component\`) function to \`MobiledocVdomRenderer\` in order to render atoms (i.e. \`'${type}'\`).`
      ),
    getMarkupComponent = getMarkupComponentDefault,
  }: Options) =>
  (mobiledoc: Mobiledoc): Node[] =>
    canParse(mobiledoc.version)
      ? mobiledoc.sections.map(
          SectionRenderer({
            getCardComponent,
            getAtomComponent,
            getMarkupComponent,
          })({
            markups: mobiledoc.markups,
            cards: mobiledoc.cards,
            atoms: mobiledoc.atoms,
          })
        )
      : throwError(
          `Unable to parse the passed Mobiledoc version \`'${mobiledoc.version}'\`.`
        )
