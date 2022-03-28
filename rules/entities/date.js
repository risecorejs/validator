const moment = require('moment')

module.exports = ({ value, argument: format, errorMessage }) => {
  if (!moment(value, format || true).isValid()) {
    return errorMessage
  }
}
