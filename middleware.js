const validator = require('./index')

module.exports = (options) => (req, res, next) => {
  req.validator = async (rules) => await validator(req.body, rules, options)

  next()
}
