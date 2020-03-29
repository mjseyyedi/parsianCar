import React, {useState, useEffect} from 'react'

import Img from 'components/common/Img'
import UserIcon from 'components/common/Icons/User'

import styles from './styles.mobile'

const Profile = ({userInfo, getUserInfo, history, ...props}) => {

  const [form, setForm] = useState({})

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

  console.log(userInfo)

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
    }
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

    </div>
  )
}

export default Profile
