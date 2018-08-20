import test from 'ava'
import getElementDefault from '.'

test('passes through valid elements', t => {
  t.snapshot(getElementDefault('a'))
})

test('throws on invalid elements', t => {
  try {
    getElementDefault('small')
  } catch (error) {
    t.snapshot(error.message)
  }
})
