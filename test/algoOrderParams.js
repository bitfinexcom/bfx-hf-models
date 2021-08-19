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

const algoOrderParams = [{
  id: '1',
  name: 'first algo params settings',
  algoID: 'bfx-ping_pong',
  symbol: 'tETHUSD',
  params: {
    _symbol: 'tETHUSD'
  }
}, {
  id: '2',
  name: 'second algo params settings',
  algoID: 'bfx-ping_pong',
  symbol: 'tETHUSD',
  params: {
    _symbol: 'tETHUSD'
  }
}, {
  id: '3',
  name: 'second algo params settings',
  algoID: 'bfx-ping_pong',
  symbol: 'tBTCUSD',
  params: {
    _symbol: 'tBTCUSD'
  }
}]

let db
describe('Algo Order Params', () => {
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
    const { AlgoOrderParams } = db

    const res = await Promise.all(
      algoOrderParams.map((params) => AlgoOrderParams.set(params))
    )

    assert.deepStrictEqual(res, algoOrderParams, 'did not save algo order params')

    const data = await AlgoOrderParams.find([
      ['algoID', '=', 'bfx-ping_pong'],
      ['symbol', '=', 'tETHUSD']
    ])

    assert.deepStrictEqual(data.length, 2, 'did not fetch algo order params a/c to given query')

    await AlgoOrderParams.rm('1')

    const data1 = await AlgoOrderParams.getAll()

    assert.deepStrictEqual(Object.values(data1).length, 2, 'did not remove algo order params a/c to given query')
  })
})
