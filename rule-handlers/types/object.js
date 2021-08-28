const Validator = require(__dirname + '/../../Validator')

module.exports = async ({
  rules,
  requestKey,
  requestValue,
  options,
  errorMessage,
  errorMessagesWrapper
}) => {
  if (requestValue?.__proto__ !== Object.prototype)
    return errorMessagesWrapper(errorMessage).emw2()

  const validationRules = rules['$' + requestKey]

  if (!validationRules) return

  if (options.errorMessages?.[requestKey]) {
    Object.assign(options.errorMessages, options.errorMessages[requestKey])

    delete options.errorMessages[requestKey]
  }

  const validation = new Validator(requestValue, validationRules, options)

  await validation.fails()

  if (validation.failed) return validation.errors
}
