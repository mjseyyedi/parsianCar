const withPrefix = action => `CARS/${action}`

export default {
  GET_CARS_lIST: withPrefix('REDUCER/GET_CARS_lIST'),
  SET_CARS_LIST: withPrefix('REDUCER/SET_CARS_LIST'),

  GET_BRANDS_LIST: withPrefix('REDUCER/GET_BRANDS_LIST'),
  SET_BRANDS_LIST: withPrefix('REDUCER/SET_BRANDS_LIST'),
}
