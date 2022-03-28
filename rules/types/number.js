module.exports = ({ value, errorMessage }) => {
  if (typeof value !== 'number') {
    return errorMessage
  }
}
