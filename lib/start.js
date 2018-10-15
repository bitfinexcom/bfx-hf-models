'use strict'

const debug = require('debug')('bfx:hf:models:start')
const Nems = require('nems')

module.exports = (workingDirectory) => {
  return Nems.start('3.6.6', null, 27017, true, true, workingDirectory).then((pid) => {
    debug('started mongoDB instance at PID %s', pid)
  })
}
