const equal = require('deep-equal')

module.exports = function () {
  return [
    {
      body: { test: false },
      rules: {
        test: 'allowFalse'
      },
      test(errors) {
        return errors === null
      }
    },
    {
      body: { test: null },
      rules: {
        test: ['allowFalse', () => 'success']
      },
      test(errors) {
        return equal(errors, { test: 'success' })
      }
    }
  ]
}
