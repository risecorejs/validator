const Validator = require('./Validator')

const request = {
  test: {
    login: 'amenov',
    test: 'test'
  }
}

const rules = {
  test: {
    login: [
      'required|string|validate:password,test',
      ({ request }) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log(request)

            console.log('custom rule for login')

            resolve()
          }, 1000)
        })
      }
    ],
    password: 'required|string',
    test: ['required|string']
  }
}

void (async () => {
  const validator = new Validator(request, rules)

  await validator.fails()

  if (validator.failed) {
    console.log(validator.errors)
  }
})()
