const assert = require('assert')
const { nonce } = require('bfx-api-node-util')

const genModelMethod = require('../../../test_util/gen_model_method_map')
const getGenerator = require('models/method_generators/get')
const setGenerator = require('models/method_generators/set')

describe('set generator', () => {
  const get = getGenerator(genModelMethod)
  const set = setGenerator(genModelMethod, get)

  it('sets a database value', () => {
    const id = `${nonce()}`
    set({ id, str: '42' })
    const m = get({ id })
    assert.strictEqual(m.str, '42')
  })
})