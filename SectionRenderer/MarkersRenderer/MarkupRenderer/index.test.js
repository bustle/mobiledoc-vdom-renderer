import test from 'ava'
import testRenderPipelines from '../../../test/helpers/testRenderPipelines'
import MarkupRenderer from '.'

const markup = ['a', ['href', 'https://www.example.com/']]
const children = ['Example']

testRenderPipelines(({ name, renderHtml }) => {
  const renderVdom = MarkupRenderer({
    getMarkupComponent: (type) => type,
  })

  test(`${name}: renders a basic markup`, (t) =>
    t.snapshot(renderHtml(renderVdom(markup, children))))
})
