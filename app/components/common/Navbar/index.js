import React from 'react'
import {Link} from 'react-router-dom'

import LogoIcon from 'components/common/Icons/Logo'

import {Events} from 'utils'

import styles from './styles'

export default function Navbar({userCredential}) {


  function handleLoginClick() {
    window.dispatchEvent(
      new CustomEvent(Events.CLICK_ON_LOGIN)
    )
  }

  return (
    <div className={styles.navbar}>
      <div>
        <Link to={'/cars/all/all'} className={styles.navbar__actions}>
          انتخاب خودرو
        </Link>
        {
          userCredential ? <Link to={'/profile/edit'}
                                 className={styles.navbar__actions}>
              پروفایل
            </Link>
            :<Link to={'/login'}
                                  onClick={handleLoginClick}
                                  className={styles.navbar__actions}>
            عضویت&nbsp;|&nbsp;ورود
          </Link>
        }
      </div>
      <div>

      </div>
      <Link to={'/'}>
        <LogoIcon/>
      </Link>


    </div>
  )
}
