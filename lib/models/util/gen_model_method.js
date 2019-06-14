const _last = require('lodash/last')
const _isArray = require('lodash/isArray')
const _isObject = require('lodash/isObject')
const _isFunction = require('lodash/isFunction')
const _isEmpty = require('lodash/isEmpty')

// NOTE: debug path differs from filename for clarity in logs
const debug = require('debug')('bfx:hf:models:util:access-method')

module.exports = (modelFuncArgs) => (...callerArgs) => {
  const {
    name, key, path, sort, db, funcArgs = []
  } = modelFuncArgs

  // Allow for straight debug string, or fmt string w/ args
  const modifier = _last(funcArgs)
  let debugArgs = funcArgs.length > 1 ? funcArgs[0] : null

  if (!_isArray(debugArgs)) {
    debugArgs = [debugArgs]
  }

  // Note that no document may be provided (getAll, etc)
  // Generate key for document w/ keyCB
  const [doc] = callerArgs
  const k = _isObject(doc) ? key(doc) : null

  // Remove document from arguments if provided (TODO: refactor)
  let cleanCallerArgs

  if (_isObject(doc) && !_isFunction(doc)) {
    [, ...otherArgs] = callerArgs
    cleanCallerArgs = otherArgs
  } else {
    cleanCallerArgs = [...callerArgs]
  }

  if (_isArray(debugArgs) && !_isEmpty(debugArgs)) {
    const [ debugFmt, ...debugData ] = debugArgs

    // NOTE: pretty key formatting
    debug(
      `[${name}${k ? ` ${k}` : ''}] ${debugFmt}`,
      ...debugData
    )
  }

  return modifier({
    args: cleanCallerArgs,
    key: `${path}.${k}`,

    doc,
    name,
    path,
    sort,
    db
  }, ...cleanCallerArgs)
}
