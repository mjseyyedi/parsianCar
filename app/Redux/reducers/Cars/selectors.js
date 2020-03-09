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

const selectCarDetail = () =>
  createSelector(
    selectCars,
    cars =>
      cars.CarDetail,
  )


export {
  selectCarDetail,
  selectCarsList,
  selectBrands
}
