import test from 'ava'
import testRenderPipelines from 'mobiledoc-vdom-renderer/test/helpers/testRenderPipelines'
import ImageSectionRenderer from '.'

const imageSection = [2, '/photo.jpg']

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = ImageSectionRenderer({
    createElement,
    getElement: tagName => tagName
  })

  test(`${name}: renders an image section`, t =>
    t.snapshot(renderHtml(renderVdom(imageSection))))
})
