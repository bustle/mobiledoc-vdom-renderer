import test from 'ava'
import throwError from '.'

test(t => {
  const message = 'An error was encountered'
  try {
    throwError(message)
  } catch (error) {
    t.snapshot(error.message)
  }
})
