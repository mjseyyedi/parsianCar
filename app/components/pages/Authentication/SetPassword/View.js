import React, {useState, useEffect} from 'react'

import Input from 'components/common/Input'
import Button from 'components/common/Button'
import Logo from 'components/common/Icons/Logo'

import styles from './styles'

const SetPassword = ({addNotification, history, register, isMobile, error,setError, ...props}) => {

  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  useEffect(() => {

    if (error && error.message) {
      addNotification('error', error.message)
      setError(null)
      history.goBack()
    }
  }, [error])

  function handleRegister(password, rePass) {
    if (!password || !rePass) {
      addNotification('warning', 'لطفا کلمه عبور و تکرار آن را به دقت وارد کنید.')
    } else if (password.length < 6 || rePass.length < 6) {
      addNotification('warning', 'کلمه عبور باید حداقل ۶ کاراکتر باشد.')
    } else if (password !== rePass) {
      addNotification('warning', 'کلمه عبور و تکرار آن برابر نیست.')
    } else {
      register({password})
    }
  }


  return (
    <div className={styles.container}
         style={{height: isMobile ? `var(--mobile-container-height)` : ''}}>
      {
        isMobile && <div className={styles.container__logo}>
          <Logo width={205} height={80}/>
        </div>
      }
      {
        !isMobile && <span className={styles.container__title}>
        کلمه عبور خود را وارد کنید.
      </span>
      }
      <div className={styles.container__fields}>
        <Input type={'password'} onInput={setPassword} placeholder={'کلمه عبور'}/>
        <Input type={'password'} onInput={setRePassword} placeholder={'تکرار کلمه عبور'}/>
        <Button type={'primary'} onClick={() => handleRegister(password, rePassword)}>
          عضویت
        </Button>
      </div>

    </div>
  )
}

export default SetPassword
