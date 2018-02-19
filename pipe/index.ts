type AnyFunction = (arg: any) => any

export default (functions: AnyFunction[]) =>
  functions.reduce((accumulatedFn, fn) => arg => fn(accumulatedFn(arg)))
