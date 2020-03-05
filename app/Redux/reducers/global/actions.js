import {makeActionCreator} from '../helpers'
import C from './constants'

export const setRouterMatch = makeActionCreator(
  C.SET_ROUTER_MATCH,
  'match',
)
export const setLoading = makeActionCreator(
  C.SET_LOADING,
  'data',
)
export const setError = makeActionCreator(
  C.SET_ERROR,
  'data',
)
export const verifyToken = makeActionCreator(
  C.VERIFY_TOKEN,
  'data',
)
export const setUserCredentials = makeActionCreator(
  C.SET_USER_CREDENTIAL,
  'data',
)
