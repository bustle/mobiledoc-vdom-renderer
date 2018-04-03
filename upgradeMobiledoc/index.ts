import Mobiledoc from '../types/Mobiledoc'
import pipe from '../pipe'

import Mobiledoc02x from '../types/Mobiledoc02x'
import upgradeMobiledoc02x from './0.2.x-0.3.x'

export { Mobiledoc02x, upgradeMobiledoc02x }

export const TARGET_VERSION = '0.3.1'

const parseIntWithRadix = (str: string) => parseInt(str, 10)

const map = (fn: (item: any) => any) => (arr: any[]): any[] => arr.map(fn)

const split = (char: string) => (str: string): string[] => str.split(char)

export const parseVersion = pipe([
  split('.'),
  map(parseIntWithRadix),
  ([major, minor, patch]) => ({ major, minor, patch })
])

const matchesMinor = (target: string) => (version: string): boolean => {
  const targetVersion = parseVersion(target)
  const { major, minor } = parseVersion(version)
  return major === targetVersion.major && minor === targetVersion.minor
}

export default (mobiledoc: Mobiledoc | Mobiledoc02x): Mobiledoc =>
  matchesMinor(TARGET_VERSION)(mobiledoc.version)
    ? (mobiledoc as Mobiledoc)
    : upgradeMobiledoc02x(mobiledoc as Mobiledoc02x)
