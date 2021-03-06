import React from 'react'

import SocialIcon from 'components/common/Icons/Social'

import styles from './styles'

export default function Footer() {

  return (
    <div className={styles.footer}>
      <div>
        <span>
          فرصت‌های شغلی
        </span>
        <span>
           شرایط و قوانین
        </span>
        <span>
          حریم خصوصی
        </span>
        <span>
          درباره ما
        </span>
        <span>
          تماس با ما
        </span>
        <span>
          سوالات متداول
        </span>
        <span>
          ثبت شکایات
        </span>
      </div>

      <div>
        <span>
          کلیه حقوق سایت برای پارسی کار محفوظ است. استفاده غیر تجاری مطالب همراه با ذکر منبع و لینک مجاز است.
        </span>
      </div>
      <div className={styles.footer__social}>
        <a href="https://www.instagram.com/parsicar_rent/" target='_blank'>
          <SocialIcon type={'instagram'}/>
        </a>
        <a href="https://twitter.com/parsicar" target='_blank'>
          <SocialIcon type={'twitter'} width={16} height={21}/>
        </a>
        {/*<SocialIcon type={'facebook'} width={16} height={21}/>*/}
      </div>

    </div>
  )
}
