module.exports = ({
  requestValue,
  ruleArg,
  errorMessage,
  errorMessagesWrapper
}) => {
  const values = ruleArg.split(',').map((value) => eval(value))

  if (!values.includes(requestValue)) {
    errorMessage = errorMessagesWrapper(errorMessage).emw2()

    return errorMessage(values)
  }
}
