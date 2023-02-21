import test from 'ava'
import testRenderPipelines from '../../../../test/helpers/testRenderPipelines'
import AtomRenderer from '.'

const atom = ['atom-type', 'Atom text', { attribute: 'foo' }]

testRenderPipelines(({ name, renderHtml }) => {
  const renderVdom = AtomRenderer({
    getAtomComponent:
      (Type) =>
      ({ payload, children }) =>
        <Type attribute={payload.attribute}>{children}</Type>,
  })

  test(`${name}: renders a basic atom`, (t) =>
    t.snapshot(renderHtml(renderVdom(atom))))
})
