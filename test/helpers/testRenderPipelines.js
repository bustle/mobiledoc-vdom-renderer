import { JSDOM } from 'jsdom'
import { h as picodomCreateElement, patch as picodomMount } from 'picodom'
import { h as preactCreateElement } from 'preact'
import preactRender from 'preact-render-to-string'
import { createElement as reactCreateElement } from 'react'
import { renderToString as reactRender } from 'react-dom/server'

global.document = new JSDOM(`<html><body></body></html>`).window.document // eslint-disable-line fp/no-mutation

const picodomRender = vdom => {
  picodomMount(undefined, vdom, document.body)
  return document.body.innerHTML
}

const pipelines = [
  {
    name: 'picodom',
    createElement: picodomCreateElement,
    renderHtml: nodes => picodomRender(picodomCreateElement('root', {}, nodes)) // picodom requires a root node
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
