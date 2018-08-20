import test from 'ava'
import getMarkupComponentDefault from '.'

test('passes through valid elements', t => {
  t.snapshot(getMarkupComponentDefault('a'))
})

test('throws on invalid elements', t => {
  try {
    getMarkupComponentDefault('small')
  } catch (error) {
    t.snapshot(error.message)
  }
})
