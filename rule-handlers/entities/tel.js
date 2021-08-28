const lpn = require('libphonenumber-js')

module.exports = ({
  requestValue,
  ruleArg: countryCode,
  errorMessage,
  errorMessagesWrapper
}) => {
  errorMessage = errorMessagesWrapper(errorMessage).emw1()

  if (typeof requestValue !== 'string') return errorMessage.typeError

  const tel = lpn(requestValue)

  if (tel === void 0 || !tel.isValid() || requestValue.match(/[A-ZА-Я]/i))
    return errorMessage.main()

  if (countryCode && tel.country !== countryCode)
    return errorMessage.countryCode
}
