import { JSDOM } from 'jsdom'
import { h as ultradomCreateElement, patch as ultradomMount } from 'ultradom'
import { h as preactCreateElement } from 'preact'
import preactRender from 'preact-render-to-string'
import { createElement as reactCreateElement } from 'react'
import { renderToString as reactRender } from 'react-dom/server'

const ultradomRender = vdom => {
  global.document = new JSDOM(`<html><body></body></html>`).window.document // eslint-disable-line fp/no-mutation
  document.body.appendChild(ultradomMount(vdom))
  return document.body.innerHTML
}

const pipelines = [
  {
    name: 'ultradom',
    createElement: ultradomCreateElement,
    renderHtml: nodes => ultradomRender(nodes)
  },
  {
    name: 'preact',
    createElement: preactCreateElement,
    renderHtml: nodes => preactRender(preactCreateElement('root', {}, nodes)) // preact requires a root node
  },
  {
    name: 'react',
    createElement: reactCreateElement,
    renderHtml: reactRender
  }
]

export default test => {
  pipelines.forEach(test)
}
