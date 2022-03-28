const _ = require('lodash')

module.exports = ({ argument: condition, body, value, errorMessage }) => {
  const required = condition ? getRequired(condition, body) : true

  if (required) {
    if (typeof value === 'string') {
      value = value.trim()
    }

    if (
      value === void 0 ||
      value === null ||
      value.length === 0 ||
      (value.constructor === Object && _.isEmpty(value))
    ) {
      return errorMessage
    }
  }
}

/**
 * GET-REQUIRED
 * @param condition {string}
 * @param body {Object}
 * @return {boolean}
 */
function getRequired(condition, body) {
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

      return handler(body[key], eval(value))
    }
  }
}
