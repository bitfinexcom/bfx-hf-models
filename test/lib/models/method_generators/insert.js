const assert = require('assert')
const { nonce } = require('bfx-api-node-util')

const genModelMethod = require('../../../test_util/gen_model_method_collection')
const insertGenerator = require('models/method_generators/insert')
const getAllGenerator = require('models/method_generators/get_all')

describe('insert generator', () => {
  const insert = insertGenerator(genModelMethod)
  const getAll = getAllGenerator(genModelMethod)

  it('inserts a value into the DB collection', () => {
    const str = `${nonce()}`

    insert({ str, mts: 15 })
    
    const models = getAll()

    assert(!!models.find(({ str: mStr }) => mStr === str))
  })

  it('maintains sort upon insert', () => {
    const mts = () => Math.floor(Math.random() * 100000)

    for (let i = 0; i < 5; i += 1) {
      insert({ str: `${nonce()}`, mts: mts() })
    }

    const models = getAll()

    for (let i = 1; i < models.length - 1; i += 1) {
      assert(models[i - 1].mts > models[i].mts)
    }
  })
})