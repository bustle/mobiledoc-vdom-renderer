import test from 'ava'
import upgradeMobiledoc from '.'

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

test(t => t.snapshot(upgradeMobiledoc(mobiledoc02x)))
