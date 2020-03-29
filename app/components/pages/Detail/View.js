import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ImageGallery from 'react-image-gallery';

import Img from 'components/common/Img'
import Input from 'components/common/Input'
import Datepicker from 'components/common/Datepicker'
import Button from 'components/common/Button'
import Modal from 'components/common/Modal'
import Comment from 'components/common/Comment'

import HomeLand from 'components/common/Icons/HomeLand'
import Insurance from 'components/common/Icons/Insurance'
import Arrow from 'components/common/Icons/Arrow'

import styles from './styles'
import './slider'

const CarDetail = ({isMobile, carDetail, getCarDetail}) => {

  const [source, setSource] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [activeTab, setActiveTab] = useState('gallery')
  const [modalState, setModalState] = useState(false)
  const [startImageIndex, setSImgIndex] = useState(null)
  const [startDatePickerRef, setStartRef] = useState(null)
  const [endDatePickerRef, setEndRef] = useState(null)

  const {id} = useParams()
  const data = carDetail[id]

  let mainImage = data && data.car_images && data.car_images.length ? data.car_images.filter(item => item.is_index) : null
  mainImage = mainImage && mainImage.length > 0 ? mainImage[0].image : null
  const price = data && data.car_reserve_costs && data.car_reserve_costs.length ? data.car_reserve_costs[0] : null
  const station = data && data.car_stations && data.car_stations.length ? data.car_stations[0] : null
  const galleryImages = data && data.car_images ? data.car_images : []
  const options = data && data.car_options ? data.car_options : []

  const images = [];

  galleryImages.forEach(item => images.push({original: item.image, thumbnail: item.image}))

  const tabs = [{key: 'gallery', value: 'گالری'},
    {key: 'comments', value: 'نظرات'},
    {key: 'policies', value: 'قوانین و مقررات'}/*,
    {key: 'info', value: 'مشخصات خودرو'}*/]

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
        return <Comments comments={data.car_comments}/>
      }
      case 'policies': {
        return <Policies/>
      }
      case 'info': {

        return <Info/>
      }
    }

    return <div/>
  }

  const Gallery = ({images}) => {
    return <div className={styles.container__gallery}>
      {
        images && <div className={styles.container__firstRow}>
          {images.length > 0 && <div onClick={() => {
            setSImgIndex(1)
            setModalState(true)
          }}>
            <Img src={images[0].image} alt={data.name}/>
          </div>}
          {
            images.length > 1 && <div>
              {images.slice(1, 3)
                .map((img, idx) => <Img src={img.image}
                                        onClick={() => {
                                          setModalState(true)
                                          setSImgIndex((idx + 1) + 1)
                                        }}
                                        alt={data.name + idx}/>)}
            </div>
          }
        </div>
      }
      {
        images && images.length > 3 && <div className={styles.container__others}>
          {images.slice(3, images.length)
            .map((img, idx) => <div>
              <Img src={img.image}
                   onClick={() => {
                     setModalState(true)
                     setSImgIndex((idx + 1) + 3)
                   }}
                   alt={data.name + idx}/>
            </div>)
          }
        </div>
      }

    </div>
  }

  const Comments = ({comments}) => {
    return <div className={styles.container__comments}>
      {comments && comments.length ?
        comments.map(comment => <Comment {...comment}/>)
        : <div className={styles['container__comments--no-result']}>
          نظری یافت نشد
        </div>
      }
    </div>
  }

  const Policies = () => {
    return <div className={styles.container__policies}>
      <h1>
        شرایط و مدارک
      </h1>
      <h2>
        شرایط رنت ماشین از تشریفات خودرو پارسی برای همراهان ایرانی
      </h2>

      <h3>
        1- تکمیل فرم مشخصات اشخاص حقیقی وحقوقی
      </h3>

      <h3>
        2- ودیعه نقدی
        <p>
          یکی از شرایط ضروری در اجاره ماشین ودیعه نقدی می باشد، این مبلغ بابت تضمین سلامت ظاهری خودرو و ضمانت جرائم احتمالی از مشتری اخذ می گردد، تا مشتری رنت را، نسب به رانندگی با احتیاط ملزم سازد. این مبلغ 10% فرانشیز بیمه بدنه خودرو میباشد.
          لازم بذکر است مبلغ ودیعه  در مورد مشتریان ماهیانه باتوجه به شرایط مشتری می تواند متغیر باشد.
        </p>
      </h3>
      <h3>
        3- وثیقه
        <p>
          یکی از موارد زیر برای عقد قرار داد رنت الزامی است
          • چک
          • سندملکی
          • جوازکسب
          که این موارد بر حسب شرایط مشتری قابل تغییر است.
          این سهولت انتخاب به سبب این که مشتری بتواند خودرو مورد علاقه اش را رنت کند، صورت گرفته است.
          شرکت های رنت خودرو این تضامین را از مشتریان خود به جهت برگشت خودرواجاره ای از طرف مستاجر دریافت می کنند.
          البته بعضی از مشتریان هیچکدام از مدارک فوق را ندارند که کمی شرایط سخت تر می گردد، اما همچنان  راهی برای انکه شما از اجاره خودرو جانمانید وجود دارد که می توانید آنارا در قسمت خدمات ویژه اجاره خودرو دنبال نماید.
        </p>
      </h3>

      <h2>
        شرایط رنت ماشین از تشریفات خودرو پارسی برای میهمانان خارجی
      </h2>
      <h3>
        1. تکمیل فرم مشخصات اشخاص حقیقی وحقوقی
      </h3>
      <h3>
        2. پرداخت هزینه رنت ماشین به صورت نقدی و یا از طریق کارتهای عضو شتاب
      </h3>
      <h3>
        3. ارائه وجه نقد بابت عودت خودرو و ضمانت جرائم احتمالی
      </h3>

      <h1>
        قوانین
      </h1>
      <h2>
        نکاتی که در زمان اجاره خودرو از تشریفات خودرو پارسی بایستی بدانید
      </h2>

      <h3>
        1. حداقل مدت رنت ماشین سه  روز می باشد
      </h3>
      <h3>
        2.  مسافت مجاز حرکت خودروها برای هر روز ۲۵۰ کیلومتر می باشد
      </h3>
      <h3>
        3. هزینه سوخت به عهده مشتری می باشد (ماشین با باک پرتحویل مشتری داده خواهد شد و با باک پر تحویل گرفته خواهد شد در صورت خالی بودن باک هزینه از ودیعه کسر خواهد شد)
      </h3>
      <h3>
        4.  در صورت عدم تخلف رانندگی حداکثر به مدت ۳۰ روز کاری پس از تحویل خودرو، مبلغ مربوطه بابت جرایم احتمالی به حساب اعلام شده عودت داده خواهد شد.
      </h3>
      <h3>
        5.  مشتـری می تواند خودرو را در یک ایستگـاه تحویل گرفته و در ایستگـاه دیگر تحویل دهد که مشمـول هزینه می گردد، همچنین تحویل و عودت خودرو در محل مشتری یا فرودگاه شامل هزینه تحویل می گردد.
      </h3>


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
          <div className={styles.container__date}>
            {
              data && <React.Fragment>
                  <Datepicker placeholder={'تاریخ شروع'}
                              selectDate={setStartDate}/>
                  <Datepicker placeholder={'تاریخ پایان'}
                              selectDate={setEndDate}/>
              </React.Fragment>
            }

          </div>
        </div>

        <div className={styles.container__options}>
          {options && options.filter(item => item.name !== 'insurance').map(option => <div>
            <Img src={option.icon} alt={option.name}/>
            <span>
              {option.fa_name}
            </span>
          </div>)}
        </div>

        <div className={styles.container__insurance}>
          {options && options.filter(item => item.name === 'insurance').map(option => <div>
            <Insurance />
            <span>
              {option.fa_name}
            </span>
          </div>)}
        </div>

        <div className={styles.container__price}>
          <span>
            {price && price.value ? price.value : 0}&nbsp;تومان
          </span>
          <span>
            ({price && price.name === 'daily' ? 'روزانه' : 'ماهانه'})
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
                                  className={activeTab === item.key ? styles['container__tabs--active'] :
                                    styles['container__tabs--inactive']}>
              {item.value}
            </div>)
          }
        </div>
        <div className={styles.container__tabContent}>
          <TabContent type={activeTab}/>
        </div>
      </div>


      {
        typeof window !== 'undefined' ? <Modal isOpen={modalState}
                                               closeModal={() => {
                                                 setModalState(false)
                                                 setTimeout(() =>{
                                                   setSImgIndex(null)
                                                 } , 700)
                                               }}>
          {
            !!(startImageIndex) && <ImageGallery isRTL
                                             showBullets={false}
                                             disableThumbnailScroll={false}
                                             autoPlay={false}
                                             showThumbnails={false}
                                             showFullscreenButton={false}
                                             showPlayButton={false}
                                             startIndex={startImageIndex - 1}
                                             swipingTransitionDuration={650}
                                             items={images} />
          }

        </Modal> : <div />
      }

    </div>
  )
}

export default CarDetail
