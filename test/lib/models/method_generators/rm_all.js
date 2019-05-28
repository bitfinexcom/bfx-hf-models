const assert = require('assert')

const genModelMethod = require('../../../test_util/gen_model_method_collection')
const getAllGenerator = require('models/method_generators/get_all')
const insertGenerator = require('models/method_generators/insert')
const rmAllGenerator = require('models/method_generators/rm_all')
const getGenerator = require('models/method_generators/get')

describe('rm_all generator', () => {
  const get = getGenerator(genModelMethod)
  const rmAll = rmAllGenerator(genModelMethod, get)
  const insert = insertGenerator(genModelMethod)
  const getAll = getAllGenerator(genModelMethod)

  it('removes all DB items', () => {

    // save for later tests & sanity check
    const initialModels = getAll()
    assert(initialModels.length > 0)

    rmAll()
    const currentModels = getAll()
    assert(currentModels.length === 0) // rmAll check

    // restore
    initialModels.forEach(m => insert(m))

    const finalModels = getAll()
    assert.deepStrictEqual(finalModels, initialModels)
  })
})