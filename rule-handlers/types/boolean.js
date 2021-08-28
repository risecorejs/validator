module.exports = ({ requestValue, errorMessage, errorMessagesWrapper }) => {
  if (typeof requestValue !== 'boolean')
    return errorMessagesWrapper(errorMessage).emw2()
}
