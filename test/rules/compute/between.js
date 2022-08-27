const equal = require('deep-equal')

module.exports = function () {
  return [
    {
      body: [{ test: '123' }, { test: 3 }, { test: [1, 2, 3] }],
      rules: {
        test: 'between:1-3'
      },
      test(errors) {
        return errors === null
      }
    },
    {
      body: [
        { test: null },
        { test: '' },
        { test: 0 },
        { test: [] },
        { test: '1234' },
        { test: 4 },
        { test: [1, 2, 3, 4] }
      ],
      rules: {
        test: 'between:1-3'
      },
      test(errors) {
        return (
          equal(errors, {
            test: 'Type can only be string, number, array'
          }) ||
          equal(errors, {
            test: 'Minimum: 1'
          }) ||
          equal(errors, {
            test: 'Maximum: 3'
          })
        )
      }
    }
  ]
}
