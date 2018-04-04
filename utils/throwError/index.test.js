import test from 'ava'
import throwError from '.'

test(t => {
  const message = 'This test should throw this error.'
  t.throws(() => throwError(message), `MobiledocVdomRenderer: ${message}`)
})
