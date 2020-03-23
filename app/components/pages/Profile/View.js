import React, {useState, useEffect} from 'react'

import Img from 'components/common/Img';
import ProfileForm from 'components/common/ProfileForm';
import UserIcon from 'components/common/Icons/User';

import usePrevious from 'Hooks/usePrevious'
import styles from './styles'

const Profile = ({ getUserInfo, userInfo,updateProfile, userUpdated, setProfileState, ...props}) => {

  const [form, setForm] = useState({})
  const previousUserUpdated = usePrevious(userUpdated)
  const {leftTabs, rightTabs} = props

  const [activeTab, setActiveTab] = useState('info')

  useEffect(() =>{
    if(userInfo && userInfo.user_profile){
      setForm(userInfo.user_profile)
    }
  } , [userInfo])

  useEffect(() =>{
    if(!previousUserUpdated && userUpdated){
      props.addNotification('success', userUpdated);
      setProfileState(null)

    }
  } , [userUpdated])

  useEffect(() =>{
    getUserInfo()
  } , [])

  function TabContent(activeTab) {
    switch (activeTab) {
      case 'info':
        return <ProfileForm userInfo={userInfo} updateForm={setForm}/>;
      case 'orders':
        return Orders()

    }
  }

  function Orders() {

  }


  function handleClickOnAction(action) {
    switch (action) {
      case 'save':{
        updateProfile({name: form.name, user_profile: form})
        break;
      }
      case 'password':{


        break;
      }
      case 'exit':{

      }
    }
  }

  return (
    <div className={styles.container}>
      <span>
        {
          userInfo ? userInfo.username : ''
        }
      </span>

      <div className={styles.container__tabs}>
        <div>
          <div className={styles.container__avatar}>
            {
              form.profile_image && form.profile_image.image ?
                <Img src={form.profile_image.image} alt={userInfo ? userInfo.username : ''}/> :
                <UserIcon fill={'#43404B'}
                          height={143}
                          width={143}/>
            }
          </div>
          {
            rightTabs.map(item => <div className={activeTab === item.key ? styles['container__tabs--active'] : ''}
              onClick={() => setActiveTab(item.key)}>{item.value}</div>)
          }
        </div>
        <div>
          {
            leftTabs.map(item => <div
              onClick={() => handleClickOnAction(item.key)}>{item.value}</div>)
          }
        </div>
      </div>

      <div className={styles.container__tabContent}>
        {TabContent(activeTab)}
      </div>


    </div>
  )
}

export default Profile
