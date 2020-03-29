import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import Input from 'components/common/Input'
import Button from 'components/common/Button'
import Img from 'components/common/Img'
import Arrow from 'components/common/Icons/Arrow'

import styles from './styles'

const Orders = ({history, userOrders, getUserFactors, ...props}) => {

  useEffect(() => {
    getUserFactors()
  }, [])


  return (
    <div className={styles.container}>
      <div className={styles.container__back} onClick={() => history.goBack()}>
        <Arrow rotation={'180deg'}/>
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
                +item.status === 2 ? <Button type={'primary'}>
                    پرداخت
                  </Button>
                  : <Button type={'primary'}>
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
