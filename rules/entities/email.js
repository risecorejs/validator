module.exports = ({ value, errorMessage }) => {
  if (
    typeof value !== 'string' ||
    value.trim() === '' ||
    !value.match(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    )
  ) {
    return errorMessage
  }
}
