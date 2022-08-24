import validator from './index'

main().then((errors) => {
  console.log(errors)
})

function main() {
  return validator(
    {
      name: 'Abdulsalam',
      email: 'amenov.abdulsalam@gmail.com'
    },
    {
      name: 'required|string|max:200',
      email: 'required|email|max:200'
    }
  )
}
