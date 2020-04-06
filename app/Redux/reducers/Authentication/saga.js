import {call, select, all, takeLatest, put} from 'redux-saga/effects'
import Cookies from 'js-cookie'

import Request from 'API'

import {setLoginInfo, loginSuccess, setLoginNumber} from './actions'
import {setLoading, setError} from 'Redux/reducers/global/actions'

import {selectOTPCode} from './selectors'

import types from './constants'



function* login(actions) {
  yield put(setLoading(true))
  const { data } = actions
  const response = yield call(Request.preRegister, '', {data})

  if(response.status){
    yield put(loginSuccess({...response, ...data}))
  }
  else {
    yield put(setLoginNumber(data.phone))
    // yield put(setError(response))
  }

  yield put(setLoading(false))
}

function* confirmOTP(actions) {
  yield put(setLoading(true))
  const { data } = actions
  const OTPCode = yield select(selectOTPCode())
  const [phone, code] = Object.entries(OTPCode)[0]
  const response = yield call(Request.register, '', {data: {...data, phone, code}})

  if(response.status){
    yield put(setLoginInfo(response))
  }
  else {
    yield put(setError(response))
  }

  yield put(setLoading(false))
}

function* requestLoginByPassword(actions) {
  yield put(setLoading(true))
  const { data } = actions

  const response = yield call(Request.login, '', data)
  if(response.status){
    yield put(setLoginInfo({Token: response.Token}))
  }
  else {
    yield put(setError({message: response.message || 'خطا در ورود'}))
  }

  yield put(setLoading(false))
}

function* handleLogin(actions) {
    if(actions.result && actions.result.Token){
      Cookies.set('Authorization', `JWT ${actions.result.Token}`)
      if(window.location.search && window.location.search.includes('referrer')){
        const queryParam = window.location.search.replace('?' , '');
        const params = queryParam.split('=');
        const index = params.indexOf('referrer');
        if(index !== -1){
          const url = params[index + 1];
          window.location.href = '/'+url;
        }
      }
    else{
        window.location.href = '/'
      }
      // Cookies.set('Authorization', `JWT ${actions.result.Token}`)
    }
}

export default function* AuthenticationSaga() {
  yield all([
    takeLatest(types.REQUEST_LOGIN, login),
    takeLatest(types.CONFIRM_OTP, confirmOTP),
    takeLatest(types.SET_LOGIN_INFO, handleLogin),
    takeLatest(types.REQUEST_LOGIN_WITH_PASSWORD, requestLoginByPassword),
  ])
}
