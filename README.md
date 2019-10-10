## Bitfinex Honey Framework Database System for Node.JS

[![Build Status](https://travis-ci.org/bitfinexcom/bfx-hf-models.svg?branch=master)](https://travis-ci.org/bitfinexcom/bfx-hf-models)

This repo implements a backend-agnostic database system for the Bitfinex Honey Framework. It is used by all HF repos for data storage, i.e:

* `bfx-hf-data-server`
* `bfx-hf-algo-server`
* `bfx-hf-server`

Both the DB backend and exchange-specific schema methods can be configured upon initialization. There are currently two official exchange adapters:

* `bfx-hf-ext-plugin-bitfinex` - implements Bitfinex-specific model methods
* `bfx-hf-ext-plugin-dummy` - provides the base set of DB methods

Besides these, two DB backends are available:

* `bfx-hf-models-adapter-lowdb`
* `bfx-hf-models-adapter-sql` - uses knex internally, allowing flexibility in DB selection

### Features

* DB-agnostic; currently two official backends are supported: `lowdb` and `knex` for SQL databases.
* Exchange-agnostic; exchange-specific sync logic is provided via a plugin system

#### Available Models
* AlgoOrder
* Backtest
* Candle
* Credential
* Market
* Strategy
* Trade

### Installation

```bash
npm i --save bfx-hf-models
```

### Quickstart

```js
const HFDB = require('bfx-hf-models')
const HFDBLowDBAdapter = require('bfx-hf-models-adapter-lowdb')
const { schema: DummySchema } = require('bfx-hf-ext-plugin-dummy')

const db = new HFDB({
  schema: DummySchema,
  adapter: HFDBLowDBAdapter({
    dbPath: './db.json',
  })
})

// db is now ready to be used; see examples below
```

### Docs

[Refer to `docs/models.md`](/docs/models.md) for an overview of the available models and their schema, [and `docs/methods.md`](/docs/methods.md) for a list of methods available for both map & collection models.

Executable examples are available [within `examples/`](/examples).

### Examples
#### Usage of built-in models & methods
```js
const HFDB = require('bfx-hf-models')
const HFDBLowDBAdapter = require('bfx-hf-models-adapter-lowdb')
const { schema: DummySchema } = require('bfx-hf-ext-plugin-dummy')

const db = new HFDB({
  schema: DummySchema,
  adapter: HFDBLowDBAdapter({
    dbPath: './db.json',
  })
})

// All default models are available, but will lack exchange specific methods (i.e Candle.sync_range())
const {
  AlgoOrder, Backtest, Candle, Credential, Market, Strategy, Trade
} = db

const allCandles = await Candle.getAll()
const allTrades = await Trade.getAll()
const activeAlgoOrders = await AlgoOrder.find(['active', '=', true])
const allCredentialsByCID = await Credential.getAll()
const allCredentials = Object.values(allCredentialsByCID)
const credential = await Credential.create({
  cid: Date.now(),
  key: 'some_public_key',
  secret: 'some_secret_key',
  meta: 'credential information'
})

//  etc...
```

#### Usage of bitfinex model methods
As above, but with the bitfinex plugin the `Candle` and `Trade` models will gain a `syncRange()` method which populates the local DB with data from the exchange API.

```js
const HFDB = require('bfx-hf-models')
const HFDBLowDBAdapter = require('bfx-hf-models-adapter-lowdb')
const { schema: BitfinexSchema } = require('bfx-hf-ext-plugin-bitfinex')

const db = new HFDB({
  schema: BitfinexSchema,
  adapter: HFDBLowDBAdapter({
    dbPath: './db.json',
  })
})

const SYMBOL = 'tBTCUSD'
const TIME_FRAME = '1m'
const END_MTS = Date.now()
const START_MTS = END_MTS - (60 * 60 * 1000)
const { Candle } = db

// sync range
await Candle.syncRange({
  exchange: 'bitfinex',
  type: 'trade',
  symbol: SYMBOL,
  tf: TIME_FRAME,
}, {
  start: START_MTS,
  end: END_MTS,
})

// candles are now in DB, and can be queried
const bitfinexCandles = await Candle.getInRange([
  ['exchange', '=', 'bitfinex'],
  ['symbol', '=', SYMBOL],
  ['tf', '=', TIME_FRAME]
], {
  key: 'mts',
  start: START_MTS,
  end: END_MTS
})

// etc...
```

### Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request