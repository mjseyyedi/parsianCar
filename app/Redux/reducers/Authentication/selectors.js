import {createSelector} from 'reselect'

const selectAuth = state =>
  state.authentication

const selectSendOtpResult = () =>
  createSelector(
    selectAuth,
    auth =>
      auth.sendOtpResult,
  )

const selectOTPCode = () =>
  createSelector(
    selectAuth,
    auth =>
      auth.OTPCode,
  )

const selectLoginNumber = () =>
  createSelector(
    selectAuth,
    auth =>
      auth.loginNumber,
  )


export {
  selectSendOtpResult,
  selectOTPCode,
  selectLoginNumber
}
