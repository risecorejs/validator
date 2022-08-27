const equal = require('deep-equal')

module.exports = function () {
  return [
    {
      body: [
        {
          test: '123'
        },
        {
          test: [1, 2, 3]
        }
      ],
      rules: {
        test: 'length:3'
      },
      test(errors) {
        return errors === null
      }
    },
    {
      body: [
        {
          test: ''
        },
        {
          test: []
        }
      ],
      rules: {
        test: 'length:3'
      },
      test(errors) {
        return equal(errors, { test: 'The length should be: 3' })
      }
    }
  ]
}
