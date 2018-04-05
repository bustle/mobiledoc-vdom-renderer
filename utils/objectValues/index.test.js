import test from 'ava'
import objectValues from '.'

test('returns an object’s values', t => {
  t.snapshot(objectValues({ name: 'circle', color: null, hasCorners: false }))
})
