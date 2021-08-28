const Validator = require(__dirname + '/Validator')

module.exports =
  (globalOptions = {}) =>
  (req, res, next) => {
    req.validator = async (rules, localOptions = {}) => {
      const validator = new Validator(req.body, rules, {
        ...globalOptions,
        ...localOptions
      })

      await validator.fails()

      return validator.failed ? validator.errors : null
    }

    next()
  }
