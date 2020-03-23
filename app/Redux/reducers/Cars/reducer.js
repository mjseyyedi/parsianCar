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

const Categories = (state = startingState.Categories, action) =>
  action.type === C.SET_CATEGORIES_LIST ? action.result : state

const CarDetail = (state = startingState.CarDetail, action) =>{
  const currentDate = state
  if(action.type === C.SET_CAR_DETAIL){
    currentDate[action.result.id] = action.result
    return {...currentDate}
  }
  return state
}


export default combineReducers({
  Cars,
  Brands,
  CarDetail,
  Categories
})
