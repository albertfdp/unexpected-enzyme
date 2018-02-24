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

Then, you can add it as any other unexpected-plugins:

```js
const unexpected = require('unexpected');
const unexpectedEnzyme = require('unexpected-enzyme');

const expect = unexpected.clone().use(unexpectedEnzyme);
```

