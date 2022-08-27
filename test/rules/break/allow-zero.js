const equal = require('deep-equal')

module.exports = function () {
  return [
    {
      body: { test: 0 },
      rules: {
        test: ['allowZero', () => 'failed']
      },
      test(errors) {
        return errors === null
      }
    },
    {
      body: { test: null },
      rules: {
        test: ['allowZero', () => 'success']
      },
      test(errors) {
        return equal(errors, { test: 'success' })
      }
    }
  ]
}
