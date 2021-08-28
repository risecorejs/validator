module.exports = ({ requestValue }) => {
  if (
    requestValue?.length === 0 ||
    (requestValue?.__proto__ === Object.prototype &&
      Object.keys(requestValue).length === 0)
  )
    return 'skip'
}
