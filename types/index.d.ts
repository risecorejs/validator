import { IRuleContext } from '../interfaces';
export declare type TRuleHandler = (ctx: IRuleContext) => Promise<any>;
export declare type TRuleNamesWithErrorMessage = 'find' | 'findRaw' | 'unique' | 'as' | 'between' | 'length' | 'max' | 'min' | 'only' | 'required' | 'date' | 'email' | 'tel' | 'array' | 'boolean' | 'number' | 'object' | 'string';
export declare type TRuleNames = 'allowEmpty' | 'allowFalse' | 'allowNull' | 'allowZero' | 'ifExists' | 'find' | 'findRaw' | 'unique' | 'as' | 'between' | 'if' | 'length' | 'max' | 'min' | 'only' | 'required' | 'validate' | 'date' | 'email' | 'tel' | 'array' | 'boolean' | 'number' | 'object' | 'string';
