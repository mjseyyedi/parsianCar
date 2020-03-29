import C from './constants'
import {combineReducers} from 'redux'
import initialState from './state'

const userInfo = (state = initialState.userInfo, action) =>
  action.type === C.SET_USER_INFO ? action.result : state

const userUpdated = (state = initialState.userUpdated, action) =>
  action.type === C.UPDATE_PROFILE_SUCCESS ? action.result : state

const documentCategories = (state = initialState.documentCategories, action) =>
  action.type === C.SET_DOCUMENT_CATEGORIES ? action.result : state

const userOrders = (state = initialState.userOrders, action) =>
  action.type === C.GET_USER_FACTORS_SUCCESS ? action.result : state

const uploadedDocs = (state = initialState.uploadedDocs, action) =>
  action.type === C.SET_UPLOADED_DOCS ? action.result : state

const fileUploaded = (state = initialState.fileUploaded, action) => {

  switch (action.type) {
    case C.UPLOAD_DOCUMENT: {
      return false
    }
    case C.UPLOAD_DOCUMENT_SUCCESS: {
      return true
    }
    default:
      return state

  }

}

export default combineReducers({
  userInfo,
  userOrders,
  userUpdated,
  fileUploaded,
  uploadedDocs,
  documentCategories,
})
