import {createSelector} from 'reselect'

const selectGlobal = state =>
  state.global

const selectPageTitle = () =>
  createSelector(
    selectGlobal,
    global =>
      global.pageTitle,
  )


export {
  selectPageTitle,

}
