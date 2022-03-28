module.exports = ({ value, errorMessage, argument: num }) => {
  if (!['string', 'number'].includes(typeof value) && !Array.isArray(value)) {
    return errorMessage.typeError
  }

  if (
    !(
      (typeof value === 'string' && value.length >= num) ||
      (typeof value === 'number' && value >= num) ||
      (Array.isArray(value) && value.length >= num)
    )
  ) {
    return errorMessage.main(num)
  }
}
