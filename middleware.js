const Validator = require('./Validator')

module.exports = main

/**
 * MAIN
 * @param globalOptions {Object?}
 * @return {(function(req: Object, res: Object, next: Function): Object|void|any)}
 */
function main(globalOptions) {
  return (req, res, next) => {
    req.validator = validator

    /**
     * VALIDATOR
     * @param rules {Object}
     * @param localOptions {Object?}
     * @param emptyResult {any?}
     * @return {Promise<Object|void|any>}
     */
    async function validator(rules, localOptions, emptyResult) {
      const validator = new Validator(req.body, rules, {
        ...(globalOptions || {}),
        ...(localOptions || {})
      })

      await validator.fails()

      return validator.failed ? validator.errors : emptyResult
    }

    next()
  }
}
