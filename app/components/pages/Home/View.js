import React, {useState, useEffect, useRef} from 'react'
import Autocomplete from 'react-autocomplete'

import Button from 'components/common/Button';
import Img from 'components/common/Img';
import DatePicker from 'components/common/Datepicker';
import Logo from 'components/common/Icons/LoadingText'

import API from 'API'
import styles from './styles'

const Home = ({getFrontContent, isMobile, homeData, history, ...props}) => {

  const [source, setSource] = useState('')
  const [tempSource, setTempSource] = useState('')
  const [sourceList, setSourceList] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  useEffect(() =>{
    if(!homeData || !homeData.length){
      getFrontContent();
    }


    API.Stations()
      .then(response => {
        if (response.status) {
          setSourceList(response.data)
        }
      })
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
      <div className={`${styles.container__fields} ${isMobile ? 
        styles['container__fields--mobile'] :
        styles['container__fields--desk']}`}>
        <div className={styles.container__autoComplete}>
          <Autocomplete
            getItemValue={(item) => item.city}
            items={sourceList}
            shouldItemRender={(item, value) => (item.city.indexOf(value) > -1 || item.subCity.indexOf(value) > -1)}
            renderItem={(item, isHighlighted) =>
              <div style={{background: isHighlighted ? 'lightgray' : 'white'}}>
                {item.city} - {item.subCity}
              </div>
            }
            value={tempSource}
            inputProps={{placeholder: 'مبدا'}}
            onChange={(e) => {
              setTempSource(e.target.value)
              if (!e.target.value) {
                setSource(null)
              }
            }}
            onSelect={(val, item) => {
              setSource(item)
              setTempSource(`${item.city} - ${item.subCity}`)
            }}
          />
        </div>

          <div className={isMobile ?
            styles.container__mobileDate :
            styles.container__deskDate}>
            <DatePicker placeholder={'تاریخ شروع'} selectDate={setStartDate}/>
            <DatePicker placeholder={'تاریخ پایان'} selectDate={setEndDate}/>
          </div>

          <Button type={'primary'} onClick={() =>
            history.push(`/cars/all/all?start_date=${startDate || 
            ''}&end_date=${endDate || ''}&city=${source ? source.city : ''}&subCity=${source ? source.subCity : ''}`)}>
            جستجو کنید
          </Button>
      </div>
    </div>
  )
}

export default Home
