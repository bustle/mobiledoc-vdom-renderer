import test from 'ava'
import testRenderPipelines from '../../../test/helpers/testRenderPipelines'
import MarkerContentRenderer from '.'

const markerContent = [0, [], 0, 'Marker content']

testRenderPipelines(({ name, renderHtml }) => {
  const renderVdom = MarkerContentRenderer({})({})

  test(`${name}: renders basic marker content`, (t) =>
    t.snapshot(renderHtml(renderVdom(markerContent))))
})
