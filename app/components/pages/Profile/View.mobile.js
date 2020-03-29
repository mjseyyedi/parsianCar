import React, {useState, useEffect} from 'react'

import ProfileForm from 'components/common/ProfileForm'
import Button from 'components/common/Button'

import usePrevious from 'Hooks/usePrevious'
import styles from './styles.mobile'

const Profile = ({
                   userInfo, getUserInfo, history, isMobile,
                   updateProfile, setProfileState, userUpdated,
                   getUserFactors,
                   ...props
                 }) => {

  const [form, setForm] = useState({})
  const previousUserUpdated = usePrevious(userUpdated)

  useEffect(() => {
    if (userInfo && userInfo.user_profile) {
      setForm(userInfo.user_profile)
    }
  }, [userInfo])


  useEffect(() => {
    if (!previousUserUpdated && userUpdated) {
      props.addNotification('success', userUpdated)
      setProfileState(null)
      history.goBack()
    }
  }, [userUpdated])

  useEffect(() => {
    getUserInfo();

  }, [])

  return (
    <div className={styles.container}>
      <span>
        مشخصات
      </span>
      <div className={styles.container__content}>
        <ProfileForm userInfo={userInfo} updateForm={setForm} isMobile/>

      </div>
      {
        isMobile && <div className={styles.container__action}>
          <Button type={'primary'} onClick={() => updateProfile({name: form.name, user_profile: form})}>
            ذخیره
          </Button>
        </div>
      }
    </div>
  )
}

export default Profile
