const equal = require('deep-equal')

module.exports = function () {
  const rules = {
    test: 'required'
  }

  return [
    {
      body: [
        //
        { test: 'a' },
        { test: 0 },
        { test: false },
        { test: [0] },
        { test: { key: 'value' } }
      ],
      rules,
      test(errors) {
        return errors === null
      }
    },
    {
      body: [
        //
        { test: '' },
        { test: ' ' },
        { test: null },
        { test: [] },
        { test: {} }
      ],
      rules,
      test(errors) {
        return equal(errors, { test: 'Required' })
      }
    }
  ]
}
