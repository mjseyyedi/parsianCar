import React from 'react'

import styles from './styles'

import IOS from 'assets/images/IOS-download3x.png'
import ANDROID from 'assets/images/android-download3x.png'
import CAFE_BAZAR from 'assets/images/bazaar-download3x.png'

export default function ActionHolders() {
  return (
    <div className={styles.action__holders}>
      <a className={styles.button} href="http://snappfood.ir/vendorAppAndroid">
        <img src={ANDROID}/>
      </a>
      <a
        className={styles.button}
        href="https://cafebazaar.ir/app/ir.snappfood.vms">
        <img src={CAFE_BAZAR}/>
      </a>
      <a className={styles.button} href="https://dakhl.snappfood.ir/">
        <img src={IOS}/>
      </a>
    </div>
  )
}
