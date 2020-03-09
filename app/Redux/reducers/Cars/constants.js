const withPrefix = action => `CARS/${action}`

export default {
  GET_CARS_LIST: withPrefix('REDUCER/GET_CARS_LIST'),
  SET_CARS_LIST: withPrefix('REDUCER/SET_CARS_LIST'),

  GET_BRANDS_LIST: withPrefix('REDUCER/GET_BRANDS_LIST'),
  SET_BRANDS_LIST: withPrefix('REDUCER/SET_BRANDS_LIST'),

  SEARCH_CARS: withPrefix('REDUCER/SEARCH_CARS'),

  GET_CAR_DETAIL: withPrefix('REDUCER/GET_CAR_DETAIL'),
  SET_CAR_DETAIL: withPrefix('REDUCER/SET_CAR_DETAIL'),
}
