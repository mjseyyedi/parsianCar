import {makeActionCreator} from '../helpers'
import C from './constants'

export const getUserInfo = makeActionCreator(
  C.GET_USER_INFO,
)
export const setUserInfo = makeActionCreator(
  C.SET_USER_INFO,
  'result',
)
export const updateProfile = makeActionCreator(
  C.UPDATE_PROFILE,
  'data',
)
export const updateProfileSuccess = makeActionCreator(
  C.UPDATE_PROFILE_SUCCESS,
  'result',
)
