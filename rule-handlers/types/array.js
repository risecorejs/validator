const Validator = require(__dirname + '/../../Validator')

module.exports = async ({
  rules,
  requestKey,
  requestValue,
  ruleArg: type,
  options,
  errorMessage,
  errorMessagesWrapper
}) => {
  errorMessage = errorMessagesWrapper(errorMessage).emw1()

  if (!Array.isArray(requestValue)) return errorMessage.main()

  if (!type) return

  const availableTypes = ['string', 'boolean', 'number', 'object']

  if (!availableTypes.includes(type)) return errorMessage.typeNotSupported

  const errors = []

  for (const [index, item] of requestValue.entries()) {
    if (item === undefined) continue

    if (
      (type === 'object' && item.__proto__ !== Object.prototype) ||
      (typeof item !== type && type !== 'object')
    ) {
      errors[index] = {
        message: errorMessage.expectedType(type),
        index
      }

      continue
    }

    const validationRules = rules['$' + requestKey + ':' + type]

    if (!validationRules) continue

    const wrapper = (val) => (type === 'object' ? val : { message: val })

    if (options.errorMessages?.[requestKey]?.[type]) {
      Object.assign(
        options.errorMessages,
        wrapper(options.errorMessages[requestKey][type])
      )

      delete options.errorMessages[requestKey]
    }

    const validation = new Validator(
      wrapper(item),
      wrapper(validationRules),
      options
    )

    await validation.fails()

    if (validation.failed) {
      errors[index] = { ...validation.errors, index }
    }
  }

  if (errors.length) return errors
}
