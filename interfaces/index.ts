import sequelize from 'sequelize'

import { TRuleNames } from '../types'

export interface IOptions {
  locale?: 'ru' | 'en'
  sequelize?: sequelize.Sequelize | null
}

export interface IFields {
  [id: string]: any
}

export interface IFormattedRuleRow {
  field: string
  rules: (TRuleNames | ((ctx: IRuleContext) => any) | { name: TRuleNames; argument: string })[]
}

export interface IRuleContext {
  body: IFields
  rules: IRules
  field: string
  value: any
  options: IOptions
  errorMessage?: any
  argument?: any
}

export interface IRules {
  [key: string]:
    | string
    | ((ctx: IRuleContext) => any)
    | (string | [string, any] | ((ctx: IRuleContext) => any))[]
    | IRules
}

export interface IErrorMessageBetween {
  typeError: string
  max: (num: number) => string
  min: (num: number) => string
}

export interface IErrorMessageMax {
  typeError: string
  main: (num: number) => string
}

export interface IErrorMessageMin {
  typeError: string
  main: (num: number) => string
}

export interface IErrorMessageTel {
  typeError: string
  main: string
  countryCode: string
}

export interface IErrorMessageArray {
  main: string
  typeNotSupported: string
  expectedType: (type: string) => string
}

export interface IErrorMessages {
  // COMPUTE
  find: (table: string) => string
  findRaw: string
  unique: string
  as: (field: string, targetKey: string) => string
  between: IErrorMessageBetween
  length: (num: number) => string
  max: IErrorMessageMax
  min: IErrorMessageMin
  only: (values: string[]) => string
  required: string

  // ENTITIES
  date: string
  email: string
  tel: IErrorMessageTel

  // TYPES
  array: IErrorMessageArray
  boolean: string
  number: string
  object: string
  string: string
}
