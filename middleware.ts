import express from 'express'

import { IOptions, IRules } from './interfaces'

import validator from './index'

/**
 * MIDDLEWARE
 * @param options {IOptions}
 * @return {express.Handler}
 */
export default function (options: IOptions): express.Handler {
  return function (req: express.Request, res: express.Response, next: express.NextFunction) {
    req.validator = (rules: IRules) => validator(req.body, rules, options)

    next()
  }
}
