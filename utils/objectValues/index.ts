// Shim for `Object.values`

export default (object: { [key: string]: any }): any[] =>
  Object.keys(object).map(key => object[key])
