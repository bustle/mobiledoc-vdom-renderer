import test from 'ava'
import testRenderPipelines from '../../../../test/helpers/testRenderPipelines'
import AtomRenderer from '.'

const atom = ['atom-type', 'Atom text', { attribute: 'foo' }]

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = AtomRenderer({
    createElement,
    getAtomComponent: type =>
      name === 'ultradom'
        ? ({ payload }, children) =>
            createElement(type, { attribute: payload.attribute }, children)
        : ({ payload, children }) =>
            createElement(type, { attribute: payload.attribute }, children)
  })

  test(`${name}: renders a basic atom`, t =>
    t.snapshot(renderHtml(renderVdom(atom))))
})
