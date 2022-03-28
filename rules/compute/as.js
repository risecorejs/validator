module.exports = ({ value, body, argument, errorMessage, field }) => {
  if (value !== body[argument]) {
    return errorMessage(field, argument)
  }
}
