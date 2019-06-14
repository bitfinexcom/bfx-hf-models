const assert = require('assert')

const genModelMethod = require('../../../test_util/gen_model_method_map')
const defaultDBData = require('../../../test_util/default_db_data')
const getGenerator = require('models/method_generators/get')

const defaultMapData = defaultDBData['debug_model_map']

describe('get generator', () => {
  const get = getGenerator(genModelMethod)

  it('returns a database value by key', () => {
    const id = Object.keys(defaultMapData)[0]
    const m = get({ id })
    assert.strictEqual(m.str, defaultMapData[id].str)
  })
})
