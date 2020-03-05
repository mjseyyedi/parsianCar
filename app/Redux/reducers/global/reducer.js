import C from './constants'
import {combineReducers} from 'redux'
import initialState from './state'

const loading = (state = initialState.loading, action) =>
  action.type === C.SET_LOADING ? action.data : state

const error = (state = initialState.error, action) =>
  action.type === C.SET_ERROR ? action.data : state

const isUserLogged = (state = initialState.isUserLogged, action) =>
  action.type === C.SET_USER_CREDENTIAL ? action.data : state

export default combineReducers({
  loading,
  error,
  isUserLogged
})
