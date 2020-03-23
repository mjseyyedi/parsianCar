import C from './constants'
import {combineReducers} from 'redux'
import initialState from './state'

const userInfo = (state = initialState.userInfo, action) =>
  action.type === C.SET_USER_INFO ? action.result : state

const userUpdated = (state = initialState.userUpdated, action) =>
  action.type === C.UPDATE_PROFILE_SUCCESS ? action.result : state

export default combineReducers({
  userInfo,
  userUpdated
})
