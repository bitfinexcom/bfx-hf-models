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

const strategyExecutionResults = [{
  id: '1',
  name: 'first strategy',
  symbol: "tMATIC:USD",
  strategyId: '2789ea58-e8a4-417d-b7db-a8d4342faf7d',
  strategyOpts: {
    "id": "2789ea58-e8a4-417d-b7db-a8d4342faf7d",
    "name": "first strategy",
    "symbol": "tMATIC:USD",
    "tf": "1m",
    "includeTrades": false,
    "seedCandleCount": 150,
    "margin": false
  },
  "startedOn": 1650953562507,
  "stoppedOn": 1650953569338,
  "results": {
    "vol": 0,
    "fees": 0,
    "nTrades": 0,
    "nCandles": 52,
    "nStrategyTrades": 0,
    "nOpens": 0,
    "nGains": 0,
    "nLosses": 0,
    "stdDeviation": 0,
    "pl": 0,
    "pf": 0,
    "avgPL": 0,
    "minPL": 0,
    "maxPL": 0,
    "strategy": {
      "trades": []
    }
  }
}, {
  id: '2',
  name: 'first strategy',
  symbol: "tETHUSD",
  strategyId: '2789ea58-e8a4-417d-b7db-a8d4342faf7d',
  strategyOpts: {
    "id": "2789ea58-e8a4-417d-b7db-a8d4342faf7d",
    "name": "first strategy",
    "symbol": "tETHUSD",
    "tf": "1m",
    "includeTrades": false,
    "seedCandleCount": 150,
    "margin": false
  },
  "startedOn": 1650953583457, 
  "stoppedOn": 1650953596912,
  "results": {
    "vol": 0,
    "fees": 0,
    "nTrades": 0,
    "nCandles": 52,
    "nStrategyTrades": 0,
    "nOpens": 0,
    "nGains": 0,
    "nLosses": 0,
    "stdDeviation": 0,
    "pl": 0,
    "pf": 0,
    "avgPL": 0,
    "minPL": 0,
    "maxPL": 0,
    "strategy": {
      "trades": []
    }
  }
}]

let db
describe('Strategy Execution Results', () => {
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

  afterEach(() => {
    db.close()
  })

  it('CRUD operation of algo order params', async () => {
    const { StrategyExecution } = db

    const res = await Promise.all(
      strategyExecutionResults.map((res) => StrategyExecution.set(res))
    )

    assert.deepStrictEqual(res, strategyExecutionResults, 'did not save strategy execution results')

    const data = await StrategyExecution.find([
      ['symbol', '=', 'tMATIC:USD']
    ])

    assert.deepStrictEqual(data.length, 1, 'did not fetch strategy execution results a/c to given query')

    await StrategyExecution.rm('2')

    const data1 = await StrategyExecution.getAll()

    assert.deepStrictEqual(Object.values(data1).length, 1, 'did not remove strategy execution results a/c to given query')
  })
})
