import React from 'react'

import Document from './document'

import styles from './styles'

const Documents = ({categories, uploadFile, uploadedDocs, isMobile}) => {
  return (<section className={styles.container}>
    {
      categories && categories.map(item => {
        const currentDoc = uploadedDocs ? uploadedDocs.filter(doc => doc.category === item.value) : []
        return <div className={styles.container__row}>
        <Document text={item.show_message}
                  uploadFile={uploadFile}
                  isMobile={isMobile}
                  uploadedDoc={currentDoc && currentDoc.length > 0 ? currentDoc[0] : null}
                  category={item.value} isVerified={false}/>
      </div>})
    }
  </section>)
}

export default Documents
