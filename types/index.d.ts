import { IFields } from '../interfaces';
export declare type TDialects = 'mysql' | 'postgres';
export declare type TRuleHandler = string | void | Promise<string | void> | Promise<string | IFields | void>;
export declare type TRuleNames = 'allowEmpty' | 'allowFalse' | 'allowNull' | 'allowZero' | 'ifExists' | 'find' | 'findRaw' | 'unique' | 'as' | 'between' | 'if' | 'length' | 'max' | 'min' | 'only' | 'required' | 'validate' | 'date' | 'email' | 'tel' | 'array' | 'boolean' | 'number' | 'object' | 'string';
