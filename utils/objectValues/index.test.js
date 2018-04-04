import test from 'ava'
import objectValues from '.'

test(t => {
  t.snapshot(objectValues({ name: 'circle', color: null, hasCorners: false }))
})
