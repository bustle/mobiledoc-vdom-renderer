# mobiledoc-vdom-renderer

This package renders [Mobiledoc documents](https://github.com/bustle/mobiledoc-kit/blob/master/MOBILEDOC.md) through calls to a `createElement` function, often referred to as `h`, for _[hyperscript](https://github.com/hyperhype/hyperscript)_ or provided as a global if you are using [JSX](https://facebook.github.io/jsx/). This allows embedding Mobiledoc content “natively” as _virtual DOM_ in frameworks like [React](https://reactjs.org/), [preact](https://preactjs.com/), or [hyperapp](https://github.com/hyperapp/hyperapp).

Alternatively, you can skip the “virtual” step and build DOM directly with a micro-renderer such as [ultradom](https://github.com/JorgeBucaran/ultradom), or even convert _mobiledocs_ to arbitrary ASTs by adopting `createElement`’s standard `(type: (properties: object) => Node, properties: object, ...children: Node[]) => Node` signature for your builder.

## Installation

```shell
npm install @bustle/mobiledoc-vdom-renderer --save
```

or

```shell
yarn add @bustle/mobiledoc-vdom-renderer
```

## Usage

```jsx
/* @jsx h */
import Renderer from '@bustle/mobiledoc-vdom-renderer'

// render: (mobiledoc: Mobiledoc) => Node[]
const render = Renderer({ createElement: h })

// Instant <Mobiledoc/> Component
export default function Mobiledoc({ mobiledoc }) {
  return <div>{render(mobiledoc)}</div>
}
```

## API

```javascript
import Renderer, {
  upgradeMobiledoc,
  getElementDefault
} from '@bustle/mobiledoc-vdom-renderer'
```

### `Renderer` _(default export)_

```typescript
Renderer: (options: RendererOptions) => RenderFunction
```

Creates a _render function_ (`(mobiledoc: Mobiledoc) => Node[]`) from the supplied options

* #### `options` _required_
  ```typescript
  {
    createElement: CreateElement,
    getCardComponent?: ComponentGetter,
    getAtomComponent?: ComponentGetter,
    getElement?: ComponentGetter = getElementDefault
  }
  ```
  * ##### `createElement` _required_
    ```typescript
    createElement: (
      type: ElementType,
      properties?: object,
      ...children: Node[]
    ) => Node
    ```
    Any compatible function such as `React.createElement` or hyperscript `h`
  * #### `getCardComponent`
    ```typescript
    getCardComponent: (type: string) => string | Component
    ```
    Function which returns a string (_tag name_) or _component_ (`(properties: { payload: object }) => Node`) for the given _card type_ (required if rendering a mobiledoc with cards)
  * #### `getAtomComponent`
    ```typescript
    getAtomComponent: (type: string) => string | Component
    ```
    Function which returns a string (_tag name_) or _component_ (`(properties: { payload: object }) => Node`) for the given _atom type_ (required if rendering a mobiledoc with atoms)
  * #### `getElement`
    ```typescript
    getElement: (tagName: string) => string | Component = getElementDefault
    ```
    Function which returns a string (_tag name_) or _component_ (`(attributes: object) => Node`) to override rendering for the given tag name (for instance, to map your `'h1'`s to `'h2'`s or instead render a custom heading component)

### `upgradeMobiledoc`

```typescript
upgradeMobiledoc: (mobiledoc: Mobiledoc | Mobiledoc02x) => Mobiledoc
```

Upgrades a mobiledoc from any released version to the latest specification (`0.3.1`)

### `getElementDefault`

```typescript
getElementDefault: (tagName: string) => string
```

`getElement`’s default value is exported as `getElementDefault`, which throws an error on any tag names which are not in [Mobiledoc’s _markup section_ or _markup_ whitelists](./types/ts); passing through the tag name instead (as in `tagName => tagName`) allows (non-standard) mobiledocs containing arbitrary tags to be rendered

## Type definitions

```typescript
import { Mobiledoc } from '@bustle/mobiledoc-vdom-renderer'
```

```typescript
import Mobiledoc, * as MobiledocTypes from '@bustle/mobiledoc-vdom-renderer/types/mobiledoc'
```

This package includes [complete Typescript definitions describing the Mobiledoc format](./types/Mobiledoc/index.ts), which may be imported directly for use with any mobiledoc-related code.

## Contributing

Contributions—including pull requests, bug reports, documentation, and suggestions—are welcome!

The code is written in [the Javascript superset _Typescript_](http://www.typescriptlang.org/) in a pure functional style. Opinionated “best practices,” including functional programming, are strictly enforced by linters—it’ll help to use a code editor which supports both as-you-type linting and type-checking.

### Test-driven development

* #### Installation

```shell
git clone https://github.com/bustle/mobiledoc-vdom-renderer.git
cd mobiledoc-vdom-renderer/
npm install
```

* #### `npm start`

  Watches the filesystem for changes ([chokidar-cli](https://github.com/kimmobrunfeldt/chokidar-cli)) then lints (Typescript, [Standard style](https://standardjs.com/), [functional JS practices](https://github.com/jfmengels/eslint-plugin-fp)) and tests ([ava snapshots](https://github.com/avajs/ava#snapshot-testing)) each file you touch

* #### Other useful commands
  * ##### `npm test`
    Run the linters and all tests and generate a coverage report ([nyc](https://github.com/istanbuljs/nyc))
  * ##### `npm run snapshot`
    Updates all snapshots; check your `git` diff before committing!
  * ##### `npm run format`
    Fixes many linting errors and applies [prettier whitespace conventions](https://github.com/prettier/prettier)

## More for Mobiledoc

### Renderers

* [mobiledoc-react-renderer](https://github.com/dailybeast/mobiledoc-react-renderer)
* [mobiledoc-dom-renderer](https://github.com/bustle/mobiledoc-dom-renderer)
* [mobiledoc-text-renderer](https://github.com/bustle/mobiledoc-text-renderer)

### Editors

* [react-mobiledoc-editor](https://github.com/joshfrench/react-mobiledoc-editor)
* [ember-mobiledoc-editor](https://github.com/bustle/ember-mobiledoc-editor)
* [vue-mobiledoc-editor](https://github.com/alidcastano/vue-mobiledoc-editor)

### Utilities

* [mobiledoc-kit](https://github.com/bustle/mobiledoc-kit) editor toolkit
