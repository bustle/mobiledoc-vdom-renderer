import test from 'ava'
import testRenderPipelines from '../test/helpers/testRenderPipelines'
import SectionRenderer from '.'

const section = []

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = SectionRenderer({ createElement })

  test(`${name}: renders a basic section`, t =>
    t.snapshot(renderHtml(renderVdom(section))))
})
