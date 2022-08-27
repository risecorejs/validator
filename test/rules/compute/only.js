const equal = require('deep-equal')

module.exports = function () {
  return [
    {
      body: {
        test: 'test',
        test2: 123,
        test3: null
      },
      rules: {
        test: 'only:"test",123, null',
        test2: [['only', '"test", 123,null']],
        test3: [['only', ['test', 123, null]]]
      },
      test(errors) {
        return errors === null
      }
    },
    {
      body: {
        test: '',
        test2: 0,
        test3: {}
      },
      rules: {
        test: 'only:"test",123, null',
        test2: [['only', '"test", 123,null']],
        test3: [['only', ['test', 123, null]]]
      },
      test(errors) {
        return equal(errors, {
          test: 'Only allowed: "test", 123, null',
          test2: 'Only allowed: "test", 123, null',
          test3: 'Only allowed: "test", 123, null'
        })
      }
    }
  ]
}
