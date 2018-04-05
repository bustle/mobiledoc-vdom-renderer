import test from 'ava'
import semverMatchesMinor from '.'

test('compares versions correctly', t => {
  t.snapshot(semverMatchesMinor('0.3.1')('0.2.1'))
  t.snapshot(semverMatchesMinor('0.2.1')('0.3.1'))
  t.snapshot(semverMatchesMinor('0.3.1')('0.3.0'))
  t.snapshot(semverMatchesMinor('0.3.0')('0.3.1'))
})
