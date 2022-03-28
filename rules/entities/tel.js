const lpn = require('libphonenumber-js')

module.exports = ({ value, errorMessage, argument: countryCode }) => {
  if (typeof value !== 'string') {
    return errorMessage.typeError
  }

  const tel = lpn(value)

  if (tel === void 0 || !tel.isValid() || value.match(/[A-ZА-Я]/i)) {
    return errorMessage.main
  }

  if (countryCode && tel.country !== countryCode) {
    return errorMessage.countryCode
  }
}
