import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ImageGallery from 'react-image-gallery'

import Img from 'components/common/Img'
import Input from 'components/common/Input'
import DatePicker from 'components/common/Datepicker'
import Button from 'components/common/Button'
import CommentItem from 'components/common/Comment'

import CarSeat from 'components/common/Icons/CarSeat'
import Driver from 'components/common/Icons/Driver'
import Traffic from 'components/common/Icons/Traffic'
import Insurance from 'components/common/Icons/Insurance'
import Comment from 'components/common/Icons/Comment'
import Star from 'components/common/Icons/Star'

import styles from './styles.mobile'

const CarDetail = ({isMobile, carDetail, getCarDetail}) => {
  const {id} = useParams()

  const [activeTab, setActiveTab] = useState('order')
  const [city, setCity] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  if(carDetail && carDetail[id]){
    var data = carDetail[id]
    var {car_images, car_reserve_costs, car_votes, car_comments, car_options} = data
    var insurance = car_options && car_options.filter(item => item.name === 'insurance')
  }

  let mainImage = car_images && car_images.filter(item => item.is_index)
  mainImage = mainImage && mainImage.length ? mainImage[0] : null

  const tabs = [
    {key: 'order', value: 'سفارش'},
    {key: 'gallery', value: 'گالری'},
    {key: 'comments', value: 'نظرات'}
  ]


  useEffect(() => {
      window.scrollTo(0, 0)
      if (!data || !Object.keys(data).length) {
        getCarDetail(id)
      }
    }
    , [])

  function Order(options) {
    return <section className={styles.container__order}>
          <div className={styles.container__fields}>
            <Input type={'text'} placeholder={'مبدا'} onInput={city => {
              setCity(city)
            }}/>
            <span>
              تحویل خودرو در مقصد
            </span>
            <div className={styles.container__date}>
                <DatePicker placeholder={'تاریخ شروع'} selectDate={startDate => {
                  setStartDate(startDate)
                }}/>
                <DatePicker placeholder={'تاریخ پایان'} selectDate={date =>{
                  setEndDate(date)
                }}/>
            </div>
            <div className={styles.container__options}>
              {options && options.filter(item => item.name !== 'insurance').map(option => <div>
                <Img src={option.icon} alt={option.name}/>
                <span>
                  {option.fa_name}
                </span>
              </div>)}
            </div>

            {
              !!(insurance && insurance.length) && <div className={styles.container__insurance}>
                {insurance.map(item => <div>
                  <Insurance />
                  <span>
                    {item.fa_name}
                  </span>
                </div>)}
              </div>
            }
          </div>
    </section>
  }

  function Gallery (images){
    return <div className={styles.container__gallery}>
      {
        !!(images && images.length) && <div>
          <Img src={images[0].image} alt={data ? data.name : ''} />
        </div>
      }
      {
        !!(images && images.length > 1) && <div>
          {images
            .slice(1, images.length)
            .map(item => <div style={{backgroundImage: `url(${item.image})`}}/>)}
        </div>
      }
    </div>

  }

  function Comments (comments){
    return <div className={styles.container__commentItems}>
      {
        comments.map(comment => <CommentItem {...comment} />)
      }
    </div>
  }



  return (
    <div className={styles.container}>
      <div className={styles.container__photo}>
        {!!(mainImage) && <Img src={mainImage.image}/>}
      </div>

      <div className={styles.container__price}>
        <div>
          {car_reserve_costs &&
            car_reserve_costs.length &&
          <React.Fragment>
          <span>
            {car_reserve_costs[0].value}&nbsp;
            تومان&nbsp;
          </span>
            <span>
            ({car_reserve_costs[0].name === 'daily' ? 'روزانه' : 'ماهانه'})
          </span>
          </React.Fragment>
          }
        </div>

        <div className={styles.container__comments}>
            <span>
              {!!(car_votes && car_votes.length) && <React.Fragment>
                {car_votes[0].vote}&nbsp;
                <Star />
              </React.Fragment>}
            </span>
          <span>
              {
                !!(car_comments && car_comments.length) && <React.Fragment>
                  {car_comments.length}&nbsp;
                  <Comment />
                </React.Fragment>
              }
           </span>
        </div>

      </div>

      <div className={styles.container__tabs}>
        {tabs.map(item => <div onClick={() => setActiveTab(item.key)}
                               className={activeTab === item.key ? styles['container__tabs--active'] : ''}>
          {item.value}
        </div>)}
      </div>

      <div className={styles.container__tabContent}>
        {
          activeTab === 'order' ? Order(car_options) :
            activeTab === 'gallery' ? Gallery(car_images) :
              !!(car_comments && car_comments.length) && Comments(car_comments)
        }
      </div>
      <div className={styles.container__submitOrder}>
        <Button type={'primary'}>
          ثبت سفارش
        </Button>
      </div>

    </div>
  )
}

export default CarDetail
