import test from 'ava'
import getElementDefault from '.'

test(t => {
  t.snapshot(getElementDefault('a'))

  try {
    getElementDefault('small')
  } catch (error) {
    t.snapshot(error.message)
  }
})
