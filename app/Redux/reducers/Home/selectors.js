import {createSelector} from 'reselect'

const selectHome = state =>
  state.home

const selectHomeData = () =>
  createSelector(
    selectHome,
    home =>
      home.HomeData,
  )


export {
  selectHomeData,

}
