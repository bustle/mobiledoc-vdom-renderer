import { JSDOM } from 'jsdom'
import { patch as ultradomMount } from 'ultradom'
import preactRender from 'preact-render-to-string'
import { renderToString as reactRender } from 'react-dom/server'

const ultradomRender = vdom => {
  global.document = new JSDOM(`<html><body></body></html>`).window.document // eslint-disable-line fp/no-mutation
  document.body.appendChild(ultradomMount(vdom))
  return document.body.innerHTML
}

const pipelines = [
  {
    name: 'ultradom',
    renderHtml: nodes => ultradomRender(nodes)
  },
  {
    name: 'preact',
    renderHtml: nodes => preactRender
  },
  {
    name: 'react',
    renderHtml: reactRender
  }
]

export default test => {
  pipelines.forEach(test)
}
