import C from './constants'
import {combineReducers} from 'redux'
import initialState from './state'
import {loadState} from 'Redux/store/localStorage'

const persistedState = loadState(initialState)

console.log(111111, persistedState)
const Cars = (state = initialState.Cars, action) =>
  action.type === C.SET_CARS_LIST ? action.result : state

const Brands = (state = initialState.Brands, action) =>
  action.type === C.SET_BRANDS_LIST ? action.result : state


export default combineReducers({
  Cars,
  Brands
})
