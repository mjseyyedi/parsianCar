const withPrefix = action => `GLOBAL/${action}`

export default {
  FETCH_FRONT_CONTENT: withPrefix('REDUCER/FETCH_FRONT_CONTENT'),
  SET_HOME_DATA: withPrefix('REDUCER/SET_HOME_DATA'),
}
