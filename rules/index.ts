import { IRuleHandler } from '../interfaces'

// BREAK
import allowEmpty from './break/allow-empty'
import allowFalse from './break/allow-false'
import allowNull from './break/allow-null'
import allowZero from './break/allow-zero'
import ifExists from './break/if-exists'

// COMPUTE
import find from './compute/async/find'
import findRaw from './compute/async/find-raw'
import unique from './compute/async/unique'
import as from './compute/as'
import between from './compute/between'
import _if from './compute/if'
import length from './compute/length'
import max from './compute/max'
import min from './compute/min'
import only from './compute/only'
import required from './compute/required'
import validate from './compute/validate'

// ENTITIES
import date from './entities/date'
import email from './entities/email'
import tel from './entities/tel'

// TYPES
import array from './types/array'
import boolean from './types/boolean'
import number from './types/number'
import object from './types/object'
import string from './types/string'

export default new Map<string, IRuleHandler>([
  // BREAK
  ['allowEmpty', allowEmpty],
  ['allowFalse', allowFalse],
  ['allowNull', allowNull],
  ['allowZero', allowZero],
  ['ifExists', ifExists],

  // COMPUTE
  ['find', find],
  ['findRaw', findRaw],
  ['unique', unique],
  ['as', as],
  ['between', between],
  ['if', _if],
  ['length', length],
  ['max', max],
  ['min', min],
  ['only', only],
  ['required', required],
  ['validate', validate],

  // ENTITIES
  ['date', date],
  ['email', email],
  ['tel', tel],

  // TYPES
  ['array', array],
  ['boolean', boolean],
  ['number', number],
  ['object', object],
  ['string', string]
])
