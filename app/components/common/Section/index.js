import React from 'react'

import styles from './styles'

export default function Section(props) {
  return (
    <div className={styles.section}>
      <span className={styles.section__title}>{props.data.title}</span>
      <span className={styles.section__subtitle}>{props.data.subtitle}</span>
      <img src={props.data.img} alt="section"/>
    </div>
  )
}
