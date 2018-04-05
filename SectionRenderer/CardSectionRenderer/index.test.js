import test from 'ava'
import testRenderPipelines from 'mobiledoc-vdom-renderer/test/helpers/testRenderPipelines'
import CardSectionRenderer from '.'

const cardSection = [10, 0]

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = CardSectionRenderer({
    createElement,
    getCardComponent: type => type,
    getElement: tagName => tagName
  })({ cards: [['card-type', {}]] })

  test(`${name}: renders a card section`, t =>
    t.snapshot(renderHtml(renderVdom(cardSection))))
})
