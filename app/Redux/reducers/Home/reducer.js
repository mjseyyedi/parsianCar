import C from './constants'
import {combineReducers} from 'redux'
import initialState from './state'

const HomeData = (state = initialState.HomeData, action) =>
  action.type === C.SET_HOME_DATA ? action.result : state


export default combineReducers({
  HomeData,
})
