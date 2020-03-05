import React, {useState, useEffect} from 'react'

import Input from 'components/common/Input';
import Button from 'components/common/Button';

import styles from './styles'

const Home = ({getFrontContent, isMobile, ...props}) => {

  useEffect(() =>{
    getFrontContent()
  } , [])

  return (
    <div className={styles.container}>
      <div className={styles.container__middle}>
wqeqwewqe
      </div>
    </div>
  )
}

export default Home
