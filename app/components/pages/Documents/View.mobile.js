import React, {useState, useEffect} from 'react'

import Documents from 'components/common/Documents'
import Arrow from 'components/common/Icons/Arrow'

import usePrevious from 'Hooks/usePrevious'

import styles from './styles'

const DocumentsPage = ({ history, uploadedDocs, getUploadedDocs,
                     getDocumentCategories, documentCategories,
                     uploadDocumentFile, fileUploaded,
                     ...props}) => {

  const previousFileUpdated = usePrevious(fileUploaded)

  useEffect(() =>{
    getUploadedDocs();
    getDocumentCategories();
  } , [])

  useEffect(() => {
    if (!previousFileUpdated && fileUploaded) {
      props.addNotification('success', 'مدرک مورد نظر با موفقیت آپلود شد.')
    }
  }, [fileUploaded])

  function uploadDocument({file, category}) {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('category', category)

    if (file && category) {
      uploadDocumentFile(formData)
    }
  }

  return (<div className={styles.container}>
     <div className={styles.container__back} onClick={() => history.goBack()}>
          <Arrow rotation={'180deg'}/>
        </div>
      <Documents categories={documentCategories}
                 uploadedDocs={uploadedDocs}
                 isMobile
                 uploadFile={uploadDocument}/>
    </div>
  )
}

export default DocumentsPage
