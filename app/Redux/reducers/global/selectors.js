import {createSelector} from 'reselect'

const selectGlobal = state =>
  state.global

const selectRouterMatch = () =>
  createSelector(
    selectGlobal,
    global =>
      global.routerMatch,
  )

const selectRouterPath = () =>
  createSelector(
    selectGlobal,
    global =>
      global
        .routerMatch
        .path,
  )

const selectRouterUrl = () =>
  createSelector(
    selectGlobal,
    global =>
      global
        .routerMatch
        .url,
  )

const selectLoading = () =>
  createSelector(
    selectGlobal,
    global =>
      global.loading,
  )
const selectError = () =>
  createSelector(
    selectGlobal,
    global =>
      global.error,
  )
const selectUserCredential = () =>
  createSelector(
    selectGlobal,
    global =>
      global.isUserLogged,
  )

export {
  selectUserCredential,
  selectRouterMatch,
  selectRouterPath,
  selectRouterUrl,
  selectLoading,
  selectError
}
