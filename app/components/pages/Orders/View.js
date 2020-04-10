import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import Input from 'components/common/Input'
import Button from 'components/common/Button'
import Img from 'components/common/Img'
import Arrow from 'components/common/Icons/Arrow'

import styles from './styles'
import API from 'API'

const Orders = ({history, userOrders, getUserFactors, ...props}) => {

  useEffect(() => {
    getUserFactors();


    if(history.location.search && history.location.search.includes('status')){
      if(history.location.search.includes('success')){
        props.addNotification('success', 'پرداخت شما با موفقیت انجام شده و سفارش شما ثبت شد')
      }
      else{
        props.addNotification('error', 'پرداخت شما با خطا مواجه شده است')
      }
    }
  }, [])

  function handlePayment(item) {
    props.setLoading(true)
    const data = {factor_id: item.factor_id}
    API.CheckOutRequest({}, {data})
      .then(response =>{
        props.setLoading(false)
        if(!response.status){
          props.addNotification('error', response.message || 'خطا در برقراری ارتباط با سرور')
        }
        else{
          const url = response.data.url_redirect
          window.location.assign(url.split('‬‬').join('').split('‫‪').join(''))
        }
      })
  }

  return (
    <div className={styles.container}>

      <div className={styles.container__back} onClick={() => history.goBack()}>
        {
          !(history.location.search && history.location.search.includes('status')) &&
          <Arrow rotation={'180deg'}/>

        }
      </div>
      <span>
        سفارش های من
      </span>
      <div className={styles.container__content}>
        {
          userOrders && userOrders.user_factors && userOrders.user_factors.length ?
            userOrders.user_factors.map(item => <div className={styles['container__content--row']}>
              <div>
                <Img src={`https://backend.parsicar.ir${item.car_image}`} alt={item.car_name}/>
                <div>
                  <span>{item.car_name}</span>
                  <span>{item.start_date}</span>
                </div>
                <Arrow/>
              </div>
              <Link to={`/profile/factor?data=${JSON.stringify(item)}`}>
                نمایش فاکتور
              </Link>
              {
                +item.status === 2 ? <Button type={'primary'} onClick={() => handlePayment(item)}>
                    پرداخت
                  </Button>
                  : <Button type={'primary'} onClick={() => history.push(`/cars/detail/${item.car_id}`)}>
                    رزرو دوباره
                  </Button>
              }

            </div>)
            :
            <span>
              نتیجه ای یافت نشد
            </span>
        }
      </div>
    </div>
  )
}

export default Orders
