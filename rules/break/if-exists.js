module.exports = ({ body, argument: field, value }) => {
  if ((field && body[field] === void 0) || (!field && value === void 0)) {
    return 'break'
  }
}
