'use strict'

const _isObject = require('lodash/isObject')

const processSchema = require('./util/process_schema')
const validateModel = require('./validate/model')
const validateAdapter = require('./validate/adapter')
const attachAdapterToModel = require('./util/attach_adapter_to_model')

module.exports = class HFDB {
  constructor ({ adapter, schema }) {
    validateAdapter(adapter)

    const processedSchema = processSchema(schema)

    // Setup models w/ adapter DB methods
    Object.keys(processedSchema).forEach(modelName => {
      const model = processedSchema[modelName]

      attachAdapterToModel(adapter, model)

      // Pull in custom model methods
      const { methods: customMethods } = model

      if (_isObject(customMethods)) {
        Object.keys(customMethods).forEach(customMethodName => {
          const m = customMethods[customMethodName]

          model[customMethodName] = m.bind(model, model)
        })
      }

      validateModel(model)

      this[modelName] = model // i.e. const { Candle } = db
    })

    this.adapter = adapter
  }

  close () {
    this.adapter.close()
  }
}
