import test from 'ava'
import testRenderPipelines from 'mobiledoc-vdom-renderer/test/helpers/testRenderPipelines'
import CardRenderer from '.'

const card = ['card-type', { attribute: 'foo', value: 'bar' }]

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = CardRenderer({
    createElement,
    getCardComponent: type => ({ payload }) =>
      createElement(type, { attribute: payload.attribute }, payload.value)
  })

  test(`${name}: renders a basic card`, t =>
    t.snapshot(renderHtml(renderVdom(card))))
})
