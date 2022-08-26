import express from 'express';
import { IOptions } from './interfaces';
/**
 * MIDDLEWARE
 * @param options {IOptions}
 * @return {express.Handler}
 */
export default function (options: IOptions): express.Handler;
