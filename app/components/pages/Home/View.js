import React, {useState, useEffect, useRef} from 'react'
import 'moment';
import moment from 'moment-jalaali';

import Input from 'components/common/Input';
import Button from 'components/common/Button';
import Img from 'components/common/Img';
import Datepicker from 'components/common/Datepicker';

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
    <div className={styles.container}>
      <div className={styles.container__middle}>
        {
          background && background.length > 0 ? <div className={styles.container__image}>
            <Img src={background[0] ? background[0].placeholder_background.image : null} />
          </div>  : null
        }
      </div>
      <div className={styles.container__fields}>
          <Input placeholder={'مبدا'} type={'text'} onInput={setSource}/>
          <Datepicker label={'تاریخ شروع'}
                      id={'startDate'}
                      value={startDate}
                      className={styles.container__startDate}
                      selectDate={val => setStartDate(moment(val).format('jYYYY/jM/jD'))}/>
          <Datepicker label={'تاریخ پایان'}
                      id={'endDate'}
                      value={endDate}
                      className={styles.container__endDate}
                      selectDate={val => setEndDate(moment(val).format('jYYYY/jM/jD'))}/>
          <Button type={'primary'} onClick={() => history.push(`/cars/all/source/${source}/startDate/${startDate}/endDate/${endDate}`)}>
            جستجو کنید
          </Button>
      </div>
    </div>
  )
}

export default Home
