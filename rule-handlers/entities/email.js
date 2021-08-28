module.exports = ({
  requestValue: value,
  errorMessage,
  errorMessagesWrapper
}) => {
  if (
    typeof value !== 'string' ||
    value.trim() === '' ||
    !value.match(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    )
  )
    return errorMessagesWrapper(errorMessage).emw2()
}
