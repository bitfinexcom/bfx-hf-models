const assert = require('assert')

const genModelMethod = require('../../../test_util/gen_model_method_collection')
const defaultDBData = require('../../../test_util/default_db_data')
const getAllGenerator = require('models/method_generators/get_all')

describe('get_all generator', () => {
  const getAll = getAllGenerator(genModelMethod)
  const defaultData = defaultDBData['debug_model_collection']

  it('returns all values under the model path', () => {
    const models = getAll()

    assert.strictEqual(models.length, defaultData.length)

    defaultData.forEach(({ str: defaultStr }) => {
      assert(!!models.find(({ str }) => str === defaultStr))
    })
  })
})
