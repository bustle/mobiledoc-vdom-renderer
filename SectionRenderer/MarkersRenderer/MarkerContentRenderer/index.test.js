import test from 'ava'
import testRenderPipelines from '../../../test/helpers/testRenderPipelines'
import MarkerContentRenderer from '.'

const markerContent = [0, [], 0, 'Marker content']

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = MarkerContentRenderer({
    createElement
  })({})

  test(`${name}: renders basic marker content`, t =>
    t.snapshot(renderHtml(renderVdom(markerContent))))
})
