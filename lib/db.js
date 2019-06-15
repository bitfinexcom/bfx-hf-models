'use strict'

const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')
const _isFunction = require('lodash/isFunction')

const MODEL_TYPES = require('./model_types')
const processSchema = require('./util/process_schema')
const validateAdapter = require('./validate/adapter')

module.exports = class HFDB {
  constructor({ adapter, schema }) {
    validateAdapter(adapter)

    const { dbInit, mapMethods, collectionMethods } = adapter
    const processedSchema = processSchema(schema)

    // Setup models on the DB instance
    // i.e. const { Candle } = db
    Object.keys(processedSchema).forEach(modelName => {
      const model = processedSchema[modelName]
      const { path } = model

      if (!_isString(path) || _isEmpty(path)) {
        throw new Error(`model DB path not string or empty: ${modelName}`)
      }

      // Setup model methods
      switch (model.type) {
        case MODEL_TYPES.COLLECTION:
          Object.keys(collectionMethods).forEach(methodName => {
            model[methodName] = async (...args) => {
              const db = _isFunction(dbInit) // allow for init w/ model params
                ? dbInit(model)
                : adapter.db

              return collectionMethods[methodName](db, model, ...args)
            }
        })
          break;
        
        case MODEL_TYPES.MAP:
          Object.keys(mapMethods).forEach(methodName => {
            model[methodName] = async (...args) => {
              const db = _isFunction(dbInit) // allow for init w/ model params
                ? dbInit(model)
                : adapter.db

              return mapMethods[methodName](db, model, ...args)
            }
          })
          break;

        default:
          throw new Error(`invalid model type: ${model.type} [${modelName}]`)
      }

      this[modelName] = model // actual assignment
    })
  }
}
