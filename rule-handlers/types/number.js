module.exports = ({ requestValue, errorMessage, errorMessagesWrapper }) => {
  if (typeof requestValue !== 'number')
    return errorMessagesWrapper(errorMessage).emw2()
}
