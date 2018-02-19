import { h as preactCreateElement } from 'preact'
import preactRender from 'preact-render-to-string'
import { createElement as reactCreateElement } from 'react'
import { renderToString as reactRender } from 'react-dom/server'

/* Needs a browser test with live dom! :D */

const pipelines = [
  {
    name: 'preact',
    createElement: preactCreateElement,
    renderHtml: children =>
      preactRender(preactCreateElement('root', {}, children)) // preact requires a root node
  },
  {
    name: 'react',
    createElement: reactCreateElement,
    renderHtml: reactRender
  }
]

export default test => pipelines.forEach(test)
