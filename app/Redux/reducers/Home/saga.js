import {call, select, all, takeLatest} from 'redux-saga/effects'

import Request from 'API'

import types from './constants'

function* fetchFrontContent(actions) {
  const response = yield call(Request.frontContent)
  console.log('****************', actions, response)

}


export default function* globalSaga() {
  yield all([
    takeLatest(types.FETCH_FRONT_CONTENT, fetchFrontContent)
  ])
}
