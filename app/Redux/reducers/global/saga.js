import {call, put, all, takeLatest} from 'redux-saga/effects'

import Request from 'API'
import types from './constants'
import {setUserCredentials} from './actions'

function* verifyCurrentToken(actions) {
  const token = actions.data ? actions.data.replace('JWT ', '') : null
  const response = yield call(Request.verifyToken, '', {token})
  if(!!response && !!response.token){
    yield put(setUserCredentials(true))
  }
  else {
    yield put(setUserCredentials(false))
  }
}

export default function* globalSaga() {
  yield all([
    takeLatest(types.VERIFY_TOKEN, verifyCurrentToken)
  ])
}
