import test from 'ava'
import testRenderPipelines from '../../../test/helpers/testRenderPipelines'
import MarkerContentRenderer from '.'

const getMarkerContentComponent = type => type

const markerContent = []

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = MarkerContentRenderer({
    createElement,
    getMarkerContentComponent
  })

  test(`${name}: renders basic marker content`, t =>
    t.snapshot(renderHtml(renderVdom(markerContent))))
})
