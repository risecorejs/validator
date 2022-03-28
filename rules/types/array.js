const _ = require('lodash')

const validator = require('../../index')

module.exports = async ({ rawRules, field, value, argument: type, options, errorMessage }) => {
  if (!Array.isArray(value)) {
    return errorMessage.main
  }

  if (type) {
    if (!['boolean', 'number', 'object', 'string'].includes(type)) {
      return errorMessage.typeNotSupported
    }

    const errors = {}

    for (const [index, item] of value.entries()) {
      if ((type === 'object' && item.constructor !== Object) || (typeof item !== type && type !== 'object')) {
        errors[index] = errorMessage.expectedType(type)

        continue
      }

      const _rawRules = rawRules['$' + field]

      if (_rawRules) {
        const _errors = await validator(
          ...(item.constructor === Object ? [item, _rawRules] : [{ data: item }, { data: _rawRules }]),
          options
        )

        if (_errors) {
          errors[index] = item.constructor === Object ? _errors : _errors.data
        }
      }
    }

    if (!_.isEmpty(errors)) {
      return errors
    }
  }
}
