module.exports = ({ argument, value, errorMessage }) => {
  const values = Array.isArray(argument) ? argument : argument.split(',').map((value) => eval(value))

  if (!values.includes(value)) {
    return errorMessage(values)
  }
}
