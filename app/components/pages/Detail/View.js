import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import Img from 'components/common/Img'
import Input from 'components/common/Input'
import DatePicker from 'components/common/Datepicker'
import Button from 'components/common/Button'
import HomeLand from 'components/common/Icons/HomeLand'

import styles from './styles'


const CarDetail = ({isMobile, carDetail, getCarDetail}) => {

  const [source, setSource] = useState('')
  const [activeTab, setActiveTab] = useState('gallery')

  const {id} = useParams()
  const data = carDetail[id]

  console.log(33333, data)
  const mainImage = data && data.car_images && data.car_images.length ? data.car_images[0].image : null
  const price = data && data.car_reserve_costs && data.car_reserve_costs.length ? data.car_reserve_costs[0] : null
  const station = data && data.car_stations && data.car_stations.length ? data.car_stations[0] : null
  const galleryImages = data && data.car_images ? data.car_images : []


  const tabs = [{key: 'gallery', value: 'گالری'},
    {key: 'comments', value: 'نظرات'},
    {key: 'policies', value: 'قوانین و مقررات'},
    {key: 'info', value: 'مشخصات خودرو'}]

  useEffect(() => {
      window.scrollTo(0, 0)
      if (!data || !Object.keys(data).length) {
        getCarDetail(id)
      }
    }
    , [])

  const TabContent = ({type = 'gallery'}) => {

    switch (type) {
      case 'gallery': {
        return <Gallery images={galleryImages}/>
      }
      case 'comments': {
        return <Comments/>
      }
      case 'policies': {
        return <Policies/>
      }
      case 'info': {

        return <Info/>
      }
    }

    console.log('$$$$$$$$$$$$$$$', type)

    return <div/>
  }

  const Gallery = ({images}) => {
    return <div className={styles.container__gallery}>
      {
        images && <div className={styles.container__firstRow}>
          {images.length > 0 && <div>
            <Img src={mainImage} alt={data.name}/>
          </div>}
          {
            images.length > 1 && <div>
              {images.slice(1, 3)
                .map((img, idx) => <Img src={img.image} alt={data.name + idx}/>)}
            </div>
          }
        </div>
      }
      {
        images && images.length > 3 && <div className={styles.container__others}>
          {images.slice(3, images.length + 1)}
        </div>
      }

    </div>
  }

  const Comments = () => {
      return <div>

      </div>
  }

  const Policies = () => {
    return <div>

    </div>
  }

  const Info = () => {
    return <div>

    </div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__detail}>
        <div className={styles.container__images}>
          <Img src={mainImage} alt={data ? data.name : ''}/>
        </div>

        <div className={styles.container__fields}>
          <Input onInput={setSource} placeholder={'مبدا'} type={'text'}/>
          <span>
            تحویل خودرو در مقصد
          </span>
          <div>
            {
              data && <React.Fragment>
                <Input type={'text'} placeholder={'تاریخ شروع'} disabled/>
                <Input type={'text'} placeholder={'تاریخ پایان'} disabled/>
              </React.Fragment>
            }

          </div>
        </div>


        <div className={styles.container__price}>
          <span>
            {price && price.value ? price.value : 0}&nbsp;تومان
          </span>
          <span>
            ({price && price.name === 'daily' ? 'روزانه' : null})
          </span>
        </div>

        <div className={styles.container__action}>
          <Button type={'primary'}>
            رزرو کنید
          </Button>
        </div>

      </div>

      <div className={styles.container__info}>
        <div className={styles.container__title}>
          <span>
            {data ? data.name : ''}
          </span>
          <span>
            {
              station ? <React.Fragment>
                <HomeLand/>
                {station.car_station_city}،&nbsp;
                {station.car_station_subcity}
              </React.Fragment> : null
            }

          </span>
        </div>
        <div className={styles.container__tabs}>
          {
            tabs.map(item => <div onClick={() => setActiveTab(item.key)}
                                  className={activeTab === item.key ? styles['container__tabs--active'] : ''}>
              {item.value}
            </div>)
          }
        </div>
        <div className={styles.container__tabContent}>
          <TabContent type={activeTab}/>
        </div>
      </div>
    </div>
  )
}

export default CarDetail
