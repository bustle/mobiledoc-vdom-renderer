import test from 'ava'
import testRenderPipelines from '../../test/helpers/testRenderPipelines'
import ListSectionRenderer from '.'

const listSection = [3, 'ul', [[[0, [], 0, 'Item 1']], [[0, [], 0, 'Item 2']]]]

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = ListSectionRenderer({
    createElement,
    getElement: tagName => tagName
  })({})

  test(`${name}: renders a list section`, t =>
    t.snapshot(renderHtml(renderVdom(listSection))))
})
