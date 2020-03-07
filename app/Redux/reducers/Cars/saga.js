import {call, put, all, takeLatest} from 'redux-saga/effects'

import {setBrandsList, setCarsList} from './actions'
import {setError, setLoading} from 'Redux/reducers/global/actions'

import Request from 'API'

import types from './constants'

function* fetchCarsList() {

  yield put(setLoading(true))

  const response = yield call(Request.carsList)
  if(response.status ){
    yield put(setCarsList(response.data))
  }

  yield put(setLoading(false))
}

function* fetchBrandsList() {
  yield put(setLoading(true))

  const response = yield call(Request.brandsList)
  if(response.status){
    yield put(setBrandsList(response.data))
  }

  yield put(setLoading(false))
}


export default function* carsSaga() {
  yield all([
    takeLatest(types.GET_CARS_lIST, fetchCarsList),
    takeLatest(types.GET_BRANDS_LIST, fetchBrandsList)
  ])
}
