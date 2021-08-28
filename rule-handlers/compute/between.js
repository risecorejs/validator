module.exports = ({
  requestValue: value,
  ruleArg,
  errorMessage,
  errorMessagesWrapper
}) => {
  const [leftNum, rightNum] = ruleArg.split('-')

  errorMessage = errorMessagesWrapper(errorMessage).emw1(false)

  if (
    typeof value !== 'string' &&
    typeof value !== 'number' &&
    !Array.isArray(value)
  )
    return errorMessage.typeError

  if (
    !(
      (typeof value === 'string' && value.length <= rightNum) ||
      (typeof value === 'number' && value <= rightNum) ||
      (Array.isArray(value) && value.length <= rightNum)
    )
  )
    return errorMessage.max(rightNum)

  if (
    !(
      (typeof value === 'string' && value.length >= leftNum) ||
      (typeof value === 'number' && value >= leftNum) ||
      (Array.isArray(value) && value.length >= leftNum)
    )
  )
    return errorMessage.min(leftNum)
}
