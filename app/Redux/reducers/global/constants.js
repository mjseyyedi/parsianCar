const withPrefix = action => `GLOBAL/${action}`

export default {
  SET_ROUTER_MATCH: withPrefix('REDUCER/SET_ROUTER_MATCH'),

  SET_LOADING: withPrefix('REDUCER/SET_LOADING'),
  SET_ERROR: withPrefix('REDUCER/SET_ERROR'),

  VERIFY_TOKEN: withPrefix('REDUCER/VERIFY_TOKEN'),

  SET_USER_CREDENTIAL: withPrefix('REDUCER/SET_USER_CREDENTIAL'),
}
