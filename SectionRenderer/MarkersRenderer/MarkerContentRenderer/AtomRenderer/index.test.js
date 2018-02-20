import test from 'ava'
import testRenderPipelines from '../../../../test/helpers/testRenderPipelines'
import AtomRenderer from '.'

const atom = ['atom-type', 'Atom text', {}]

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = AtomRenderer({
    createElement,
    getAtomComponent: type => type
  })

  test(`${name}: renders a basic atom`, t =>
    t.snapshot(renderHtml(renderVdom(atom))))
})
