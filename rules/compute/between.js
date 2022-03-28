module.exports = ({ argument, value, errorMessage }) => {
  const [leftNum, rightNum] = Array.isArray(argument) ? argument : argument.split('-')

  if (!['string', 'number'].includes(typeof value) && !Array.isArray(value)) {
    return errorMessage.typeError
  }

  if (
    !(
      (typeof value === 'string' && value.length <= rightNum) ||
      (typeof value === 'number' && value <= rightNum) ||
      (Array.isArray(value) && value.length <= rightNum)
    )
  ) {
    return errorMessage.max(rightNum)
  }

  if (
    !(
      (typeof value === 'string' && value.length >= leftNum) ||
      (typeof value === 'number' && value >= leftNum) ||
      (Array.isArray(value) && value.length >= leftNum)
    )
  ) {
    return errorMessage.min(leftNum)
  }
}
