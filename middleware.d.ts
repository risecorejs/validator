import express from 'express';
import { IOptions, IRules } from './interfaces';
/**
 * MIDDLEWARE
 * @param options {IOptions}
 * @return {express.Handler}
 */
export default function (options: IOptions): express.Handler;
declare global {
    namespace Express {
        interface Request {
            validator(rules: IRules): Promise<object | null>;
        }
    }
}
