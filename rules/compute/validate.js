const Validator = require('../../Validator')

module.exports = async ({ request, rules, ruleArg }) => {
  const keys = ruleArg.split(',')

  const _request = {}
  const _rules = {}

  keys.forEach((key) => {
    _request[key] = request[key]
    _rules[key] = rules[key]
  })

  const validator = new Validator(_request, _rules)

  await validator.fails()

  if (validator.failed) {
    return validator.errors
  }
}
