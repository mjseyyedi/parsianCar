import C from './constants'
import {combineReducers} from 'redux'
import initialState from './state'

const pageTitle = (state = initialState.pageTitle, action) =>
  action.type === C.SET_LOADING ? action.data : state


export default combineReducers({
  pageTitle,
})
