import React, {useState, useEffect} from 'react'

import Arrow from 'components/common/Icons/Arrow'
import ChangePassword from 'components/common/ChangePassword'

import API from 'API'

import styles from './styles.mobile'

const ChangePasswordPage = ({history, ...props}) => {


  function handleChangePassword(data) {
    props.setLoading(true)
    API.ChangePassword('', {data})
      .then(response => {
          props.setLoading(false)
          if (response.status) {
            history.goBack()
            props.addNotification('success', response.message)
          } else {
            props.addNotification('error', response.message || 'خطا دربرقراری ارتباط با سرور')
          }

        },
        error => console.log(3, error))
      .catch(error => {
        props.setLoading(false)
        console.log(2, error)
      })
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__back} onClick={() => history.goBack()}>
        <Arrow rotation={'180deg'}/>
      </div>
      <ChangePassword addNotification={props.addNotification}
                      submitNewPassword={handleChangePassword}/>
    </div>
  )
}

export default ChangePasswordPage
