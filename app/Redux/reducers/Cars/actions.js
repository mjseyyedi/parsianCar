import {makeActionCreator} from '../helpers'
import C from './constants'

export const getCarsList = makeActionCreator(
  C.GET_CARS_lIST,
  'data',
)
export const setCarsList = makeActionCreator(
  C.SET_CARS_LIST,
  'result',
)
export const getBrandsList = makeActionCreator(
  C.GET_BRANDS_LIST,
  'data',
)
export const setBrandsList = makeActionCreator(
  C.SET_BRANDS_LIST,
  'result',
)
