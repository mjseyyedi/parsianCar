import React, {useState, useEffect} from 'react'

import Input from 'components/common/Input';
import Button from 'components/common/Button';
import Logo from 'components/common/Icons/Logo'

import {Phone} from 'utils'
import styles from './styles'

const Login = ({addNotification, login, OTPResult,history,isMobile,loginNumber, ...props}) => {
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() =>{
    if(OTPResult && OTPResult.status){
      history.push('/login/confirm-otp')
    }
  } , [OTPResult])


  useEffect(() => {
    if(loginNumber){
      history.push('/login/password')
    }
  } , [loginNumber])

  function handleLogin(phone) {
    console.log(phone)
    if(phone && Phone.phoneNumberValidation(phone)){
      login({phone})
    }
    else{
      addNotification('warning', 'شماره تماس وارد شده معتبر نمی باشد.')
    }
  }

  return (
    <div className={styles.container} style={{height : isMobile ? `var(--mobile-container-height)` : ''}}>
      {
        isMobile && <div className={styles.container__logo}>
          <Logo width={205} height={80}/>
        </div>
      }
      {
        !isMobile && <span className={styles.container__title}>
        برای ورود یا ثبت‌نام شماره خود را وارد کنید
      </span>
      }

      <div className={`${styles.container__fields} ${isMobile && styles['container__fields--mobile']}`}>
        <Input onInput={setPhoneNumber}
               placeholder={'شماره تماس'}
               type={'tel'}/>
        <Button type={'primary'} onClick={() => handleLogin(phoneNumber)}>
          ورود یا ثبت نام
        </Button>
      </div>
    </div>
  )
}

export default Login

