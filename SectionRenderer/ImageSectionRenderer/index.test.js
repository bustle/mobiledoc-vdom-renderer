import test from 'ava'
import testRenderPipelines from '../../test/helpers/testRenderPipelines'
import ImageSectionRenderer from '.'

const imageSection = [2, '/photo.jpg']

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = ImageSectionRenderer({
    createElement,
    getMarkupComponent: tagName => tagName
  })

  test(`${name}: renders an image section`, t =>
    t.snapshot(renderHtml(renderVdom(imageSection))))
})
