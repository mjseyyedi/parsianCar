import {createSelector} from 'reselect'

const selectCars = state =>
  state.cars

const selectCarsList = () =>
  createSelector(
    selectCars,
    cars =>
      cars.Cars,
  )

const selectBrands = () =>
  createSelector(
    selectCars,
    cars =>
      cars.Brands,
  )


export {
  selectCarsList,
  selectBrands
}
