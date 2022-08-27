const equal = require('deep-equal')

module.exports = function () {
  return [
    {
      body: {
        '>=': {
          number: 3,
          string: '123'
        },
        '>': {
          number: 3,
          string: '123'
        },
        '<=': {
          number: 3,
          string: '123'
        },
        '<': {
          number: 3,
          string: '123'
        },
        '!==': {
          number: 3,
          string: '123'
        },
        '!=': {
          number: 3,
          string: '123'
        },
        '===': {
          number: 3,
          string: '123'
        },
        '==': {
          number: 3,
          string: '123'
        }
      },
      rules: {
        '>=': {
          number: ['if:number>=3', () => 'success'],
          string: ['if:string>="123"', () => 'success']
        },
        '>': {
          number: ['if:number>3', () => 'failed'],
          string: ['if:string>"123"', () => 'failed']
        },
        '<=': {
          number: ['if:number<=3', () => 'success'],
          string: ['if:string<="123"', () => 'success']
        },
        '<': {
          number: ['if:number<3', () => 'failed'],
          string: ['if:string<"123"', () => 'failed']
        },
        '!==': {
          number: ['if:number!==3', () => 'failed'],
          string: ['if:string!=="123"', () => 'failed']
        },
        '!=': {
          number: ['if:number!=3', () => 'failed'],
          string: ['if:string!="123"', () => 'failed']
        },
        '===': {
          number: ['if:number===3', () => 'success'],
          string: ['if:string==="123"', () => 'success']
        },
        '==': {
          number: ['if:number==3', () => 'success'],
          string: ['if:string=="123"', () => 'success']
        }
      },
      test(errors) {
        return equal(errors, {
          '>=': { number: 'success', string: 'success' },
          '<=': { number: 'success', string: 'success' },
          '===': { number: 'success', string: 'success' },
          '==': { number: 'success', string: 'success' }
        })
      }
    }
  ]
}
