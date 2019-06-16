'use strict'

const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')
const _isFunction = require('lodash/isFunction')

const MODEL_TYPES = require('./model_types')
const processSchema = require('./util/process_schema')
const assignModelMethods = require('./util/assign_model_methods')
const validateAdapter = require('./validate/adapter')

module.exports = class HFDB {
  constructor({ adapter, schema }) {
    validateAdapter(adapter)

    const { mapMethods, genericMethods, collectionMethods } = adapter
    const processedSchema = processSchema(schema)

    // Setup models on the DB instance
    // i.e. const { Candle } = db
    Object.keys(processedSchema).forEach(modelName => {
      const model = processedSchema[modelName]
      const { path } = model

      if (!_isString(path) || _isEmpty(path)) {
        throw new Error(`model DB path not string or empty: ${modelName}`)
      }

      assignModelMethods(adapter, model, genericMethods)

      // Setup model methods
      switch (model.type) {
        case MODEL_TYPES.COLLECTION:
          assignModelMethods(adapter, model, collectionMethods)
          break;
        
        case MODEL_TYPES.MAP:
          assignModelMethods(adapter, model, mapMethods)
          break;

        default:
          throw new Error(`invalid model type: ${model.type} [${modelName}]`)
      }

      this[modelName] = model // actual assignment
    })

    this.adapter = adapter
  }

  close () {
    this.adapter.close()
  }
}
