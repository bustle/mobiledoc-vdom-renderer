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

const mobiledoc03x = {
  version: '0.3.1',
  sections: [],
  markups: [],
  cards: [],
  atoms: []
}

test('can upgrade version 0.2.x mobiledocs', t => {
  t.snapshot(upgradeMobiledoc(mobiledoc02x))
})

test('passes through 0.3.x mobiledocs', t => {
  t.snapshot(upgradeMobiledoc(mobiledoc03x))
})
