import React, {useState, useEffect} from 'react'

import LoadingText from 'components/common/Icons/LoadingText'
import LoadingLine from 'components/common/Icons/LoadingLine'

import styles from './styles'

const Loading = () => {

  return (
    <section className={styles.container}>
      <LoadingText />
      <LoadingLine />
    </section>
  )
}

export default Loading
