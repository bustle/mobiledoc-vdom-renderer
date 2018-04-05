import test from 'ava'
import testRenderPipelines from 'mobiledoc-vdom-renderer/test/helpers/testRenderPipelines'
import MarkupRenderer from '.'

const markup = ['a', ['href', 'https://www.example.com/']]
const children = ['Example']

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = MarkupRenderer({
    createElement,
    getElement: type => type
  })

  test(`${name}: renders a basic markup`, t =>
    t.snapshot(renderHtml(renderVdom(markup, children))))
})
