import C from './constants'
import {loadState, merge} from 'Redux/store/localStorage'
import {combineReducers} from 'redux'
import initialState from './state'

const persistedState = loadState(initialState)

const startingState = typeof window !== 'undefined' ?  merge(persistedState.cars, initialState) : initialState

const Cars = (state = startingState.Cars, action) =>
  action.type === C.SET_CARS_LIST ? action.result : state

const Brands = (state = startingState.Brands, action) =>
  action.type === C.SET_BRANDS_LIST ? action.result : state


export default combineReducers({
  Cars,
  Brands
})
