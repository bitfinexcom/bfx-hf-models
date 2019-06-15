'use strict'

const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')
const _isFunction = require('lodash/isFunction')

const MODEL_TYPES = require('./lib/model_types')
const processSchema = require('./lib/util/process_schema')

module.exports = class HFDB {
  constructor({ adapter, schema }) {
    const { dbInit, mapMethods, collectionMethods } = adapter
    const processedSchema = processSchema(schema)

    Object.keys(processedSchema).forEach(modelName => {
      const model = processedSchema[modelName]
      const { path } = model
      const db = _isFunction(dbInit)
        ? dbInit(model)
        : adapter.db

      const collectionMethodArgs = [db, { path }]
      const mapMethodArgs = [db, { path }]

      if (!_isString(path) || _isEmpty(path)) {
        throw new Error(`model DB path not string or empty: ${modelName}`)
      }

      switch (model.type) {
        case MODEL_TYPES.COLLECTION:
          Object.keys(collectionMethods).forEach(methodName => {
            model[methodName] = collectionMethods[methodName].bind(...[model, ...collectionMethodArgs])
          })
          break;
        
        case MODEL_TYPES.MAP:
          Object.keys(mapMethods).forEach(methodName => {
            model[methodName] = mapMethods[methodName].bind(...[model, ...mapMethodArgs])
          })
          break;

        default:
          throw new Error(`invalid model type: ${model.type} [${modelName}]`)
      }

      this[modelName] = model
    })
  }
}
