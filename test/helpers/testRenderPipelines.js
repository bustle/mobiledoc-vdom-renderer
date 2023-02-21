import preactRender from 'preact-render-to-string'
import { h as preactCreateElement } from 'preact'
import { renderToString as reactRender } from 'react-dom/server'

const pipelines = [
  {
    name: 'preact',
    renderHtml: (nodes) => preactRender(preactCreateElement('root', {}, nodes)), // preact requires a root node
  },
  {
    name: 'react',
    renderHtml: reactRender,
  },
]

export default (test) => {
  pipelines.forEach(test)
}
