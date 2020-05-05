import React, {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Img from 'components/common/Img'
import ProfileForm from 'components/common/ProfileForm'
import Documents from 'components/common/Documents'
import Button from 'components/common/Button'
import PromptModal from 'components/common/PromptModal'
import ChangePassword from 'components/common/ChangePassword'

import UserIcon from 'components/common/Icons/User'
import Arrow from 'components/common/Icons/Arrow'

import API from 'API'

import usePrevious from 'Hooks/usePrevious'

import styles from './styles'

const Profile = ({
                   getUserInfo, userInfo, updateProfile, userUpdated,
                   setProfileState, getUserFactors, getDocumentCategories,
                   documentCategories, uploadDocumentFile, fileUploaded, userOrders,
                   getUploadedDocs, uploadedDocs,history,
                   ...props
                 }) => {

  const [form, setForm] = useState({})
  const [exitModal, setExitModal] = useState(false)
  const previousUserUpdated = usePrevious(userUpdated)
  const previousFileUpdated = usePrevious(fileUploaded)
  const {leftTabs, rightTabs} = props

  const [activeTab, setActiveTab] = useState('orders')

  useEffect(() => {
    if (userInfo && userInfo.user_profile) {
      setForm(userInfo.user_profile)
    }
  }, [userInfo])

  useEffect(() => {
    if (!previousUserUpdated && userUpdated) {
      props.addNotification('success', userUpdated)
      setProfileState(null)

    }
  }, [userUpdated])

  useEffect(() => {
    if (!previousFileUpdated && fileUploaded) {
      props.addNotification('success', 'مدرک مورد نظر با موفقیت آپلود شد.')
    }
  }, [fileUploaded])

  useEffect(() => {
    getUserInfo();
    getUserFactors();
    getDocumentCategories();
    getUploadedDocs();

    if(history.location.search && history.location.search.includes('status')){
      if(history.location.search.includes('success')){
        props.addNotification('success', 'پرداخت شما با موفقیت انجام شده و سفارش شما ثبت شد')
      }
      else{
        props.addNotification('error', 'پرداخت شما با خطا مواجه شده است')
      }
    }
  }, [])


  function uploadDocument({file, category}) {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('category', category)

    if (file && category) {
      uploadDocumentFile(formData)
    }
  }

  function handleChangePassword(data) {
    props.setLoading(true)
    API.ChangePassword('', {data})
      .then(response => {
          props.setLoading(false)
          if (response.status) {
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

  function TabContent(activeTab) {
    switch (activeTab) {
      case 'info':
        return <ProfileForm userInfo={userInfo} updateForm={setForm}/>
      case 'orders':
        return Orders(userOrders)
      case 'upload':
        return <Documents categories={documentCategories}
                          uploadedDocs={uploadedDocs}
                          uploadFile={uploadDocument}/>

      case 'password':
        return <div className={styles.container__password}>
          <ChangePassword addNotification={props.addNotification}
                          submitNewPassword={handleChangePassword}/>
        </div>
    }
  }

  function Orders({user_factors}) {
    return <section>
      {user_factors &&
      user_factors.map(item => <div className={styles.container__factor}>
        <div>
          <Img src={`https://backend.parsicar.ir${item.car_image}`}/>
          <span>
            {item.car_name}
          </span>
        </div>

        <div>
          <span>{!!(item.start_date) ? item.start_date.split('-').join('/') : ''}</span>
          <Link to={`/profile/factor?data=${JSON.stringify(item)}`}>نمایش فاکتور</Link>
          {
            +item.status === 2 ?
              <Button type={'primary'} onClick={() =>handlePayment(item)}>
                پرداخت
              </Button>
              : <Button type={'primary'} onClick={() => history.push(`/cars/detail/${item.car_id}`)}>
                رزرو دوباره
              </Button>
          }

          <Arrow/>
        </div>

      </div>)}
    </section>

  }

  function handlePayment(item) {
    props.setLoading(true)
    const data = {factor_id: item.factor_id}
    API.CheckOutRequest({}, {data})
      .then(response =>{
        props.setLoading(false)
        if(!response.status){
          props.addNotification('error', response.message || 'خطا در برقراری ارتباط با سرور')
        }
        else{
          const url = response.message
          window.location.assign(url/*.split('‬‬').join('').split('‫‪').join('')*/)
        }
      })
  }

  function handleClickOnAction(action) {
    switch (action) {
      case 'save': {
        updateProfile({name: form.name, user_profile: form})
        break
      }
      case 'password': {
        setActiveTab('password')
        break
      }
      case 'exit': {
        setExitModal(true)
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
            leftTabs.map(item => !!(item.key !== 'save' ||
              (item.key === 'save' && activeTab === 'info')) && <div
              onClick={() => handleClickOnAction(item.key)}>{item.value}</div>)
          }
        </div>
      </div>

      <div className={styles.container__tabContent}>
        {TabContent(activeTab)}
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
