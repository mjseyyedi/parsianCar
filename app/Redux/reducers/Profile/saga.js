import {call, put, all, takeLatest} from 'redux-saga/effects'
import Request from 'API'
import types from './constants'

import {
  getUserFactors,
  setDocumentCategories, setUploadedDocs,
  setUserFactors,
  setUserInfo,
  updateProfileSuccess,
  uploadDocumentSuccess,
} from './actions'
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
function* fetchUserFactors(actions) {
  yield put(setLoading(true))
  const response = yield call(Request.fetchUserFactors)

  if (response.status) {
    yield put(setUserFactors(response.data))
  } else {
    yield put(setError(response))
  }
  yield put(setLoading(false))
}
function* fetchDocumentsCategories(actions) {
  yield put(setLoading(true))
  const response = yield call(Request.fetchDocumentsCategories)

  if (response.status) {
    yield put(setDocumentCategories(response.data))
  } else {
    yield put(setError(response))
  }
  yield put(setLoading(false))
}

function* uploadFiles(actions) {
  yield put(setLoading(true))
  const response = yield call(Request.AddUserDocRequest, '', actions.data)
  if (response.status) {
    yield put(uploadDocumentSuccess(response.data))
  } else {
    yield put(setError(response))
  }
  yield put(setLoading(false))
}

function* fetchUploadedDocs(actions) {
  yield put(setLoading(true))
  const response = yield call(Request.RetrieveUerDocsRequest)
  if (response.status) {
    yield put(setUploadedDocs(response.data))
  } else {
    yield put(setError(response))
  }
  yield put(setLoading(false))
}

export default function* globalSaga() {
  yield all([
    takeLatest(types.GET_USER_INFO, fetchUserInfo),
    takeLatest(types.UPDATE_PROFILE, updateUserProfile),
    takeLatest(types.GET_USER_FACTORS, fetchUserFactors),
    takeLatest(types.GET_DOCUMENT_CATEGORIES, fetchDocumentsCategories),
    takeLatest(types.UPLOAD_DOCUMENT, uploadFiles),
    takeLatest(types.GET_UPLOADED_DOCS, fetchUploadedDocs),
  ])
}
