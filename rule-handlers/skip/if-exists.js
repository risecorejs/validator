module.exports = ({ request, ruleArg: requestKey, requestValue }) => {
  if (
    (requestKey && request[requestKey] === void 0) ||
    (!requestKey && requestValue === void 0)
  )
    return 'skip'
}
