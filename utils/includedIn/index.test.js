import test from 'ava'
import includedIn from '.'

test('correctly tests for included elements', t => {
  const isNote = includedIn(['do', 're', 'mi', 'fa', 'sol', 'la', 'ti', 'do'])
  const isInEmpty = includedIn([])
  t.snapshot(isNote('sol'))
  t.snapshot(isInEmpty(null))
})
