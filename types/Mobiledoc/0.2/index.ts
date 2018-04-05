/* Markers */

// [openMarkupsIndexes, numberOfClosedMarkups, text]
export interface Marker extends Array<any> {
  0: number[]
  1: number
  2: string
}

/* Markups */

export enum MarkupTagName {
  a = 'a',
  b = 'b',
  code = 'code',
  em = 'em',
  i = 'i',
  s = 's',
  strong = 'strong',
  sub = 'sub',
  sup = 'sup',
  u = 'u'
}

// [tagName, optionalAttributesArray]
export interface Markup extends Array<any> {
  0: MarkupTagName
  1?: string[]
}

/* Sections */

export enum SectionTypeIdentifier {
  MARKUP = 1,
  IMAGE = 2,
  LIST = 3,
  CARD = 10
}

/* Markup sections */

export enum MarkupSectionTagName {
  'pull-quote' = 'pull-quote',
  blockquote = 'blockquote',
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  p = 'p'
}

// [typeIdentifier, tagName, markers]
export interface MarkupSection extends Array<any> {
  0: SectionTypeIdentifier.MARKUP
  1: MarkupSectionTagName
  2: Marker[]
}

/* Image sections */

export enum ImageSectionTagName {
  img = 'img'
}

// [typeIdentifier, imageSrc]
export interface ImageSection extends Array<any> {
  0: SectionTypeIdentifier.IMAGE
  1: string
}

/* List sections */

export type ListItem = Marker[]

export interface ListSection extends Array<any> {
  0: SectionTypeIdentifier.LIST
  1: string
  2: ListItem[]
}

/* Card sections */

// [typeIdentifier, cardType, payload]
export interface CardSection extends Array<any> {
  0: SectionTypeIdentifier.CARD
  1: string
  2: object
}

export type Section = MarkupSection | ImageSection | ListSection | CardSection

export interface MarkupsAndSections extends Array<any> {
  0: Markup[]
  1: Section[]
}

export default interface Mobiledoc02 {
  version: string
  sections: MarkupsAndSections
}
