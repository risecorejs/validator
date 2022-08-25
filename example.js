const validator = require('./index').default

const body = {
  name: 'Abdulsalam',
  email: 'amenov.abdulsalam@gmail.com'
}

const rules = {
  name: 'required|string',
  email: 'required|email'
}

validator(body, rules).then((errors) => console.log(errors))
