const { nonce } = require('bfx-api-node-util')
const assert = require('assert')

const genModelMethod = require('../../../test_util/gen_model_method_map')
const setGenerator = require('models/method_generators/set')
const getGenerator = require('models/method_generators/get')
const rmGenerator = require('models/method_generators/rm')

describe('rm generator', () => {
  const get = getGenerator(genModelMethod)
  const set = setGenerator(genModelMethod, get)
  const rm = rmGenerator(genModelMethod, get)

  it('removes a single DB item', () => {
    const id = `${nonce()}`

    set({ id, str: 'towel-42' })

    // sanity check
    const m = get({ id })
    assert.strictEqual(m.str, 'towel-42')

    rm({ id })

    assert(!get({ id })) // rm check
  })
})
