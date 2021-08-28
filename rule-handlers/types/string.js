module.exports = ({ requestValue, errorMessage, errorMessagesWrapper }) => {
  if (typeof requestValue !== 'string')
    return errorMessagesWrapper(errorMessage).emw2()
}
