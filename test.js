const Validator = require('./Validator')

const request = {
  // name: 'amenov',
  // email: 'a.amenov@gmail.com',
  // password: 'asd123as',
  // passwordConfirm: 'asd123as',
  // test: [1, '2', 3]
}

const rules = {
  email: [() => console.log('email'), 'validate:password'],
  password: [() => console.log('password'), 'validate:email']
  // name: ['required', 'string', 'max:200'],
  // email: ['required|email', ['max', 200]],
  // password: 'required|string|min:8|max:200',
  // passwordConfirm: ['required|as:password', () => console.log('OK')],
  // test: 'array:string',
  // '$test:string': 'min:3'
}

const options = {
  // locale: 'ru',
  // errorMessages: {
  //   pinpoint: {
  //     name: {
  //       string: 'Имя должно быть строкой!'
  //     },
  //     test: {
  //       string: {
  //         min: (v) => 'эу минимум: ' + v
  //       }
  //     }
  //   },
  //   common: {
  //     string: 'Данное поле не может быть ничем другим, кроме строки!',
  //     min: {
  //       main: (v) => 'эу минимум: ' + v
  //     }
  //   }
  // }
}

void (async () => {
  const validator = new Validator(request, rules, options)

  await validator.fails()

  if (validator.failed) {
    console.log(JSON.stringify(validator.errors, null, 2))
  }
})()
