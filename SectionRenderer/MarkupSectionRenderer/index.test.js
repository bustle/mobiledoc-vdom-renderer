import test from 'ava'
import testRenderPipelines from 'mobiledoc-vdom-renderer/test/helpers/testRenderPipelines'
import MarkupSectionRenderer from '.'

const markupSection = [1, 'p', [[0, [], 0, 'Example']]]

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = MarkupSectionRenderer({
    createElement,
    getElement: tagName => tagName
  })({})

  test(`${name}: renders a markup section`, t =>
    t.snapshot(renderHtml(renderVdom(markupSection))))
})
