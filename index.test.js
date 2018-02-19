import test from 'ava'
import testRenderPipelines from './test/helpers/testRenderPipelines'
import mobiledoc from './test/mobiledocs/complete'
import MobiledocVdomRenderer from '.'

const getAtomComponent = type => type
const getCardComponent = type => type

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = MobiledocVdomRenderer({
    createElement,
    getAtomComponent,
    getCardComponent
  })

  test(`${name}: renders a basic mobiledoc`, t =>
    t.snapshot(renderHtml(renderVdom(mobiledoc))))
})
