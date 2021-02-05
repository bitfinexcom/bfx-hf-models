/* eslint-env mocha */

'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs')

const rimraf = require('rimraf')

const HFDBLowDBAdapter = require('bfx-hf-models-adapter-lowdb')
const { schema: HFDBBitfinexSchema } = require('bfx-hf-ext-plugin-bitfinex')

const HFDB = require('../')
const dbPath = path.join(__dirname, 'fixtures')

let db
describe('Favorites', () => {
  beforeEach(() => {
    rimraf.sync(dbPath)
    fs.mkdirSync(dbPath, { recursive: true })

    db = new HFDB({
      schema: HFDBBitfinexSchema,
      adapter: HFDBLowDBAdapter({
        dbPath: path.join(dbPath, 'db.json'),
        schema: HFDBBitfinexSchema
      })
    })
  })

  it('migrating to multiple modes to support paper mode', async () => {
    const { FavouriteTradingPairs } = db

    const res0 = await FavouriteTradingPairs.getAll()
    assert.deepStrictEqual(res0, {})

    const data = {
      pairs: ['BTCUSD', 'CRAUTI:USD']
    }

    await FavouriteTradingPairs.set(data)

    const { favouriteTradingPairs = {} } = await FavouriteTradingPairs.getAll()
    const { pairs = [] } = favouriteTradingPairs
    assert.deepStrictEqual(pairs, ['BTCUSD', 'CRAUTI:USD'])

    await FavouriteTradingPairs.set({ main: 'main', pairs })
    await FavouriteTradingPairs.set({ paper: 'paper', pairs: ['AAABBB'] })

    const res1 = await FavouriteTradingPairs.get('main')
    assert.deepStrictEqual(res1.pairs, ['BTCUSD', 'CRAUTI:USD'])

    const res2 = await FavouriteTradingPairs.get('paper')
    assert.deepStrictEqual(res2.pairs, ['AAABBB'])

    const res3 = await FavouriteTradingPairs.getAll()
    assert.deepStrictEqual(res3.favouriteTradingPairs.pairs, ['BTCUSD', 'CRAUTI:USD'])
  })
})
