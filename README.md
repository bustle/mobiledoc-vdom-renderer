# mobiledoc-vdom-renderer

This library traverses [Mobiledoc](https://github.com/bustle/mobiledoc-kit) documents and passes them to your supplied `createElement` function. (This is also often called `h` for [hyperscript](https://github.com/hyperhype/hyperscript) or, with JSX, is your _pragma_.) These functions return virtual DOM, so you can embed mobiledocs “natively” in a framework like [React](https://reactjs.org/), [preact](https://preactjs.com/), or [hyperapp](https://github.com/hyperapp/hyperapp), or simply render mobiledocs directly to DOM  with a micro-renderer such as [picodom](https://github.com/JorgeBucaran/picodom).

Alternatively, you could use this library to convert your mobiledocs to an arbitrary AST by adopting `createElement`’s standard `(nodeType, props, ...children)` signature as your transformer.

## Installation

`npm install @bustle/mobiledoc-vdom-renderer --save`  
or  
`yarn add @bustle/mobiledoc-vdom-renderer`

## Usage
```jsx
/* @jsx h */
import Renderer from '@bustle/mobiledoc-vdom-renderer'

// render: Mobiledoc => VNode[]
const render = Renderer({ createElement: h })

// Instant <Mobiledoc/> component
export default function Mobiledoc ({ mobiledoc }) {
  return <div>{render(mobiledoc)}</div>
}
```

# API

```javascript
import Renderer, { upgradeMobiledoc } from '@bustle/mobiledoc-vdom-renderer'
```

### `Renderer(options)` _(default)_

`(options: Options = { getElementDefault }) => Renderer`
  The library’s default export takes an `options` object, and returns a **render** function with the signature `(mobiledoc: Mobiledoc) => VNode[]`.

#### Options:

* `createElement` `(el: string | Component, props?: object,
...children: Node[]) => VNode` _required_

* `getCardComponent` `(type: string) => string | ({ payload }) => VNode` Getter which receives a card type and returns a function to receive its props `{ payload }` (required if your mobiledoc contains cards)

* `getAtomComponent` `(type: string) => string | ({ payload }) => VNode` Getter which receives an atom type and returns a function to receive its props `{ payload, children }` (required if your mobiledoc contains atoms)

* `getElement` `(tagName: string) => string | (attributes: {}) => VNode` Getter which receives a tag name and may return a new tag name in order to override any markup in the mobiledoc (for instance, to map your `'h1'`s to `'h2'`s); alternatively, return a function (such as a component) which will receive the markup’s attributes as its props

  `getElement`’s default value is exported as `getElementDefault`, which `throw`s on any tag names which are not on Mobiledoc’s [whitelists](types/Mobiledoc.ts). It is exported so you may use it as a fallback within your own `getElement`; however, simply overriding `getElement` with a `tagName => tagName` identity function allows rendering mobiledocs which contain arbitrary tags.

### `upgradeMobiledoc`

`(mobiledoc: Mobiledoc) => Mobiledoc`

Upgrades mobiledocs from earlier versions to the current (`0.3.1`) format.

## Contributing

Contributions are welcome! This library is written in [Typescript](http://www.typescriptlang.org/) in a pure functional style. Many best practices are strictly enforced by code linting; using an editor that supports both type-checking and linting while-you-type is recommended.

To get started, clone this repository and run `npm install`.

### Test-driven development
`npm start` will watch for changes, then lint and test each file you touch. (Watching is provided by [`chokidar-cli`](https://github.com/kimmobrunfeldt/chokidar-cli).)

### Other useful commands
* `npm test`: Run all tests once (with [`ava`](https://github.com/avajs/ava)) and generate a coverage report with [`nyc`](https://github.com/istanbuljs/nyc)
* `npm run format`: Fixes all automatically-fixable linting errors; in particular, applies [`prettier`](https://github.com/prettier/prettier) via [`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier) which reformats code by convention
* `npm run lint`: Executes Typescript type-checking; [`tslint`](https://github.com/palantir/tslint) and [`eslint`](https://github.com/eslint/eslint) enforce [Standard style](https://standardjs.com/) and some functional programming best practices
* `npm run snapshot`: This project uses [snapshot testing](https://github.com/avajs/ava#snapshot-testing) to compare observed output to expected output. This command updates all snapshots, so check your diff before committing and make sure any changes look right!
* `npm run build`: Builds the library to the `dist/` to prepare for release
