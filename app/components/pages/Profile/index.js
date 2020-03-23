import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import reducer from 'Redux/reducers/Profile/reducer'
import saga from 'Redux/reducers/Profile/saga'

import {getUserInfo, updateProfile, updateProfileSuccess} from 'Redux/reducers/Profile/actions'
import {selectUserInfo, selectUserUpdated} from 'Redux/reducers/Profile/selectors'

import useRedux from 'Hooks/useRedux'

import View from './View'
import MobileView from './View.mobile'

const ProfilePageIndex = (initialProps) => {
  const reducers = {profile: reducer}
  const sagas = {profile: saga}
  const dispatch = useDispatch()

  useRedux(reducers, sagas)

  const mapDispatchToProps = {
    getUserInfo: () => dispatch(getUserInfo()),
    updateProfile: data => dispatch(updateProfile(data)),
    setProfileState: data => dispatch(updateProfileSuccess(data)),
  }

  const mapStateToProps = useSelector(createStructuredSelector({
    userInfo: selectUserInfo(),
    userUpdated: selectUserUpdated(),
  }))

  const rightTabs = [
    {key: 'info', value:'اطلاعات کاربری'},
    {key: 'orders', value:'سفارش های من'},
    {key: 'upload', value:'آپلود مدارک'},
  ]

  const leftTabs = [
    {key: 'save', value:'ذخیره'},
    {key: 'password', value:'تغییر رمز عبور'},
    {key: 'exit', value:'خروج'},
  ]
  const props = Object.assign({}, initialProps, mapDispatchToProps, mapStateToProps, {rightTabs}, {leftTabs})

  return props.isMobile ? <MobileView {...props}/> : <View {...props} />
}

export default ProfilePageIndex
