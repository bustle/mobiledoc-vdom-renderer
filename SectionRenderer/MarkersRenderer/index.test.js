import test from 'ava'
import testRenderPipelines from '../../test/helpers/testRenderPipelines'
import MarkersRenderer from '.'

const markers = [
  [0, [], 0, 'Example with no markup'],
  [0, [0], 1, 'Example wrapped in `b` tag (opened markup #0), 1 closed markup'],
  [
    0,
    [1],
    0,
    'Example opening `a` tag (opened markup with #1, 0 closed markups)'
  ],
  [0, [], 1, 'Example closing `a` tag (no opened markups, 1 closed markup)'],
  [
    0,
    [1, 0],
    1,
    'Example opening `a` tag and `b` tag, closing `b` tag (opened markups #1 and #0, 1 closed markup [closes markup #0])'
  ],
  [
    0,
    [],
    1,
    'Example closing `a` tag, (no opened markups, 1 closed markup [closes markup #1])'
  ]
]

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = MarkersRenderer({
    createElement,
    getMarkupComponent: type => type
  })({ markups: [['b'], ['a', ['href', 'https://www.example.com/']]] })

  test(`${name}: render basic markers`, t =>
    t.snapshot(renderHtml(renderVdom(markers))))
})
