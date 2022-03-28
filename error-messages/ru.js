module.exports = {
  // COMPUTE
  find: (table) => `Не найдено в таблице "${table}"`,
  findRaw: 'Не найдено',
  unique: 'Значение этого поля должно быть уникальным',
  as: (field, targetKey) => `Значение поля "${field}" не соответствует значению поля "${targetKey}"`,
  between: {
    typeError: 'Тип может быть только: string, number, array',
    max: (num) => `Максимум: ${num}`,
    min: (num) => `Минимум: ${num}`
  },
  length: (num) => `Длина должна быть: ${num}`,
  max: {
    typeError: 'Тип может быть только: string, number, array',
    main: (num) => `Максимум: ${num}`
  },
  min: {
    typeError: 'Тип может быть только: string, number, array',
    main: (num) => `Минимум: ${num}`
  },
  only: (values) => `Разрешено только: ${values.join(', ')}`,
  required: 'Обязательно',

  // ENTITIES
  date: 'Неверная дата',
  email: 'Неверный email',
  tel: {
    typeError: 'Тип может быть только "string"',
    main: 'Неверный номер телефона',
    countryCode: 'Неверный код страны'
  },

  // TYPES
  array: {
    main: 'Тип может быть только "array"',
    typeNotSupported: 'Указанный вами тип не найден в списке доступных типов',
    expectedType: (type) => `Элемент массива должен иметь тип "${type}"`
  },
  boolean: 'Это поле должно быть "boolean"',
  number: 'Это поле должно быть "number"',
  object: 'Это поле должно быть "object"',
  string: 'Это поле должно быть "string"'
}
