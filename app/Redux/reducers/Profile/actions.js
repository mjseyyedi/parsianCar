import {makeActionCreator} from '../helpers'
import C from './constants'

export const getUserInfo = makeActionCreator(
  C.GET_USER_INFO,
)
export const setUserInfo = makeActionCreator(
  C.SET_USER_INFO,
  'result',
)
export const updateProfile = makeActionCreator(
  C.UPDATE_PROFILE,
  'data',
)
export const updateProfileSuccess = makeActionCreator(
  C.UPDATE_PROFILE_SUCCESS,
  'result',
)
export const getUserFactors = makeActionCreator(
  C.GET_USER_FACTORS,
  'data',
)
export const setUserFactors = makeActionCreator(
  C.GET_USER_FACTORS_SUCCESS,
  'result',
)
export const getDocumentCategories = makeActionCreator(
  C.GET_DOCUMENT_CATEGORIES,
  'data',
)
export const setDocumentCategories = makeActionCreator(
  C.SET_DOCUMENT_CATEGORIES,
  'result',
)
export const uploadDocument = makeActionCreator(
  C.UPLOAD_DOCUMENT,
  'data',
)
export const uploadDocumentSuccess = makeActionCreator(
  C.UPLOAD_DOCUMENT_SUCCESS,
  'result',
)
export const getUploadedDocs = makeActionCreator(
  C.GET_UPLOADED_DOCS,
  'data',
)
export const setUploadedDocs = makeActionCreator(
  C.SET_UPLOADED_DOCS,
  'result',
)
