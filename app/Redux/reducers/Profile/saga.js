import {call, put, all, takeLatest} from 'redux-saga/effects'
import Request from 'API'
import types from './constants'

import {setUserInfo, updateProfileSuccess} from './actions'
import {setError, setLoading} from 'Redux/reducers/global/actions'

function* fetchUserInfo(actions) {
  yield put(setLoading(true))
  const response = yield call(Request.userInfo)
  if (!!response && response.status) {
    yield put(setUserInfo(response.data))
  } else {
    yield put(setError(response.error))
  }
  yield put(setLoading(false))
}

function* updateUserProfile(actions) {
  yield put(setLoading(true))
  const {data} = actions
  const response = yield call(Request.updateUserInfo, '', {data})
  if (response.status) {
    yield put(updateProfileSuccess(response.message))
  } else {
    yield put(setError(response))
  }
  yield put(setLoading(false))
}

export default function* globalSaga() {
  yield all([
    takeLatest(types.GET_USER_INFO, fetchUserInfo),
    takeLatest(types.UPDATE_PROFILE, updateUserProfile),
  ])
}
