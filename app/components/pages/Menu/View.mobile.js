import React, {useState, useEffect} from 'react'
import Cookies from 'js-cookie'

import Img from 'components/common/Img'
import UserIcon from 'components/common/Icons/User'
import PromptModal from 'components/common/PromptModal'

import styles from './styles.mobile'

const Profile = ({userInfo, getUserInfo, history, ...props}) => {

  const [form, setForm] = useState({})
  const [exitModal, setExitModal] = useState(false)

  const {leftTabs, rightTabs} = props
  const tabs = rightTabs.concat(leftTabs)


  useEffect(() =>{
    if(userInfo && userInfo.user_profile){
      setForm(userInfo.user_profile)
    }
  } , [userInfo])

  useEffect(() => {
    getUserInfo()
  }, [])

  function handleMenuClick(item) {
    switch (item) {
      case 'info':{
        history.push(`/profile/edit`)
        break;
      }
      case 'orders':{
        history.push(`/profile/orders`)
        break;
      }
      case 'upload':{
        history.push('/profile/documents')
        break;
      }
      case 'password':{
        history.push('/profile/change-password')
        break;
      }
      case 'exit':{
        // history.push('/profile/change-password')
        setExitModal(true)
        break;
      }
    }
  }
  function handleLogOut() {
    Cookies.remove('Authorization')
    setExitModal(false)
    window.location.href = '/'
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <div className={styles.container__avatar}>
          {
            form.profile_image && form.profile_image.image ?
              <Img src={form.profile_image.image} alt={userInfo ? userInfo.username : ''}/> :
              <UserIcon fill={'#43404B'}
                        height={143}
                        width={143}/>
          }
        </div>
        <span>
          {
            userInfo ? userInfo.username : ''
          }
        </span>
        <div className={styles['container__content--row']}>
          {tabs.map(item => <div onClick={() => handleMenuClick(item.key)}>{item.value}</div>)}
        </div>
      </div>
      <PromptModal isOpen={exitModal}
                   text={'آیا برای خروج مطمئن هستید؟'}
                   confirmButton={{text: 'بله', action: handleLogOut}}
                   denyButton={{text: 'خیر'}}
                   close={() => setExitModal(false)}/>
    </div>
  )
}

export default Profile
