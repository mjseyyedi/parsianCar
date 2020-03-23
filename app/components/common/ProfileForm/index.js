import React, {useEffect, useState} from 'react'

import Input from 'components/common/Input';
import RadioButton from 'components/common/RadioButton';

import styles from './styles'

const ProfileForm = ({userInfo, updateForm, isMobile}) => {
  const [form, setForm] = useState({})

  useEffect(() =>{
    if(userInfo && userInfo.user_profile){
      setForm(userInfo.user_profile)
    }
  } , [userInfo])

  useEffect(() =>{
    updateForm(form)
  } , [form])


  return (<div className={styles.container__infoTab}
    style={{'--content-direction': isMobile ? 'column': 'row'}}>
      {
        !!(userInfo && userInfo.user_profile) && <React.Fragment>
          <div className={isMobile ? styles.container__mobile : ''}>
            <div className={styles[`container__infoTab${isMobile ? '--mobile-row' : '--row'}`]}>
              <Input placeholder={'نام'}
                     initialValue={userInfo.name}
                     onInput={name => setForm(state => ({...state, name }))}/>
              <Input placeholder={'نام خانوادگی'} onInput={lastName => setForm(state => ({lastName, ...state}))}/>
            </div>
            <div className={styles[`container__infoTab${isMobile ? '--mobile-row' : '--row'}`]}>
              <Input placeholder={'کد ملی'} type={'tel'}
                     initialValue={userInfo.user_profile.nationalCode}
                     onInput={nationalCode => setForm(state => ({...state, nationalCode}))}/>
              <div className={styles['container__infoTab--gander']}>
            <span>
              جنسیت
            </span>
                <RadioButton isActive={form.gender === 'male'}
                             label={'مرد'}
                             onClick={() => setForm(state => ({...state, gender: 'male'}))} />
                <RadioButton isActive={form.gender === 'female'}
                             label={'زن'}
                             onClick={() => setForm(state => ({...state, gender: 'female'}))} />
              </div>
            </div>
            <div className={styles[`container__infoTab${isMobile ? '--mobile-row' : '--row'}`]}>
              <div className={styles['container__infoTab--phone']}>
                <Input type={'tel'} placeholder={'تلفن ثابت'}
                       initialValue={userInfo.user_profile.tel}
                       onInput={tel => setForm(state => ({...state, tel}))}/>
                <Input type={'tel'} placeholder={'کد'}
                       initialValue={userInfo.user_profile.telCode}
                       onInput={telCode => setForm(state => ({...state, telCode}))}/>
              </div>
              <div className={styles['container__infoTab--fullWidth']}>
                <Input type={'tel'} placeholder={'تلفن همراه'} initialValue={userInfo ? userInfo.phone : ''} disabled/>
              </div>
            </div>
          </div>
          <div className={isMobile ? styles.container__mobile : ''}>
            <div className={`${styles[`container__infoTab${isMobile ? '--mobile-row' : '--row'}`]} ${styles['container__infoTab--fullWidth']}`}>
              <Input type={'text'}
                     initialValue={userInfo.user_profile.email}
                     onInput={email => setForm(state => ({...state, email}))} placeholder={'پست الکترونیک'}/>
            </div>
            <div className={styles[`container__infoTab${isMobile ? '--mobile-row' : '--row'}`]}>
              <Input type={'text'} placeholder={'استان'}
                     initialValue={userInfo.user_profile.state}
                     onInput={state => setForm(form => ({...form, state}))}/>
              <Input type={'text'} placeholder={'شهر'}
                     initialValue={userInfo.user_profile.city}
                     onInput={city => setForm(state => ({...state, city}))}/>
            </div>
            <div className={`${styles[`container__infoTab${isMobile ? '--mobile-row' : '--row'}`]} ${styles['container__infoTab--fullWidth']}`}>
              <Input type={'text'} placeholder={'آدرس'}
                     initialValue={userInfo.user_profile.address}
                     onInput={address => setForm(state => ({...state, address}))}/>
            </div>
          </div>
        </React.Fragment>
      }

    </div>

  )
}

export default ProfileForm
