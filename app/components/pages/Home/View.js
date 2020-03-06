import React, {useState, useEffect} from 'react'

import Input from 'components/common/Input';
import Button from 'components/common/Button';
import Img from 'components/common/Img';

import styles from './styles'

const Home = ({getFrontContent, isMobile, homeData, ...props}) => {

  useEffect(() =>{
    getFrontContent()
  } , [])

  const background = homeData && homeData.filter(item => item.name === 'background')

  return (
    <div className={styles.container}>
      <div className={styles.container__middle}>
        {
          background && background.length > 0 ? <div className={styles.container__image}>
            <Img src={background[0] ? background[0].placeholder_background.image : null} />
          </div>  : null
        }
      </div>
      <div className={styles.container__fields}>
          <Input placeholder={'مبدا'} type={'text'} disabled/>
          <Input placeholder={'تاریخ شروع'} disabled/>
          <Input placeholder={'تاریخ پایان'} disabled />
          <Button type={'primary'} >
            جستجو کنید
          </Button>
      </div>
    </div>
  )
}

export default Home
