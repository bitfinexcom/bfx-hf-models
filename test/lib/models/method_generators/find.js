const assert = require('assert')
const _includes = require('lodash/includes')

const genModelMethod = require('../../../test_util/gen_model_method_collection')
const findGenerator = require('models/method_generators/find')

describe('find generator', () => {
  const find = findGenerator(genModelMethod)

  it('throws an error if no filter function provided', (done) => {
    try {
      find()
      done(new Error('error not thrown'))
    } catch (e) {
      assert(_includes(e.message, 'function required'))
      done()
    }
  })

  it('finds all relevant values with the filter function', () => {
    const mtsModels = find(({ mts }) => mts > 0)

    assert.strictEqual(mtsModels.length, 2)
    assert(!!mtsModels.find(({ str }) => str === 'a'))
    assert(!!mtsModels.find(({ str }) => str === 'b'))
    assert(!mtsModels.find(({ str }) => str === 'c')) // mts: 0

    const strModels = find(({ str }) => str === 'c')

    assert.strictEqual(strModels.length, 1)
    assert.deepStrictEqual(strModels[0], {
      str: 'c',
      mts: 0
    })
  })
})
