import test from 'ava'
import testRenderPipelines from '../../../test/helpers/testRenderPipelines'
import MarkupRenderer from '.'

const getElement = type => type

const markup = []
const children = []

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = MarkupRenderer({
    createElement,
    getElement
  })

  test(`${name}: renders a basic markup`, t =>
    t.snapshot(renderHtml(renderVdom(markup, children))))
})
