import test from 'ava'
import upgradeMobiledoc from '.'

const mobiledoc02x = {
  version: '0.2.0',
  sections: [[], [[1, 'pull-quote', [[[], 0, 'marker content']]]]]
}

test(t => t.snapshot(upgradeMobiledoc(mobiledoc02x)))
