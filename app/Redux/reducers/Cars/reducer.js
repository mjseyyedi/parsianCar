import C from './constants'
import {combineReducers} from 'redux'
import initialState from './state'

const Cars = (state = initialState.Cars, action) =>
  action.type === C.SET_CARS_LIST ? action.result : state

const Brands = (state = initialState.Brands, action) =>
  action.type === C.SET_BRANDS_LIST ? action.result : state


export default combineReducers({
  Cars,
  Brands
})
