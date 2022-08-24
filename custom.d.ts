import { IRules } from './interfaces'

declare global {
  namespace Express {
    export interface Request {
      validator(rules: IRules): Promise<object | null>
    }
  }
}
