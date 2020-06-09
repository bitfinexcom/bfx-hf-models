'use strict'

/**
 * An array containing 3 values; a field name, condition, and target value. For
 * example:
 *
 * `['fieldA', '<', 1000]` - states that fieldA must be less than 1000
 *
 * Used to run queries against the DB.
 *
 * @see DBAdapterMapMethods~find
 *
 * @typedef {Array} DBAdapterCriteria
 * @property {string} 0 - field name on record, value used as `lvalue`
 * @property {string} 1 - condition, can be '=', '!=', '>', '>=', '<', or '<='
 * @property {string|number} 2 - `rvalue`
 */
