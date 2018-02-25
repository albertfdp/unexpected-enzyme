# unexpected-enzyme

🚧 Work in progress

[![Build Status](https://travis-ci.org/albertfdp/unexpected-enzyme.svg?branch=master)](https://travis-ci.org/albertfdp/unexpected-enzyme)

## Installation

```sh
$ npm install unexpected unexpected-enzyme enzyme enzyme-adapter-react-16
```

with yarn

```sh
$ yarn add unexpected unexpected-enzyme enzyme enzyme-adapter-react-16
```

## Setup

```js
const unexpected = require('unexpected');
const unexpectedEnzyme = require('unexpected-enzyme');

const expect = unexpected.clone().use(unexpectedEnzyme);
```

## Documentation

Find it [here](https://albertfdp.github.io/unexpected-enzyme/)

## Development

```bash
$ git clone git@github.com:albertfdp/unexpected-enzyme.git
$ cd unexpected-enzyme
$ yarn install # or npm install
```

Running tests

```bash
$ yarn test
```

## Contributing

We welcome pull requests, bug reports, and extra test cases. If you find something that doesn't work as you believe it should, or where the output isn't as good as it could be, raise an issue!

## Thanks

Huge thanks to [@bruderstein](https://github.com/bruderstein) for an awesome job with [unexpected-react](https://github.com/bruderstein/unexpected-react), which this project relies on internally. And to [chai-enzyme](https://github.com/producthunt/chai-enzyme) as a great inspiration.
