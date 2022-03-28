module.exports = ({ value, argument: length, errorMessage }) => {
  if (value.length !== +length) {
    return errorMessage(length)
  }
}
