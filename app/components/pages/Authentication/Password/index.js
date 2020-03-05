import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import reducer from 'Redux/reducers/Authentication/reducer'
import saga from 'Redux/reducers/Authentication/saga'

import {requestLoginWithPassword} from 'Redux/reducers/Authentication/actions'
import {selectLoginNumber} from 'Redux/reducers/Authentication/selectors'

import useRedux from 'Hooks/useRedux'

import View from './View'

const PasswordPageIndex = (initialProps) => {
  const reducers = {authentication: reducer}
  const sagas = {authentication: saga}
  const dispatch = useDispatch()

  useRedux(reducers,sagas)

  const mapDispatchToProps = {
    login : data => dispatch(requestLoginWithPassword(data))
  }
  const mapStateToProps = useSelector(createStructuredSelector({
    phone : selectLoginNumber()
  }))

  const props = Object.assign({}, initialProps, mapDispatchToProps, mapStateToProps)

  return <View {...props} />
}

export default PasswordPageIndex
