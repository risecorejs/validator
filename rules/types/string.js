module.exports = ({ value, errorMessage }) => {
  if (typeof value !== 'string') {
    return errorMessage
  }
}
