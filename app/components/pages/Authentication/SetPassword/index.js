import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import reducer from 'Redux/reducers/Authentication/reducer'
import saga from 'Redux/reducers/Authentication/saga'

import {register} from 'Redux/reducers/Authentication/actions'
// import {selectSendOtpResult} from 'Redux/reducers/Authentication/selectors'

import useRedux from 'Hooks/useRedux'

import View from './View'

const SetPasswordIndex = (initialProps) => {
  const reducers = {authentication: reducer}
  const sagas = {authentication: saga}
  const dispatch = useDispatch()

  useRedux(reducers,sagas)

  const mapDispatchToProps = {
    register : data => dispatch(register(data))
  }
  const mapStateToProps = useSelector(createStructuredSelector({
    // OTPResult : selectSendOtpResult()
  }))

  const props = Object.assign({}, initialProps, mapDispatchToProps, mapStateToProps)

  return <View {...props} />
}

export default SetPasswordIndex
