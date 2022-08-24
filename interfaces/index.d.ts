import sequelize from 'sequelize';
import { TRuleNamesWithErrorMessage } from '../types';
export interface IOptions {
    locale?: 'ru' | 'en';
    sequelize?: sequelize.Sequelize | null;
}
export interface IFields {
    [id: string]: any;
}
export interface IFormattedRuleRow {
    field: string;
    rules: (TRuleNamesWithErrorMessage | ((ctx: IRuleContext) => any) | {
        name: TRuleNamesWithErrorMessage;
        argument: string;
    })[];
}
export interface IRuleContext {
    body: IFields;
    rules: IRules;
    field: string;
    value: any;
    options: IOptions;
    errorMessage?: any;
    argument?: any;
}
export interface IRules {
    [key: string]: string | ((ctx: IRuleContext) => any) | (string | [string, any] | ((ctx: IRuleContext) => any))[] | IRules;
}
export interface IErrorMessageBetween {
    typeError: string;
    max: (num: number) => string;
    min: (num: number) => string;
}
export interface IErrorMessageMax {
    typeError: string;
    main: (num: number) => string;
}
export interface IErrorMessageMin {
    typeError: string;
    main: (num: number) => string;
}
export interface IErrorMessageTel {
    typeError: string;
    main: string;
    countryCode: string;
}
export interface IErrorMessageArray {
    main: string;
    typeNotSupported: string;
    expectedType: (type: string) => string;
}
export interface IErrorMessages {
    find: (table: string) => string;
    findRaw: string;
    unique: string;
    as: (field: string, targetKey: string) => string;
    between: IErrorMessageBetween;
    length: (num: number) => string;
    max: IErrorMessageMax;
    min: IErrorMessageMin;
    only: (values: string[]) => string;
    required: string;
    date: string;
    email: string;
    tel: IErrorMessageTel;
    array: IErrorMessageArray;
    boolean: string;
    number: string;
    object: string;
    string: string;
}