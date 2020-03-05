import {makeActionCreator} from '../helpers'
import C from './constants'

export const login = makeActionCreator(
  C.REQUEST_LOGIN,
  'data',
)
export const loginSuccess = makeActionCreator(
  C.REQUEST_LOGIN_SUCCESS,
  'result',
)

export const setOTP = makeActionCreator(
  C.SET_OTP,
  'data',
)

export const register = makeActionCreator(
  C.CONFIRM_OTP,
  'data',
)

export const confirmOTPSuccess = makeActionCreator(
  C.CONFIRM_OTP,
  'result',
)
export const setLoginInfo = makeActionCreator(
  C.SET_LOGIN_INFO,
  'result',
)
export const setLoginNumber = makeActionCreator(
  C.SET_LOGIN_NUMBER,
  'data',
)
export const requestLoginWithPassword = makeActionCreator(
  C.REQUEST_LOGIN_WITH_PASSWORD,
  'data',
)
