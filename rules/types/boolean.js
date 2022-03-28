module.exports = ({ value, errorMessage }) => {
  if (typeof value !== 'boolean') {
    return errorMessage
  }
}
