import React, {useState} from 'react'

import Input from 'components/common/Input'
import Button from 'components/common/Button'

import styles from './styles'

const ChangePassword = ({addNotification, submitNewPassword}) => {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newRePassword, setNewRePassword] = useState('')

  function handleSubmitForm(e){
    e.preventDefault()
    if(!password || !newPassword || !newRePassword){
      addNotification('warning', 'لطفا تمامی فیلدها را با دقت پر کنید');
    }
    else if(newPassword.length < 6){
      addNotification('warning', 'رمزعبور جدید باید حداقل ۶ کاراکتر باشد');
    }
    else if(newRePassword !== newPassword){
      addNotification('warning', 'رمزعبور جدید با تکرار آن برابر نیست!');
    }
    else {
      submitNewPassword({password, newPassword})
    }

  }

  return (<div className={styles.container}>
      <span>
        کلمه عبور خود را تغییر دهید.
      </span>
      <form action="" onSubmit={handleSubmitForm}>
        <Input onInput={setPassword} type={'password'} placeholder={'پسورد فعلی'}/>
        <Input onInput={setNewPassword} type={'password'} placeholder={'پسورد جدید'}/>
        <Input onInput={setNewRePassword} type={'password'} placeholder={'تکرار پسورد جدید'}/>
        <Input type={'submit'} value={'ثبت'}/>
      </form>

    </div>
  )
}

export default ChangePassword
