const equal = require('deep-equal')

module.exports = function () {
  const rules = {
    withoutCondition: {
      test: 'required'
    },
    withCondition: [
      {
        '>=': {
          number: ['required:_string>="123"'],
          string: ['required:_number>=3']
        },
        '>': {
          number: ['required:_string>"122"'],
          string: ['required:_number>2']
        },
        '<=': {
          number: ['required:_string<="123"'],
          string: ['required:_number<=3']
        },
        '<': {
          number: ['required:_string<"124"'],
          string: ['required:_number<4']
        },
        '!==': {
          number: ['required:_string!=="122"'],
          string: ['required:_number!==2']
        },
        '!=': {
          number: ['required:_string!="122"'],
          string: ['required:_number!=2']
        },
        '===': {
          number: ['required:_string==="123"'],
          string: ['required:_number===3']
        },
        '==': {
          number: ['required:_string=="123"'],
          string: ['required:_number==3']
        }
      },
      {
        '>=': {
          number: [['required', '_string>="123"']],
          string: [['required', '_number>=3']]
        },
        '>': {
          number: [['required', '_string>"122"']],
          string: [['required', '_number>2']]
        },
        '<=': {
          number: [['required', '_string<="123"']],
          string: [['required', '_number<=3']]
        },
        '<': {
          number: [['required', '_string<"124"']],
          string: [['required', '_number<4']]
        },
        '!==': {
          number: [['required', '_string!=="122"']],
          string: [['required', '_number!==2']]
        },
        '!=': {
          number: [['required', '_string!="122"']],
          string: [['required', '_number!=2']]
        },
        '===': {
          number: [['required', '_string==="123"']],
          string: [['required', '_number===3']]
        },
        '==': {
          number: [['required', '_string=="123"']],
          string: [['required', '_number==3']]
        }
      }
    ]
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
      rules: rules.withoutCondition,
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
      rules: rules.withoutCondition,
      test(errors) {
        return equal(errors, { test: 'Required' })
      }
    },
    {
      body: {
        '>=': {
          number: 3,
          string: '123',
          _number: 3,
          _string: '123'
        },
        '>': {
          number: 3,
          string: '123',
          _number: 3,
          _string: '123'
        },
        '<=': {
          number: 3,
          string: '123',
          _number: 3,
          _string: '123'
        },
        '<': {
          number: 3,
          string: '123',
          _number: 3,
          _string: '123'
        },
        '!==': {
          number: 3,
          string: '123',
          _number: 3,
          _string: '123'
        },
        '!=': {
          number: 3,
          string: '123',
          _number: 3,
          _string: '123'
        },
        '===': {
          number: 3,
          string: '123',
          _number: 3,
          _string: '123'
        },
        '==': {
          number: 3,
          string: '123',
          _number: 3,
          _string: '123'
        }
      },
      rules: rules.withCondition,
      test(errors) {
        return errors === null
      }
    },
    {
      body: {
        '>=': {
          number: null,
          string: '',
          _number: 3,
          _string: '123'
        },
        '>': {
          number: null,
          string: '',
          _number: 3,
          _string: '123'
        },
        '<=': {
          number: null,
          string: '',
          _number: 3,
          _string: '123'
        },
        '<': {
          number: null,
          string: '',
          _number: 3,
          _string: '123'
        },
        '!==': {
          number: null,
          string: '',
          _number: 3,
          _string: '123'
        },
        '!=': {
          number: null,
          string: '',
          _number: 3,
          _string: '123'
        },
        '===': {
          number: null,
          string: '',
          _number: 3,
          _string: '123'
        },
        '==': {
          number: null,
          string: '',
          _number: 3,
          _string: '123'
        }
      },
      rules: rules.withCondition,
      test(errors) {
        return equal(errors, {
          '>=': { number: 'Required', string: 'Required' },
          '>': { number: 'Required', string: 'Required' },
          '<=': { number: 'Required', string: 'Required' },
          '<': { number: 'Required', string: 'Required' },
          '!==': { number: 'Required', string: 'Required' },
          '!=': { number: 'Required', string: 'Required' },
          '===': { number: 'Required', string: 'Required' },
          '==': { number: 'Required', string: 'Required' }
        })
      }
    }
  ]
}
