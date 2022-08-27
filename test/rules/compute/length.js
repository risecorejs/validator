const equal = require('deep-equal')

module.exports = function () {
  const rules = [
    //
    { test: 'length:3' },
    { test: [['length', 3]] }
  ]

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
      rules,
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
      rules,
      test(errors) {
        return equal(errors, { test: 'The length should be: 3' })
      }
    }
  ]
}
