import pipe from '../pipe'

const split = (char: string) => (str: string): string[] => str.split(char)

const map = (fn: (item: any) => any) => (arr: any[]): any[] => arr.map(fn)

const parseIntWithRadix = (str: string) => parseInt(str, 10)

const parseVersion = pipe([
  split('.'),
  map(parseIntWithRadix),
  ([major, minor, patch]) => ({ major, minor, patch })
])

export default (targetVersion: string) => (version: string): boolean => {
  const { major: targetMajor, minor: targetMinor } = parseVersion(targetVersion)
  const { major, minor } = parseVersion(version)
  return major === targetMajor && minor === targetMinor
}
