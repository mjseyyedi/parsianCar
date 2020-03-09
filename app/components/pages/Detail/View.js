import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import Img from 'components/common/Img'
import Input from 'components/common/Input'
import DatePicker from 'components/common/Datepicker'
import Button from 'components/common/Button'

import styles from './styles'


const CarDetail = ({isMobile, carDetail, getCarDetail}) => {

  const [source, setSource] = useState('')

  const {id} = useParams()
  const data = carDetail[id]

  const mainImage = data && data.car_images && data.car_images.length ? data.car_images[0].image : null
  const price = data && data.car_reserve_costs && data.car_reserve_costs.length ? data.car_reserve_costs[0]: null
  console.log(data)

  useEffect(() => {
      if (!data || !Object.keys(data).length) {
        getCarDetail(id)
      }
    }
    , [])

  return (
    <div className={styles.container}>
      <div className={styles.container__detail}>
        <div className={styles.container__images}>
          <Img src={mainImage} alt={data.name}/>
        </div>

        <div className={styles.container__fields}>
          <Input onInput={setSource} placeholder={'مبدا'} type={'text'}/>
          <span>
            تحویل خودرو در مقصد
          </span>
          <div>
            <Input type={'text'} placeholder={'تاریخ شروع'} disabled/>
            <Input type={'text'} placeholder={'تاریخ پایان'} disabled/>
          </div>
        </div>


        <div className={styles.container__price}>
          <span>
            {price && price.value ? price.value : 0}&nbsp;تومان
          </span>
          <span>
            ({price.name === 'daily' ? 'روزانه' : null})
          </span>
        </div>

        <div className={styles.container__action}>
          <Button type={'primary'}>
            رزرو کنید
          </Button>
        </div>

      </div>

      <div className={styles.container__info}>

      </div>
    </div>
  )
}

export default CarDetail
