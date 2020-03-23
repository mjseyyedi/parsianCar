import React, {useState, useEffect, useRef} from 'react'

import Input from 'components/common/Input';
import Button from 'components/common/Button';
import Img from 'components/common/Img';
import DatePicker from 'components/common/Datepicker';
import Logo from 'components/common/Icons/LoadingText'
import styles from './styles'

const Home = ({getFrontContent, isMobile, homeData, history, ...props}) => {

  const [source, setSource] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  useEffect(() =>{
    (!homeData || !homeData.length) && getFrontContent()
  } , [])


  const background = homeData && homeData.filter(item => item.name === 'background')

  return (
    <div className={styles.container} style={{height : isMobile ? 'var(--mobile-container-height)' : 'var(--container-height)'}}>
      <div className={!isMobile ? styles.container__middle : styles.container__mobileMiddle}>
        {
          !!isMobile &&
          <div className={styles.container__logo}>
            <Logo width={282} height={18} fill={'#141E30'}/>
          </div>
        }
        {
          background && background.length > 0 ? <div className={isMobile ? styles.container__mobileImage
            :styles.container__image}>
            <Img src={background[0] ? background[0].placeholder_background.image : null} />
          </div>  : null
        }
      </div>
      <div className={`${styles.container__fields} ${isMobile ? styles['container__fields--mobile'] : styles['container__fields--desk']}`}>
          <Input placeholder={'مبدا'} type={'text'} onInput={setSource}/>
          <div className={isMobile ? styles.container__mobileDate : styles.container__deskDate}>
            <DatePicker placeholder={'تاریخ شروع'} selectDate={setStartDate}/>
            <DatePicker placeholder={'تاریخ پایان'} selectDate={setEndDate}/>
          </div>

          <Button type={'primary'} onClick={() => history.push(`/cars/all/all?start_date=${startDate}&end_date=${endDate}&city=${source}`)}>
            جستجو کنید
          </Button>
      </div>
    </div>
  )
}

export default Home
