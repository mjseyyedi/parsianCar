import React, {useState, useEffect} from 'react'

import Button from 'components/common/Button'
import Logo from 'components/common/Icons/Logo'
import Input from 'components/common/Input'

import {Events} from 'utils'

import styles from './styles'

const Password = ({addNotification, isMobile, phone, login, history}) => {

  const [password, setPassword] = useState('')

  useEffect(() => {
    window.addEventListener('popstate', handleBackButton, true)

    return () => {
      setTimeout(() =>{
        window.removeEventListener('popstate', handleBackButton, true)
      } , 0)
    }

  }, [])

  useEffect(() => {
    if(!phone){
      history.goBack()
    }
  } , [phone])

  function handleBackButton() {
    window.dispatchEvent(
      new CustomEvent(Events.CLICK_ON_LOGIN),
    )
  }

  function handleLogin(phone, password) {
    if (phone && password) {
      login({phone, password})
    } else {
      addNotification('error', 'لطفا تلفن همراه و رمز عبور خود را به درستی وارد کنید')
    }
  }

  return (
    <div className={styles.container} style={{height: isMobile ? `var(--mobile-container-height)` : ''}}>
      {
        isMobile && <div className={styles.container__logo}>
          <Logo width={205} height={80}/>
        </div>
      }
      {
        !isMobile && <span className={styles.container__title}>
        رمز عبور خود را وارد کنید
      </span>
      }
      <div className={`${styles.container__fields} ${isMobile && styles['container__fields--mobile']}`}>
        <Input type={'tel'} placeholder={'شماره همراه'} disabled initialValue={phone}/>
        <Input type={'password'} placeholder={'رمز عبور'} onInput={setPassword}/>
        <Button type={'primary'} onClick={() => handleLogin(phone, password)}>
          ورود
        </Button>
      </div>
    </div>
  )
}

export default React.memo(Password)
