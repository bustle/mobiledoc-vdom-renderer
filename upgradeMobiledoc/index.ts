import Mobiledoc, * as MobiledocTypes from '../types/Mobiledoc'

const TARGET_VERSION = '0.3.1'

const extractMinorVersion = (version: string) =>
  version
    .split('.')
    .slice(0, 2)
    .join('.')

export const matchesMinorVersion = (a: string) => (b: string) =>
  extractMinorVersion(a) === extractMinorVersion(b)

/* '0.2.x' format */

interface Marker02x extends Array<any> {
  0: number[]
  1: number
  2: string
}

interface Section02x extends Array<any> {
  0: MobiledocTypes.SectionTypeIdentifier
  1: string | number
  2?: Marker02x[] | object
}

interface Accumulator {
  cards: MobiledocTypes.Card[]
  sections: MobiledocTypes.Section[]
}

export default (mobiledoc: Mobiledoc): Mobiledoc =>
  matchesMinorVersion(TARGET_VERSION)(mobiledoc.version)
    ? mobiledoc
    : {
        ...mobiledoc,
        version: TARGET_VERSION,
        markups: mobiledoc.sections[0],
        ...mobiledoc.sections[1].reduce(
          ({ cards, sections }: Accumulator, section: Section02x) =>
            section[0] === MobiledocTypes.SectionTypeIdentifier.CARD
              ? {
                  cards: [
                    ...cards,
                    [section[1], section[2]] as MobiledocTypes.Card
                  ],
                  sections: [
                    ...sections,
                    [
                      MobiledocTypes.SectionTypeIdentifier.CARD,
                      cards.length
                    ] as MobiledocTypes.CardSection
                  ]
                }
              : {
                  cards,
                  sections: [
                    ...sections,
                    [
                      section[0],
                      section[1] === 'pull-quote' ? 'aside' : section[1],
                      (section[2] as Marker02x[]).map(
                        (marker): MobiledocTypes.Marker =>
                          [
                            MobiledocTypes.MarkerTypeIdentifier.TEXT,
                            ...marker
                          ] as MobiledocTypes.Marker
                      )
                    ] as MobiledocTypes.Section
                  ]
                },
          { cards: [], sections: [] }
        ),
        atoms: []
      }
