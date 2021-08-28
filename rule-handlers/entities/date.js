const moment = require('moment')

module.exports = ({
  requestValue,
  ruleArg: format,
  errorMessage,
  errorMessagesWrapper
}) => {
  if (!moment(requestValue, format ?? true).isValid())
    return errorMessagesWrapper(errorMessage).emw2()
}
