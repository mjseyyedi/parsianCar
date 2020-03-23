import React from 'react'
import {Link} from 'react-router-dom'

import HomeIcon from 'components/common/Icons/Home'
import CarsIcon from 'components/common/Icons/Cars'
import UserIcon from 'components/common/Icons/User'

import styles from './styles'

export default function Footer() {

  return (
    <div className={styles.footer}>
      <Link to={'/'}>
        <HomeIcon/>
        <span>
          خانه
        </span>
      </Link>
      <Link to={'/cars/all/all'}>
        <CarsIcon/>
        <span>
          انتخاب خودرو
        </span>
      </Link>
      <Link to={'/profile'}>
        <UserIcon/>
        <span>
          حساب کاربری
        </span>
      </Link>
    </div>
  )
}
