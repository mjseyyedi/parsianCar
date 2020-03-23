import {makeActionCreator} from '../helpers'
import C from './constants'

export const getCarsList = makeActionCreator(
  C.GET_CARS_LIST,
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
export const searchCars = makeActionCreator(
  C.SEARCH_CARS,
  'data',
)
export const getCarDetail = makeActionCreator(
  C.GET_CAR_DETAIL,
  'data',
)
export const setCarDetail = makeActionCreator(
  C.SET_CAR_DETAIL,
  'result',
)
export const getCategoriesList = makeActionCreator(
  C.GET_CATEGORIES_LIST,
  'data',
)
export const setCategoriesList = makeActionCreator(
  C.SET_CATEGORIES_LIST,
  'result',
)
