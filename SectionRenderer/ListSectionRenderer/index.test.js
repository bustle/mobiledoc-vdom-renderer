import test from 'ava'
import testRenderPipelines from '../../test/helpers/testRenderPipelines'
import ListSectionRenderer from '.'

const listSection = []

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = ListSectionRenderer({ createElement })

  test(`${name}: renders a basic list section`, t =>
    t.snapshot(renderHtml(renderVdom(listSection))))
})
