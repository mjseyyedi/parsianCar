import React from 'react'

import styles from './styles'

function Index({isActive, label, onClick}) {
  return <div className={styles.container} onClick={onClick}>
    <div>
      <div className={isActive ? styles.container__active : styles.container__inactive} />
    </div>
    <span>
      {label}
    </span>
  </div>

}

export default Index
