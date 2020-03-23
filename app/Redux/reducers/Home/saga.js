import {call, put, all, takeLatest} from 'redux-saga/effects'

import {setHomeData} from './actions'
import {setError, setLoading} from 'Redux/reducers/global/actions'

import Request from 'API'

import types from './constants'

function* fetchFrontContent() {
  yield put(setLoading(true))
  const response = yield call(Request.frontContent)

  if (response && response.length > 0){
    yield put(setHomeData(response))
  }
  else yield put(setError(response.error))
  yield put(setLoading(false))
}


export default function* globalSaga() {
  yield all([
    takeLatest(types.FETCH_FRONT_CONTENT, fetchFrontContent)
  ])
}
