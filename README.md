# mobiledoc-vdom-renderer

## Installation

 `yarn add @bustle/mobiledoc-vdom-renderer` or `npm install @bustle/mobiledoc-vdom-renderer --save`

## Usage
```jsx
/* global h */
import Renderer from '@bustle/mobiledoc-vdom-renderer'

// render = mobiledoc => vdom
const render = Renderer({ createElement: h })

// Instant <Mobiledoc/> component
export default function Mobiledoc ({ mobiledoc }) {
  return <div>{render(mobiledoc)}</div>
}
```

## Contributing

Contributions are welcome! This library is written in [Typescript](http://www.typescriptlang.org/) in a pure functional style. Many best practices are strictly enforced by code linting; using an editor that supports both type-checking and linting while-you-type is recommended!

To get started, clone this repository and run `npm install`.

### Test-driven development
Running `npm start` watches for changes, then lints and tests each file you touch. (Watching is provided by [`chokidar-cli`](https://github.com/kimmobrunfeldt/chokidar-cli).)

### Other useful commands
* `npm run format`: Fixes all automatically-fixable linting errors; in particular, applies [`prettier`](https://github.com/prettier/prettier) via [`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier) which reformats code by convention
* `npm run lint`: Executes typescript type-checking; [`tslint`](https://github.com/palantir/tslint) and [`eslint`](https://github.com/eslint/eslint) enforce [Standard style](https://standardjs.com/) and some functional programming best practices
* `npm test`: Run all tests once (with [`ava`](https://github.com/avajs/ava)) and generate a coverage report with [`nyc`](https://github.com/istanbuljs/nyc)
* `npm run snapshot`: This project uses [snapshot testing](https://github.com/avajs/ava#snapshot-testing) to compare observed output to expected output. This command updates all snapshots, so check your diff and make sure any changes look right!
