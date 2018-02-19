// eslint-disable-next-line fp/no-nil
export default (message: string): never => {
  // eslint-disable-next-line fp/no-throw
  throw new Error(`MobiledocVdomRenderer: ${message}`)
}
