const validator = require('../../index')

module.exports = async ({ value, errorMessage, rawRules, field, options }) => {
  if (value?.constructor !== Object) {
    return errorMessage
  }

  const _rawRules = rawRules['$' + field]

  if (_rawRules) {
    const errors = await validator(value, _rawRules, options)

    if (errors) {
      return errors
    }
  }
}
