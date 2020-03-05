const withPrefix = action => `GLOBAL/${action}`

export default {
  FETCH_FRONT_CONTENT: withPrefix('REDUCER/FETCH_FRONT_CONTENT'),
}
