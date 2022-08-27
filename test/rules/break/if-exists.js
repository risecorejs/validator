const equal = require('deep-equal')

module.exports = function () {
  return [
    {
      body: {},
      rules: [
        { test: ['ifExists', () => 'failed'] },
        { test: ['ifExists:test2', () => 'failed'] },
        { test: [['ifExists', 'test2'], () => 'failed'] }
      ],
      test(errors) {
        return errors === null
      }
    },
    {
      body: {
        test: null,
        test2: null
      },
      rules: [
        { test: ['ifExists', () => 'success'] },
        { test: ['ifExists:test2', () => 'success'] },
        { test: [['ifExists', 'test2'], () => 'success'] }
      ],
      test(errors) {
        return equal(errors, { test: 'success' })
      }
    }
  ]
}
