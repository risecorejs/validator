const equal = require('deep-equal')

module.exports = function () {
  const rules = [
    { test: 'only:"test",123, null' },
    { test: [['only', '"test", 123,null']] },
    { test: [['only', ['test', 123, null]]] }
  ]

  return [
    {
      body: [{ test: 'test' }, { test: 123 }, { test: null }],
      rules,
      test(errors) {
        return errors === null
      }
    },
    {
      body: [{ test: '' }, { test: 0 }, { test: {} }],
      rules,
      test(errors) {
        return equal(errors, { test: 'Only allowed: "test", 123, null' })
      }
    }
  ]
}
