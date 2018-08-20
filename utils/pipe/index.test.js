import test from 'ava'
import pipe from '.'

test('composes in left-to-right order', t => {
  const shout = pipe([
    str => str.concat(' world!'),
    str => str.toUpperCase(),
    str => str.replace(/(!)/, '$1$1$1')
  ])
  t.snapshot(shout('Hello'))
})
