import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
import Autocomplete from 'react-autocomplete'

import Img from 'components/common/Img'
import Input from 'components/common/Input'
import DatePicker from 'components/common/Datepicker'
import Button from 'components/common/Button'
import CommentItem from 'components/common/Comment'
import PromptModal from 'components/common/PromptModal'

import Insurance from 'components/common/Icons/Insurance'
import Comment from 'components/common/Icons/Comment'
import Star from 'components/common/Icons/Star'

import API from 'API'
import {Tools} from 'utils'

import styles from './styles.mobile'

const CarDetail = ({setLoading, carDetail, getCarDetail, history,...props}) => {
  const {id} = useParams()

  const [activeTab, setActiveTab] = useState('order')
  const [source, setSource] = useState('')
  const [tempSource, setTempSource] = useState('')
  const [sourceList, setSourceList] = useState([])
  const [activeInsurance, setActiveInsurance] = useState(null)
  const [insuranceModal, setInsuranceModal] = useState(false)
  const [temporaryInsurance, setTempInsurance] = useState(null)
  const [activeOptions, setActiveOptions] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  if (carDetail && carDetail[id]) {
    var data = carDetail[id]
    var {car_images, car_reserve_costs, car_votes, car_comments, car_options} = data
    var insurance = car_options && car_options.filter(item => item.name === 'insurance')
  }

  let mainImage = car_images && car_images.filter(item => item.is_index)
  mainImage = mainImage && mainImage.length ? mainImage[0] : null
  const reserveDetail = data && data.car_reserve_detail ? data.car_reserve_detail : null
  const price = data && data.car_reserve_costs && data.car_reserve_costs.length ? data.car_reserve_costs[0] : null

  const tabs = [
    {key: 'order', value: 'سفارش'},
    {key: 'gallery', value: 'گالری'},
    {key: 'comments', value: 'نظرات'},
  ]


  useEffect(() => {
    window.scrollTo(0, 0)
    if (!data || !Object.keys(data).length) {
      getCarDetail(id)
    }
    API.Stations()
      .then(response => {
        if (response.status) {
          setSourceList(response.data)
        }
      })
  }, [])

  function handleSelectOption(option) {
    const options = Object.assign([], activeOptions)

    if (activeOptions.includes(option)) {
      const index = options.findIndex(item => item.name === option.name)
      if (index !== -1) {
        options.splice(index, 1)
        setActiveOptions([...options])
      }
    } else {
      options.push(option)
      setActiveOptions([...options])
    }
  }

  function selectInsurance(item) {

    if (activeInsurance && activeInsurance.fa_name === item.fa_name) {
      setActiveInsurance(null)
    } else if (item.message_golden_insurance) {
      setTempInsurance(item)
      setTimeout(() => {
        setInsuranceModal(true)
      }, 0)
    }
    else{
      setActiveInsurance(item)
    }
  }

  function handleSelectInsurance() {
    setInsuranceModal(false)
    setActiveInsurance(temporaryInsurance)
    setTimeout(() => {
      setTempInsurance(null)
    }, 350)
  }

  function Order(options) {
    return <section className={styles.container__order}>
      <div className={`${styles.container__fields} }`}>
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

        <span>
              تحویل خودرو در مقصد
            </span>
        <div className={styles.container__date}>
          <DatePicker placeholder={'تاریخ شروع'} selectDate={startDate => {
            setStartDate(startDate)
          }}/>
          <DatePicker placeholder={'تاریخ پایان'} selectDate={date => {
            setEndDate(date)
          }}/>
        </div>
        <div className={styles.container__options}>
          {options && options
            .filter(item => item.name !== 'insurance')
            .map(option =>
              <div onClick={() => handleSelectOption(option)}
                   className={(activeOptions.includes(option)) &&
                   styles['container__options--active']}>
                <Img src={option.icon} alt={option.name}/>
                <span>
                  {option.fa_name}
                </span>
              </div>)}
        </div>

        {
          !!(insurance && insurance.length) &&
          <div className={styles.container__insurance}>
            {insurance.map(item =>
              <div onClick={() => selectInsurance(item)}
                   className={(activeInsurance && activeInsurance.fa_name === item.fa_name) &&
                   styles['container__insurance--active']}>
                <Insurance/>
                <span>
                    {item.fa_name}
                  </span>
              </div>)}
          </div>
        }
      </div>
    </section>
  }

  function Gallery(images) {
    return <div className={styles.container__gallery}>
      {
        !!(images && images.length) && <div>
          <Img src={images[0].image} alt={data ? data.name : ''}/>
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

  function Comments(comments) {
    return <div className={styles.container__commentItems}>
      {
        comments.map(comment => <CommentItem {...comment} />)
      }
    </div>
  }

  function reserveCar() {
    if (!source) {
      props.addNotification('warning', 'لطفا مبدا حرکت خود را وارد کنید')
    } else if (!startDate || !endDate) {
      props.addNotification('warning', 'لطفا تاریخ شروع و پایان را انتخاب کنید')
    } else {
      setLoading(true);
      // const data = {
      //   'reserve': reserveDetail.id,
      //   'start_date': Tools.toEnglishDigits(startDate),
      //   'end_date': Tools.toEnglishDigits(endDate),
      //   'factor_details': activeOptions.concat(activeInsurance|| []),
      //   'daily_cost': price.value,
      //   'origin': source.id,
      // }
      // API.ProcessFactor('', {data})
      //   .then(response => {
      //     if(response.status){
      //       setLoading(false);
      //       const data = {...response.data, ...response.data.user_factors,
      //         reserveId:reserveDetail.id, daily_cost: price.value}
      //       delete data['user_factors']
      //       console.log('********************', data)
      //       history.push(`/checkout?data=${JSON.stringify(data)}`)
      //     }
      //   })
      API.CheckCarExist('', {
        data:
          {
            car_id: id,
            start_date: Tools.toEnglishDigits(startDate),
            end_date: Tools.toEnglishDigits(endDate),
          },
      })
        .then(result => {
          if (result.status) {
            setLoading(false);
            props.addNotification('warning', result.message)
          } else {
            const data = {
              'reserve': reserveDetail.id,
              'start_date': Tools.toEnglishDigits(startDate),
              'end_date': Tools.toEnglishDigits(endDate),
              'factor_details': activeOptions.concat(activeInsurance|| []),
              'daily_cost': price.value,
              'origin': source.id,
            }
            API.ProcessFactor('', {data})
              .then(response => {
                if(response.status){
                  setLoading(false);
                  const data = {...response.data, ...response.data.user_factors,
                    reserveId:reserveDetail.id, daily_cost: price.value}
                  delete data['user_factors']
                  console.log('********************', data)
                  history.push(`/checkout?data=${JSON.stringify(data)}`)
                }
              })
          }
        })
    }

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
                <Star/>
              </React.Fragment>}
            </span>
          <span>
              {
                !!(car_comments && car_comments.length) && <React.Fragment>
                  {car_comments.length}&nbsp;
                  <Comment/>
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
        <Button type={'primary'} onClick={reserveCar}>
          ثبت سفارش
        </Button>
      </div>
      {
        temporaryInsurance && <PromptModal isOpen={insuranceModal}
                                           text={temporaryInsurance.message_golden_insurance}
                                           confirmButton={{text: 'بله', action: handleSelectInsurance}}
                                           denyButton={{text: 'لغو'}}
                                           close={() => setInsuranceModal(false)}/>

      }

    </div>
  )
}

export default CarDetail
