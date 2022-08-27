const equal = require('deep-equal')

module.exports = function () {
  return [
    {
      body: { test: null },
      rules: {
        test: 'allowNull'
      },
      test(errors) {
        return errors === null
      }
    },
    {
      body: { test: {} },
      rules: {
        test: ['allowNull', () => 'success']
      },
      test(errors) {
        return equal(errors, { test: 'success' })
      }
    }
  ]
}
