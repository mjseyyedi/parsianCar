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

  const [startDatePickerRef, setStartRef] = useState(null)
  const [endDatePickerRef, setEndRef] = useState(null)

  useEffect(() =>{
    (!homeData || !homeData.length) && getFrontContent()
  } , [])


  const background = homeData && homeData.filter(item => item.name === 'background')

  console.log(startDate, endDate)

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
          <div className={styles.container__dateContainer} onClick={() => {
            !(startDatePickerRef.state.isOpenModal) && startDatePickerRef.toggleModalOpen();
            setStartRef(state => ({...state}))
          }}>
            <Input type={'text'} placeholder={'تاریخ شروع'} initialValue={startDate} disabled/>
            <Datepicker label={'تاریخ شروع'}
                        id={'startDate'}
                        value={startDate}
                        setRef={el => setStartRef(el)}
                        className={styles.container__startDate}
                        selectDate={setStartDate}/>
          </div>
        <div className={styles.container__dateContainer} onClick={() => {
          !(endDatePickerRef.state.isOpenModal) && endDatePickerRef.toggleModalOpen()
          setEndRef(state => ({...state}))
        }}>
          <Input type={'text'} placeholder={'تاریخ پایان'} initialValue={endDate} disabled/>
          <Datepicker label={'تاریخ پایان'}
                      id={'endDate'}
                      value={endDate}
                      setRef={el => setEndRef(el)}
                      className={styles.container__endDate}
                      selectDate={setEndDate}/>
        </div>

          <Button type={'primary'} onClick={() => history.push(`/cars/all/?start_date=${startDate}&end_date=${endDate}&city=${source}`)}>
            جستجو کنید
          </Button>
      </div>
    </div>
  )
}

export default Home
