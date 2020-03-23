import {createSelector} from 'reselect'

const selectProfile = state =>
  state.profile

const selectUserInfo = () =>
  createSelector(
    selectProfile,
    profile =>
      profile.userInfo,
  )

const selectUserUpdated = () =>
  createSelector(
    selectProfile,
    profile =>
      profile.userUpdated,
  )



export {
  selectUserInfo,
  selectUserUpdated
}
