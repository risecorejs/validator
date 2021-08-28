module.exports = ({
  request,
  requestKey,
  requestValue,
  ruleArg,
  errorMessage,
  errorMessagesWrapper
}) => {
  if (requestValue !== request[ruleArg]) {
    errorMessage = errorMessagesWrapper(errorMessage).emw2()

    return errorMessage(requestKey, ruleArg)
  }
}
