import test from 'ava'
import testRenderPipelines from './test/helpers/testRenderPipelines'
import mobiledoc from './test/mobiledoc'
import MobiledocVdomRenderer, { canParse } from '.'

const getAtomComponent = type => type
const getCardComponent = type => type

testRenderPipelines(({ name, renderHtml }) => {
  const renderVdom = MobiledocVdomRenderer({
    getAtomComponent,
    getCardComponent
  })

  test(`${name}: renders a basic mobiledoc`, t =>
    t.snapshot(renderHtml(renderVdom(mobiledoc))))
})

test(`Does not try to parse unsupported mobiledocs`, t => {
  t.snapshot(canParse('0.2.1'))

  t.snapshot(canParse('0.3.0'))

  const renderer = MobiledocVdomRenderer()
  try {
    renderer({ version: '0.2.1' })
  } catch (error) {
    t.snapshot(error.message)
  }
})
