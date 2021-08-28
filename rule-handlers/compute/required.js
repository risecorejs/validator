module.exports = ({
  request,
  requestValue: value,
  ruleArg: condition,
  errorMessage,
  errorMessagesWrapper
}) => {
  let required = true

  if (condition) {
    const operators = [
      ['>=', (left, right) => left >= right],
      ['>', (left, right) => left > right],

      ['<=', (left, right) => left <= right],
      ['<', (left, right) => left < right],

      ['!==', (left, right) => left !== right],
      ['!=', (left, right) => left != right],

      ['===', (left, right) => left === right],
      ['==', (left, right) => left == right]
    ]

    for (const [operator, handler] of operators) {
      if (condition.includes(operator)) {
        const [key, value] = condition.split(operator)

        const result = handler(request[key], eval(value))

        if (!result) required = false

        break
      }
    }
  }

  if (required) {
    if (typeof value === 'string') value = value.trim()

    if (
      value === void 0 ||
      value === null ||
      value.length === 0 ||
      (value.__proto__ === Object.prototype && !Object.keys(value).length)
    )
      return errorMessagesWrapper(errorMessage).emw2()
  }
}
