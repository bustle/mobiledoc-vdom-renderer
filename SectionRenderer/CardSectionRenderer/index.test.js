import test from 'ava'
import testRenderPipelines from '../../test/helpers/testRenderPipelines'
import CardSectionRenderer from '.'

const getCardComponent = type => type

const cardSection = []

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = CardSectionRenderer({
    createElement,
    getCardComponent
  })

  test(`${name}: renders a basic card section`, t =>
    t.snapshot(renderHtml(renderVdom(cardSection))))
})
