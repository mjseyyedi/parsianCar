import C from './constants'
import {combineReducers} from 'redux'
import {loadState, merge} from 'Redux/store/localStorage'
import initialState from './state'
const persistedState = loadState(initialState)

const startingState = typeof window !== 'undefined' ?  merge(persistedState.home, initialState) : initialState

const HomeData = (state = startingState.HomeData, action) =>
  action.type === C.SET_HOME_DATA ? action.result : state


export default combineReducers({
  HomeData,
})
