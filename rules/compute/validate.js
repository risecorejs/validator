const validator = require('../../index')

module.exports = async ({ argument, body, rawRules, options }) => {
  const keys = Array.isArray(argument) ? argument : argument.split(',').map((key) => key.trim())

  const _body = {}
  const _rawRules = {}

  for (const key of keys) {
    _body[key] = body[key]
    _rawRules[key] = rawRules[key]

    for (const field in rawRules) {
      if (rawRules.hasOwnProperty(field) && field.startsWith('$' + key)) {
        _rawRules[field] = rawRules[field]
      }
    }
  }

  const errors = await validator(_body, _rawRules, options)

  if (errors) {
    return errors
  }
}
