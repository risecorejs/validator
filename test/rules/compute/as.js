const equal = require('deep-equal')

module.exports = function () {
  return [
    {
      body: {
        test: 'test',
        test2: 'test'
      },
      rules: {
        test2: 'as:test'
      },
      test(errors) {
        return errors === null
      }
    },
    {
      body: [
        {
          test: 'test',
          test2: ''
        },
        {
          test: 'test'
        }
      ],
      rules: {
        test2: 'as:test'
      },
      test(errors) {
        return equal(errors, {
          test2: 'The value of the field "test2" does not match the value of the field "test"'
        })
      }
    }
  ]
}
