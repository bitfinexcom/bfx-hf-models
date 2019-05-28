const assert = require('assert')
const _includes = require('lodash/includes')
const { nonce } = require('bfx-api-node-util')

const genModelMethod = require('../../../test_util/gen_model_method_map')
const getGenerator = require('models/method_generators/get')
const createGenerator = require('models/method_generators/create')

describe('create generator', () => {
  const get = getGenerator(genModelMethod)
  const create = createGenerator(genModelMethod, get)

  it('creates a DB document if it does not exist', () => {
    const id = `${nonce()}`
    create({ id, str: '42' })
    const m = get({ id })
    assert.strictEqual(m.str, '42')
  })

  it('throws an error if creating a document that exists', (done) => {
    const id = `${nonce()}`
    create({ id, str: '42' })

    try {
      create({ id, str: '42' })
      done(new Error('failed to throw error on overwrite'))
    } catch (e) {
      assert(_includes(e.message, 'already exists'), 'invalid error')
      done()
    }
  })
})