import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import reducer from 'Redux/reducers/Profile/reducer'
import saga from 'Redux/reducers/Profile/saga'

import {setLoading} from 'Redux/reducers/global/actions'

import {
  getUserInfo, updateProfile,
  updateProfileSuccess, getUserFactors,
  getDocumentCategories, uploadDocument,
  getUploadedDocs,
} from 'Redux/reducers/Profile/actions'
import {
  selectUserInfo, selectUserUpdated, selectUserOrders, selectUploadedDocs,
  selectDocumentCategories, selectFileUploaded,
} from 'Redux/reducers/Profile/selectors'

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
    setLoading: data => dispatch(setLoading(data)),
    getUserFactors: () => dispatch(getUserFactors()),
    getUploadedDocs: () => dispatch(getUploadedDocs()),
    updateProfile: data => dispatch(updateProfile(data)),
    uploadDocumentFile: data => dispatch(uploadDocument(data)),
    setProfileState: data => dispatch(updateProfileSuccess(data)),
    getDocumentCategories: () => dispatch(getDocumentCategories()),
  }

  const mapStateToProps = useSelector(createStructuredSelector({
    userInfo: selectUserInfo(),
    userUpdated: selectUserUpdated(),
    documentCategories: selectDocumentCategories(),
    fileUploaded: selectFileUploaded(),
    userOrders: selectUserOrders(),
    uploadedDocs: selectUploadedDocs(),
  }))

  const rightTabs = [
    {key: 'info', value: 'اطلاعات کاربری'},
    {key: 'orders', value: 'سفارش های من'},
    {key: 'upload', value: 'آپلود مدارک'},
  ]

  const leftTabs = [
    {key: 'save', value: 'ذخیره'},
    {key: 'password', value: 'تغییر رمز عبور'},
    {key: 'exit', value: 'خروج'},
  ]
  const props = Object.assign({}, initialProps, mapDispatchToProps, mapStateToProps, {rightTabs}, {leftTabs})

  return props.isMobile ? <MobileView {...props}/> : <View {...props} />
}

export default ProfilePageIndex
