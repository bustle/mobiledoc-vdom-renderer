import * as MobiledocTypes from './Mobiledoc'

// [openMarkupsIndexes, numberOfClosedMarkups, text]
export interface Marker extends Array<any> {
  0: number[]
  1: number
  2: string
}

// Override markers with 0.2.x version:
export interface MarkupSection extends Array<any> {
  0: MobiledocTypes.SectionTypeIdentifier.MARKUP
  1: string
  2: Marker[]
}

// Override markers with 0.2.x version:
export type ListItem = Marker[]
export interface ListSection extends Array<any> {
  0: MobiledocTypes.SectionTypeIdentifier.LIST
  1: string
  2: ListItem[]
}

// [typeIdentifier, cardType, payload]
export interface CardSection extends Array<any> {
  0: MobiledocTypes.SectionTypeIdentifier.CARD
  1: string
  2: object
}

export type Section =
  | MarkupSection
  | ListSection
  | CardSection
  | MobiledocTypes.ImageSection

export interface MarkupsAndSections extends Array<any> {
  0: MobiledocTypes.Markup[]
  1: Section[]
}

export default interface Mobiledoc02x {
  version: string
  sections: MarkupsAndSections
}
