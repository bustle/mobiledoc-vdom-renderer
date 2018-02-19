import test from 'ava'
import testRenderPipelines from '../../test/helpers/testRenderPipelines'
import ListSectionRenderer from '.'

const markupSection = []

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = ListSectionRenderer({ createElement })

  test(`${name}: renders a basic markup section`, t =>
    t.snapshot(renderHtml(renderVdom(markupSection))))
})
