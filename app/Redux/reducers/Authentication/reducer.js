import C from './constants'
import {combineReducers} from 'redux'
import initialState from './state'

const OTPCode = (state = initialState.OTPCode, action) =>{
  switch (action.type) {
    case C.SET_OTP:
      return action.data
    case C.REQUEST_LOGIN:
      return null
    default:
      return state
  }
}

const sendOtpResult = (state = initialState.sendOtpResult, action) =>
  action.type === C.REQUEST_LOGIN_SUCCESS ? action.result : state

const registerResult = (state = initialState.registerResult, action) =>
  action.type === C.CONFIRM_OTP_SUCCESS ? action.result : state

const loginNumber = (state = initialState.loginNumber, action) =>{
    switch (action.type) {
      case C.REQUEST_LOGIN:
        return null
      case C.SET_LOGIN_NUMBER:
        return action.data
      default:
        return state
    }
}

export default combineReducers({
  sendOtpResult,
  registerResult,
  OTPCode,
  loginNumber
})
