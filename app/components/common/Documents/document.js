import React, {useEffect, useState} from 'react'

import Img from 'components/common/Img'
import Verification from 'components/common/Icons/Verification'

import styles from './styles'

const Document = ({text, uploadFile, category, uploadedDoc, isMobile}) => {

  const [file, setFile] = useState(null)
  const [imgSrc, setImgSrc] = useState(null)

  useEffect(() => {
    if (file) {
      uploadFile({file, category})
    }
  }, [file])


  return (<section className={styles.container__section} style={{'--right-padding': isMobile ? '24px' : '48px'}}>
    <span className={isMobile ? styles['container__title--mob'] : styles['container__title']}>
      {text}
    </span>
    <div>
      {
        (uploadedDoc ?
          <div>
            <Verification type={uploadedDoc.is_checked ? 'verified' : 'failed'}/>
            <Img src={`http://backend.parsicar.ir${uploadedDoc.image}`}/>
          </div>
          : (
            !file ? <React.Fragment>
              <label htmlFor="upload-photo">آپلود کنید</label>
              <input type="file" id="upload-photo"
                     accept="image/png, image/jpeg, image/jpg"
                     onChange={e => {
                       const input = e.target
                       if (input.files && input.files[0]) {
                         const reader = new FileReader()

                         reader.onload = function(e) {
                           setImgSrc(e.target.result)
                         }

                         reader.readAsDataURL(input.files[0])
                       }
                       setFile(e.target.files[0])
                     }}/>
            </React.Fragment> : <div onClick={() => {
              setFile(null)
              setImgSrc(null)
            }}>
              <Img src={imgSrc}/>
            </div>
          ))

      }

    </div>
  </section>)
}

export default Document
