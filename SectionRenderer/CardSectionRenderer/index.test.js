import test from 'ava'
import testRenderPipelines from '../../test/helpers/testRenderPipelines'
import CardSectionRenderer from '.'

const cardSection = [10, 0]

testRenderPipelines(({ name, renderHtml }) => {
  const renderVdom = CardSectionRenderer({
    getCardComponent: (type) => type,
    getMarkupComponent: (tagName) => tagName,
  })({ cards: [['card-type', {}]] })

  test(`${name}: renders a card section`, (t) =>
    t.snapshot(renderHtml(renderVdom(cardSection))))
})
