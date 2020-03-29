import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createStructuredSelector} from 'reselect'
// import reducer from 'Redux/reducers/Profile/reducer'
// import saga from 'Redux/reducers/Profile/saga'

import {setLoading} from 'Redux/reducers/global/actions'
// import {selectUserInfo, selectUserUpdated} from 'Redux/reducers/Profile/selectors'

import useRedux from 'Hooks/useRedux'

import MobileView from './View.mobile'

const ChangePasswordIndex = (initialProps) => {
  // const reducers = {profile: reducer}
  // const sagas = {profile: saga}
  const dispatch = useDispatch()

  // useRedux(reducers, sagas)

  const mapDispatchToProps = {
    // getUserInfo: () => dispatch(getUserInfo()),
    // updateProfile: data => dispatch(updateProfile(data)),
    // setProfileState: data => dispatch(updateProfileSuccess(data)),
    setLoading: data => dispatch(setLoading(data)),

  }

  const mapStateToProps = useSelector(createStructuredSelector({
    // userInfo: selectUserInfo(),
    // userUpdated: selectUserUpdated(),
  }))


  const props = Object.assign({}, initialProps, mapDispatchToProps, mapStateToProps)

  return <MobileView {...props}/>
}

export default ChangePasswordIndex
