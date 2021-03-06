import {call, put, all, takeLatest} from 'redux-saga/effects'

import {setBrandsList, setCarDetail, setCarsList, setCategoriesList} from './actions'
import {setError, setLoading} from 'Redux/reducers/global/actions'

import Request from 'API'

import types from './constants'

function* fetchCarsList() {

  yield put(setLoading(true))

  const response = yield call(Request.carsList)
  if (response.status) {
    yield put(setCarsList(response.data))
  } else {
    yield put(setError(response))
  }
  yield put(setLoading(false))
}

function* fetchBrandsList() {
  yield put(setLoading(true))

  const response = yield call(Request.brandsList)
  if (response.status) {
    yield put(setBrandsList(response.data))
  } else {
    yield put(setError(response))
  }
  yield put(setLoading(false))
}

function* searchCars(action) {
  yield put(setLoading(true))
  const params = {}

  Object
    .entries(action.data)
    .forEach(([key, value]) => {
      if (value && value !== 'null')
        params[key] = value
    })
  const response = yield call(Request.search, params)
  if (response.status) {
    yield put(setCarsList(response.data))
  } else {
    yield put(setError(response))
  }

  yield put(setLoading(false))
}

function* fetchCarDetail(action) {
  yield put(setLoading(true))
  const params = {variable: action.data}
  const response = yield call(Request.carDetail, params)
  if (response.status) {
    if (response.data.car_options) {

      response.data.car_options.push({
        name: 'insurance',
        price: 0,
        icon: null,
        fa_name: 'بیمه عادی',
        message_golden_insurance: null,
        message_insurance: null,
        key: 'simple-insurance',
      })

    }
    yield put(setCarDetail(response.data))
  } else {
    yield put(setError(response))
  }
  yield put(setLoading(false))
}

function* fetchCategoriesList(action) {
  yield put(setLoading(true))
  const response = yield call(Request.categoriesList)
  if (response.status) {
    yield put(setCategoriesList(response.data))
  } else {
    yield put(setError(response))
  }
  yield put(setLoading(false))
}


export default function* carsSaga() {
  yield all([
    takeLatest(types.GET_CARS_LIST, fetchCarsList),
    takeLatest(types.GET_BRANDS_LIST, fetchBrandsList),
    takeLatest(types.SEARCH_CARS, searchCars),
    takeLatest(types.GET_CAR_DETAIL, fetchCarDetail),
    takeLatest(types.GET_CATEGORIES_LIST, fetchCategoriesList),
  ])
}
