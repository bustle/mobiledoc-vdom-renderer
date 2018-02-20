import test from 'ava'
import testRenderPipelines from '../../../test/helpers/testRenderPipelines'
import CardRenderer from '.'

const card = ['card-type', {}]

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = CardRenderer({
    createElement,
    getCardComponent: type => type
  })

  test(`${name}: renders a basic card`, t =>
    t.snapshot(renderHtml(renderVdom(card))))
})
