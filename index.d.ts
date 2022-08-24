import { IFields, IOptions, IRules } from './interfaces';
export = main;
/**
 * VALIDATOR
 * @param body {IFields}
 * @param rules {IRules}
 * @param options {IOptions}
 * @return {Promise<null | IFields>}
 */
declare function main(body: IFields, rules: IRules, options?: IOptions): Promise<null | IFields>;
