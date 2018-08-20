import test from 'ava'
import testRenderPipelines from '../test/helpers/testRenderPipelines'
import SectionRenderer from '.'

const markupSection = [1, 'p', [[0, [], 0, 'Example']]]
const imageSection = [2, '/photo.jpg']
const listSection = [3, 'ul', [[[0, [], 0, 'Item 1']], [[0, [], 0, 'Item 2']]]]
const cardSection = [10, 0]

testRenderPipelines(({ name, createElement, renderHtml }) => {
  const renderVdom = SectionRenderer({
    createElement,
    getAtomComponent: type => type,
    getCardComponent: type => type,
    getMarkupComponent: tagName => tagName
  })({ cards: [['card-type', {}]] })

  test(`${name}: renders a markup section`, t =>
    t.snapshot(renderHtml(renderVdom(markupSection))))

  test(`${name}: renders an image section`, t =>
    t.snapshot(renderHtml(renderVdom(imageSection))))

  test(`${name}: renders a list section`, t =>
    t.snapshot(renderHtml(renderVdom(listSection))))

  test(`${name}: renders a card section`, t =>
    t.snapshot(renderHtml(renderVdom(cardSection))))
})
