import test from 'ava'
import testRenderPipelines from '../../../../test/helpers/testRenderPipelines'
import AtomRenderer from '.'

const getAtomComponent = type => type

const atom = []

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = AtomRenderer({
    createElement,
    getAtomComponent
  })

  test(`${name}: renders a basic atom`, t =>
    t.snapshot(renderHtml(renderVdom(atom))))
})
