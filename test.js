const validator = require('./index')

const body = {
  username: 'amenov',
  email: 'amenov.abdulsalam@gmail.com',
  tel: '+77776665544',
  password: '123456789',
  passwordConfirm: '123456789',
  birthday: 1998,
  role: 'admin',
  companyIds: [1, 2, 3],
  addresses: [
    {
      country: 'Kazakhstan',
      city: 'Almaty'
    },
    {
      country: 'Russia',
      city: 'Moscow',
      info: {
        postcode: '100000',
        street: 'Lenina'
      }
    }
  ],
  family: {
    mom: 'Alena',
    dad: 'Ravil'
  }
}

const customRule = ({ value, body }) => {
  if (value.includes(body.username)) {
    return 'password_cannot_contain_username'
  }
}

const roles = ['admin', 'manager']

const rules = {
  username: 'required|string|max:200',
  email: ['required|string', ['max', 200]],
  tel: 'required|tel', // tel:[countryCode]
  password: ['required|string|min:6|max:200|validate:username', customRule],
  passwordConfirm: 'required|as:password',
  birthday: `required|number|between:1900-${new Date().getFullYear()}`,
  role: ['required|string', ['only', roles]],
  companyIds: 'ifExists|array:number',
  addresses: 'required|array:object',
  $addresses: {
    country: 'required|string',
    city: 'required|string',
    info: 'ifExists|object',
    $info: {
      postcode: 'required|string',
      street: 'required|string'
    }
  },
  family: {
    mom: 'required|string|max:200',
    dad: 'required|string|max:200'
  }
}

const options = {
  locale: 'en'
}

void (async () => {
  const errors = await validator(body, rules, options)

  console.log(errors)
})()
