import test from 'ava'
import throwError from '.'

test('throws an error when called', t => {
  const message = 'An error was encountered'
  try {
    throwError(message)
  } catch (error) {
    t.snapshot(error.message)
  }
})
