import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import reducer from 'Redux/reducers/Profile/reducer'
import saga from 'Redux/reducers/Profile/saga'

import {
  getUploadedDocs,
  getDocumentCategories,
  uploadDocument,
} from 'Redux/reducers/Profile/actions'
import {
  selectUploadedDocs, selectDocumentCategories,
  selectFileUploaded,
} from 'Redux/reducers/Profile/selectors'

import useRedux from 'Hooks/useRedux'

import View from './View.mobile'

const DocumentPageIndex = (initialProps) => {
  const reducers = {profile: reducer}
  const sagas = {profile: saga}
  const dispatch = useDispatch()

  useRedux(reducers, sagas)

  const mapDispatchToProps = {
    getUploadedDocs: () => dispatch(getUploadedDocs()),
    getDocumentCategories: () => dispatch(getDocumentCategories()),
    uploadDocumentFile: data => dispatch(uploadDocument(data)),
    // getFrontContent : data => dispatch(getFrontContent(data))
  }

  const mapStateToProps = useSelector(createStructuredSelector({
    uploadedDocs: selectUploadedDocs(),
    fileUploaded: selectFileUploaded(),
    documentCategories: selectDocumentCategories(),
  }))

  const props = Object.assign({}, initialProps, mapDispatchToProps, mapStateToProps)

  return <View {...props} />
}

export default DocumentPageIndex
