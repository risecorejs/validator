const equal = require('deep-equal')

module.exports = function () {
  return [
    {
      body: [{ test: '' }, { test: [] }, { test: {} }],
      rules: {
        test: 'allowEmpty'
      },
      test(errors) {
        return errors === null
      }
    },
    {
      body: { test: null },
      rules: {
        test: ['allowEmpty', () => 'success']
      },
      test(errors) {
        return equal(errors, { test: 'success' })
      }
    }
  ]
}
