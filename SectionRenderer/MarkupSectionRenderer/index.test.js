import test from 'ava'
import testRenderPipelines from '../../test/helpers/testRenderPipelines'
import MarkupSectionRenderer from '.'

const markupSection = [
  1,
  'p',
  [[0, [], 0, 'Example']],
  ['data-md-text-align', 'right'],
]

testRenderPipelines(({ name, renderHtml }) => {
  const renderVdom = MarkupSectionRenderer({
    getMarkupComponent: (tagName) => tagName,
  })({})

  test(`${name}: renders a markup section`, (t) =>
    t.snapshot(renderHtml(renderVdom(markupSection))))
})
