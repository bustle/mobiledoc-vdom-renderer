import test from 'ava'
import upgradeMobiledoc02x from '.'

const mobiledoc02x = {
  version: '0.2.0',
  sections: [
    [],
    [
      [1, 'pull-quote', [[[], 0, 'marker content']]],
      [3, 'ul', [[[[], 0, 'Item 1']], [[[], 0, 'Item 2']]]]
    ]
  ]
}

test('upgrades a 0.2.x mobiledoc', t =>
  t.snapshot(upgradeMobiledoc02x(mobiledoc02x)))
