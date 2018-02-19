import test from 'ava'
import testRenderPipelines from '../../test/helpers/testRenderPipelines'
import ImageSectionRenderer from '.'

const imageSection = []

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = ImageSectionRenderer({ createElement })

  test(`${name}: renders a basic image section`, t =>
    t.snapshot(renderHtml(renderVdom(imageSection))))
})
