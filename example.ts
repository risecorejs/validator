import validator from './index'

validator(
  {
    name: 'Abdulsalam',
    email: 'amenov.abdulsalam@gmail.com'
  },
  {
    name: 'required|string|max:200',
    email: 'required|email|max:200'
  }
).then((errors) => {
  console.log(errors)
})
