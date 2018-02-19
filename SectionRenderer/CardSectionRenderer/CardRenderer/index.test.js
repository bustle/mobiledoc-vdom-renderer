import test from 'ava'
import testRenderPipelines from '../../../test/helpers/testRenderPipelines'
import CardRenderer from '.'

const getCardComponent = type => type

const card = []

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = CardRenderer({
    createElement,
    getCardComponent
  })

  test(`${name}: renders a basic card`, t =>
    t.snapshot(renderHtml(renderVdom(card))))
})
