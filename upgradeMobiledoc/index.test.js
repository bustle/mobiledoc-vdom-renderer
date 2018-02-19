import test from 'ava'
import subject from '.'

test(t => {
  subject && t.fail(`No tests were specified.`)
})
