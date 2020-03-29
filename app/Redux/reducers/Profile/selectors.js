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

const selectDocumentCategories = () =>
  createSelector(
    selectProfile,
    profile =>
      profile.documentCategories,
  )
const selectFileUploaded = () =>
  createSelector(
    selectProfile,
    profile =>
      profile.fileUploaded,
  )
const selectUserOrders = () =>
  createSelector(
    selectProfile,
    profile =>
      profile.userOrders,
  )


const selectUploadedDocs = () =>
  createSelector(
    selectProfile,
    profile =>
      profile.uploadedDocs,
  )



export {
  selectUserInfo,
  selectUserOrders,
  selectUserUpdated,
  selectFileUploaded,
  selectUploadedDocs,
  selectDocumentCategories
}
