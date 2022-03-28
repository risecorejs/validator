module.exports = {
  // COMPUTE
  find: (table) => `Not found in the table "${table}"`,
  findRaw: 'Not found',
  unique: 'The value for this field must be unique',
  as: (field, targetKey) => `The value of the field "${field}" does not match the value of the field "${targetKey}"`,
  between: {
    typeError: 'Type can only be string, number, array',
    max: (num) => `Maximum: ${num}`,
    min: (num) => `Minimum: ${num}`
  },
  length: (num) => `The length should be: ${num}`,
  max: {
    typeError: 'Type can only be string, number, array',
    main: (num) => `Maximum: ${num}`
  },
  min: {
    typeError: 'Type can only be string, number, array',
    main: (num) => `Minimum: ${num}`
  },
  only: (values) => `Only allowed: ${values.join(', ')}`,
  required: 'Required',

  // ENTITIES
  date: 'Invalid date',
  email: 'Invalid email',
  tel: {
    typeError: 'This field must be a "string"',
    main: 'Invalid phone number',
    countryCode: 'Invalid country code'
  },

  // TYPES
  array: {
    main: 'This field must be a "array"',
    typeNotSupported: 'The type you specified was not found in the list of available types.',
    expectedType: (type) => `Array element must be of type "${type}"`
  },
  boolean: 'This field must be a "boolean"',
  number: 'This field must be a "number"',
  object: 'This field must be a "object"',
  string: 'This field must be a "string"'
}
