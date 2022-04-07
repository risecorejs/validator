module.exports = ({ argument: condition, body }) => {
  const operators = {
    '>=': (left, right) => left >= right,
    '>': (left, right) => left > right,

    '<=': (left, right) => left <= right,
    '<': (left, right) => left < right,

    '!==': (left, right) => left !== right,
    '!=': (left, right) => left != right,

    '===': (left, right) => left === right,
    '==': (left, right) => left == right
  }

  for (const [operator, handler] of Object.entries(operators)) {
    if (condition.includes(operator)) {
      const [key, value] = condition.split(operator)

      const result = handler(body[key], eval(value))

      if (!result) {
        return 'break'
      }

      break
    }
  }
}
