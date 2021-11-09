const Validator = require('../../Validator')

module.exports = async ({ request, rules, ruleArg, options }) => {
  const keys = ruleArg.split(',')

  const _request = {}
  const _rules = {}

  keys.forEach((key) => {
    _request[key] = request[key]
    _rules[key] = rules[key]

    Object.keys(rules).forEach((_key) => {
      if (_key.startsWith('$' + key)) {
        _rules[_key] = rules[_key]
      }
    })
  })

  const validator = new Validator(_request, _rules, options)

  await validator.fails()

  if (validator.failed) {
    return validator.errors
  }
}
