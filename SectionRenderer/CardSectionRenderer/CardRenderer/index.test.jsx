import test from 'ava'
import testRenderPipelines from '../../../test/helpers/testRenderPipelines'
import CardRenderer from '.'

const card = ['card-type', { attribute: 'foo', value: 'bar' }]

testRenderPipelines(({ name, renderHtml }) => {
  const renderVdom = CardRenderer({
    getCardComponent:
      (Type) =>
      ({ payload }) =>
        <Type attribute={payload.attribute}>{payload.value}</Type>,
  })

  test(`${name}: renders a basic card`, (t) =>
    t.snapshot(renderHtml(renderVdom(card))))
})
