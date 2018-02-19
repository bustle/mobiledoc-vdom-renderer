/* Markers */

export enum MarkerTypeIdentifier {
  TEXT = 0,
  ATOM = 1
}

// [typeIdentifier, openMarkupsIndexes, numberOfClosedMarkups, text]
export interface TextMarker extends Array<any> {
  0: MarkerTypeIdentifier.TEXT
  1: number[]
  2: number
  3: string
}

// [typeIdentifier, openMarkupsIndexes, numberOfClosedMarkups, atomIndex]
export interface AtomMarker extends Array<any> {
  0: MarkerTypeIdentifier.ATOM
  1: number[]
  2: number
  3: number
}

export type Marker = TextMarker | AtomMarker

/* Markups, Cards, Atoms */

// [tagName, optionalAttributesArray]
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
export interface Markup extends Array<any> {
  0: MarkupTagName
  1?: string[]
}

// [type, payload]
export interface Card extends Array<any> {
  0: string
  1: object
}

// [type, text, payload]}
export interface Atom extends Array<any> {
  0: string
  1: string
  2: object
}

/* Sections */

export enum SectionTypeIdentifier {
  MARKUP = 1,
  IMAGE = 2,
  LIST = 3,
  CARD = 10
}

// [typeIdentifier, tagName, markers]

export enum MarkupSectionTagName {
  aside = 'aside',
  blockquote = 'blockquote',
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  p = 'p',
  'pull-quote' = 'aside' // Mobiledoc 0.3.0
}

export interface MarkupSection extends Array<any> {
  0: SectionTypeIdentifier.MARKUP
  1: MarkupSectionTagName
  2: Marker[]
}

// [typeIdentifier, imageSrc]
export enum ImageSectionTagName {
  img = 'img'
}

export interface ImageSection extends Array<any> {
  0: SectionTypeIdentifier.IMAGE
  1: string
}

// [typeIdentifier, tagName, itemMarkers]

export enum ListSectionTagName {
  ul = 'ul',
  ol = 'ol'
}
export enum ListItemTagName {
  li = 'li'
}
export type ListItem = Marker[]
export interface ListSection extends Array<any> {
  0: SectionTypeIdentifier.LIST
  1: ListSectionTagName
  2: ListItem[]
}

// [typeIdentifier, index]
export interface CardSection extends Array<any> {
  0: SectionTypeIdentifier.CARD
  1: number
}

export type Section = MarkupSection | ImageSection | ListSection | CardSection

/* Mobiledoc (0.3.x) */

export default interface Mobiledoc {
  version: string
  sections: Section[]
  markups: Markup[]
  cards: Card[]
  atoms: Atom[]
}
