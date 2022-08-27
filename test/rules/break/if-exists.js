const equal = require('deep-equal')

module.exports = function () {
  return [
    {
      body: {},
      rules: {
        test: ['ifExists', () => 'failed']
      },
      test(errors) {
        return errors === null
      }
    },
    {
      body: { test: null },
      rules: {
        test: ['ifExists', () => 'success']
      },
      test(errors) {
        return equal(errors, { test: 'success' })
      }
    }
  ]
}
