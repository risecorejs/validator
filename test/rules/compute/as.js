const equal = require('deep-equal')

module.exports = function () {
  const rules = [
    //
    { test2: 'as:test' },
    { test2: [['as', 'test']] }
  ]

  return [
    {
      body: {
        test: 'test',
        test2: 'test'
      },
      rules,
      test(errors) {
        return errors === null
      }
    },
    {
      body: {
        test: 'test',
        test2: ''
      },
      rules,
      test(errors) {
        return equal(errors, {
          test2: 'The value of the field "test2" does not match the value of the field "test"'
        })
      }
    }
  ]
}
