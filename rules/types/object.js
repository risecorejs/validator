const Validator = require('../../Validator')

module.exports = async ({ rules, requestKey, requestValue, options, errorMessage, errorMessagesWrapper }) => {
  if (requestValue?.__proto__ !== Object.prototype) return errorMessagesWrapper(errorMessage).emw2()

  const validationRules = rules['$' + requestKey]

  if (!validationRules) {
    return
  }

  if (options.errorMessages?.pinpoint?.[requestKey]) {
    Object.assign(options.errorMessages.pinpoint, options.errorMessages.pinpoint[requestKey])

    delete options.errorMessages.pinpoint[requestKey]
  }

  const validation = new Validator(requestValue, validationRules, options)

  await validation.fails()

  if (validation.failed) {
    return validation.errors
  }
}
