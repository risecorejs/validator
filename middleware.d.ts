import express from 'express';
import { IOptions } from './interfaces';
export = main;
/**
 * MAIN
 * @param options {IOptions}
 * @return {express.Handler}
 */
declare function main(options: IOptions): express.Handler;
