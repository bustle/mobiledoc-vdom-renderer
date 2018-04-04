import test from 'ava'
import pipe from '.'

test(t => {
  const shout = pipe([
    str => str.toUpperCase(),
    str => str.replace(/(!)/g, '$1$1$1')
  ])
  t.snapshot(shout('Hello!'))
})
