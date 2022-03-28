module.exports = ({ value }) => {
  if (value?.length === 0 || (value?.constructor === Object && Object.keys(value).length === 0)) {
    return 'break'
  }
}
