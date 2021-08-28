module.exports = (errorMessage) => ({
  emw1: (main = true) => {
    if (errorMessage.custom && main) {
      if (typeof errorMessage.custom === 'function') {
        errorMessage.custom = {
          main: errorMessage.custom
        }
      } else if (typeof errorMessage.custom === 'string') {
        const message = errorMessage.custom

        errorMessage.custom = {
          main: () => message
        }
      }
    }

    errorMessage = errorMessage.custom
      ? Object.assign(errorMessage.default, errorMessage.custom)
      : errorMessage.default

    if (typeof errorMessage.main === 'string') {
      const message = errorMessage.main

      errorMessage.main = () => message
    }

    return errorMessage
  },
  emw2: () => errorMessage.custom ?? errorMessage.default
})
