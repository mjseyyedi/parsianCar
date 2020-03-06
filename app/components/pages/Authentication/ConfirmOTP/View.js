import React, {useState, useEffect} from 'react'
import OtpInput from 'react-otp-input';

import Button from 'components/common/Button';
import Logo from 'components/common/Icons/Logo'

import {Events} from 'utils'

import styles from './styles'

const ConfirmCode = ({addNotification, OTPResult, history,setOTP,isMobile, ...props}) => {

  const [OTPCode, setOTPCode] = useState('')

  useEffect(() => {
    window.addEventListener('popstate', handleBackButton, true)

    return () => {
      setTimeout(() =>{
        window.removeEventListener('popstate', handleBackButton, true)
      } , 0)
    }

  }, [])

  useEffect(() =>{
    if(!OTPResult || !OTPResult.phone){
      history.goBack()
    }
  } , [OTPResult])

  function handleBackButton() {
    window.dispatchEvent(
      new CustomEvent(Events.CLICK_ON_LOGIN),
    )
  }

  function handleOTP() {
    if(OTPCode && String(OTPCode).length === 6){
      setOTP({[OTPResult.phone]: OTPCode})
      history.push('/login/set-password')
    }
    else{
      addNotification('warning', 'لطفا کد دریافتی خود را به صورت کامل وارد کنید.')
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
        کد ارسال شده به شماره {OTPResult ? OTPResult.phone : ''} را وارد کنید.
      </span>
      }
      <div className={`${styles.container__fields} ${isMobile && styles['container__fields--mobile']}`}>
        <OtpInput
          onChange={setOTPCode}
          numInputs={6}
          containerStyle={styles.otpContainer}
          inputStyle={styles.otpInput}
          value={OTPCode}
          shouldAutoFocus
        />
        <Button type={'primary'} onClick={handleOTP}>
          بعدی
        </Button>

      </div>
    </div>
  )
}

export default React.memo(ConfirmCode)
