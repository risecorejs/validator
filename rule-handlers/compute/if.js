module.exports = ({ request, ruleArg: condition }) => {
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

      if (!result) return 'skip'

      break
    }
  }
}
