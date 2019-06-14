const { nonce } = require('bfx-api-node-util')
const _includes = require('lodash/includes')
const assert = require('assert')

const genModelMethod = require('../../../test_util/gen_model_method_map')
const updateGenerator = require('models/method_generators/update')
const getGenerator = require('models/method_generators/get')
const setGenerator = require('models/method_generators/set')

describe('update generator', () => {
  const get = getGenerator(genModelMethod)
  const set = setGenerator(genModelMethod, get)
  const update = updateGenerator(genModelMethod, get)
  const id = `${nonce()}`

  it('throws an error if no updater func is provided', (done) => {
    try {
      update({ id }, null)
      done(new Error('no error thrown'))
    } catch (e) {
      assert(_includes(e.message, 'modifier required'))
      done()
    }
  })

  it('updates a DB item', () => {
    set({ id, str: 'towel-42' })
    update({ id }, v => {
      v.str = 'towel-9001'
      return v
    })

    const m = get({ id })
    assert.strictEqual(m.str, 'towel-9001')
  })
})
