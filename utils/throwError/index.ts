// https://github.com/tc39/proposal-throw-expressions 🙏🏽

// eslint-disable-next-line fp/no-nil
export default (message: string): never => {
  // eslint-disable-next-line fp/no-throw
  throw new Error(`MobiledocVdomRenderer: ${message}`)
}
