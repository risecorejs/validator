module.exports = ({
  requestValue,
  ruleArg: length,
  errorMessage,
  errorMessagesWrapper
}) => {
  if (requestValue.length !== +length) {
    errorMessage = errorMessagesWrapper(errorMessage).emw2()

    return errorMessage(length)
  }
}
