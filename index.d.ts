import { IFields, IOptions, IRules } from './interfaces';
/**
 * VALIDATOR
 * @param body {IFields}
 * @param rules {IRules}
 * @param options {IOptions}
 * @return {Promise<null | IFields>}
 */
export default function (body: IFields, rules: IRules, options?: IOptions): Promise<null | IFields>;
