import React, {useState, useEffect} from 'react'
import {useQueryParams} from 'use-query-params'

import Button from 'components/common/Button'
import Arrow from 'components/common/Icons/Arrow'

import API from 'API'
import {Tools} from 'utils'
import styles from './styles'

const Factor = ({history, isMobile, setLoading, ...props}) => {

  const [insurance, setInsurance] = useState(null)
  const [paymentUrl, setPaymentUrl] = useState('')
  const [query] = useQueryParams({
    data: DataParam,
  })

  const {data} = query


  console.log(1111, data)
  useEffect(() => {
    let insure = data && data.factor_details
      ? data.factor_details.filter(item => item.name === 'insurance') : []
    if (insure && insure.length > 0) {
      insure = insure[0]
    }
    setInsurance(insure)
  }, [data])


  useEffect(() =>{
    if(paymentUrl){
      window.location.assign(paymentUrl)
    }
  } , [paymentUrl])

  function handlePayment() {
    const options = [];
    setLoading(true);
    if(data.factor_id){
      const factoreData = {factor_id: data.factor_id}
      API.CheckOutRequest({}, {data:factoreData})
        .then(response =>{
          console.log('!!!!!!!!!!!', response)
          setLoading(false)
          if(!response.status){
            props.addNotification('error', response.message || 'خطا در برقراری ارتباط با سرور')
          }
          else{
            const url = response.message
            window.location.assign(url/*.split('‬‬').join('').split('‫‪').join('')*/)
          }
        })
    }
    else{
      data.factor_details &&
      data.factor_details.forEach(item => options.push({name: item.name, price: item.price}))

      const paymentData = {
        "reserve": data.reserveId,
        "start_date": data.start_date,
        "end_date": data.end_date,
        "factor_details": options,
        "is_complete_pay":false,
        "origin": data.origin_id,
        'daily_cost': data.daily_cost
      }
      API.SubmitFactor('', {data: paymentData})
        .then(response =>{
          setLoading(false)
          if(response.status){
            const url = response.message
            setPaymentUrl(url)
          }
          else{
            props.addNotification('error', response.message || `خطا در برقراری ارتباط با سرور`)
          }
        })
    }


  }

  return (
    <div className={styles.container} style={{
      height: isMobile ?
        'var(--mobile-container-height)' : 'var(--container-height)',
      padding: isMobile ? '0 24px' : '76px 120px 0',
      '--title-font': isMobile ? '25px' : '40px',
      '--reserve-card-padding': isMobile ? '12px' : '36px 68px',
      '--reserve-direction': isMobile ? 'column' : 'row',
      '--price-direction': isMobile ? 'column' : 'row',
      '--price-align': isMobile ? 'flex-start' : 'center',
      '--price-border': isMobile ? 'none' : '1px solid #FFFFFF30',
    }}>
      {
        isMobile && <div className={styles.container__back} onClick={() => history.goBack()}>
          <Arrow rotation={'180deg'}/>
        </div>
      }
      <div className={/*!!(query && query.data) ? */ styles['container__data']
        /*: styles['container__no-result']*/}>
        {
          !!(query && query.data) ? <React.Fragment>
           <span>
          اطلاعات رزرو
        </span>
            <div className={styles.container__reserve} style={{
              '--reserve-first-box-size': !isMobile ? '60%' : '100%',
              '--reserve-second-box-size': !isMobile ? '40%' : '100%',
              '--row-padding-left': isMobile ? '0' : '48px'
            }}>
              <div>
                <div className={`${styles['container__reserve--row']}`}>
                 <span>
                   مبدا
                 </span>
                  <div>{data.origin}</div>
                </div>
                <div className={styles['container__reserve--row']} style={{
                  height: 'auto',
                  marginBottom: 0,
                  '--row-div-width': isMobile ? '60%' : '70%'
                }}>
                  {
                    isMobile ?
                      <section className={styles['container__reserve--row-mobile']}>
                        <div>
                          <span>
                            تاریخ تحویل
                          </span>
                          <div>
                            {data.start_date ? data.start_date.split('-').join('/') : ''}
                          </div>
                        </div>

                        <div>
                          <span>
                             تاریخ بازگشت
                          </span>
                          <div>
                            {data.end_date ? data.end_date.split('-').join('/') : ''}
                          </div>
                        </div>
                      </section>
                      : <section>
                     <span>
                       تاریخ تحویل
                     </span>
                        <div>
                          <div>
                            {data.start_date ? data.start_date.split('-').join('/') : ''}
                          </div>
                          <span>
                         تاریخ بازگشت
                       </span>
                          <div>
                            {data.end_date ? data.end_date.split('-').join('/') : ''}
                          </div>
                        </div>
                      </section>
                  }

                </div>
              </div>
              <div>
                <div className={`${styles['container__reserve--row']} ${styles['container__reserve--margin']}`}>
                  <span>
                    خودرو
                  </span>
                  <div>
                    {data.car_name}
                  </div>
                </div>
                <div className={`${styles['container__reserve--row']} ${styles['container__reserve--margin']}`}>
                  <span>
                    راننده
                  </span>
                  <div>
                    {data.car_driver}
                  </div>
                </div>
                <div className={`${styles['container__reserve--row']} ${styles['container__reserve--margin']}`}>
                  <span>
                    بیمه
                  </span>
                  <div>
                    {insurance ? insurance.fa_name : ''}
                  </div>
                </div>
              </div>
            </div>
            <span>
              <span>
               محاسبه قیمت
              </span>
              <span>
                تمامی قیمت ها به تومان است.
              </span>
            </span>

            <div className={styles.container__prices}>
              {
                data.factor_details && Object.values(data.factor_details)
                  .map(item => {
                    return <div>
                    <span>
                      {item.name !== 'insurance' ? item.fa_name : 'بیمه'}
                    </span>
                      <span>
                        {item.name !== 'insurance' ? item.days + ` روز ` : item.fa_name}&nbsp;
                      </span>
                      <span>
                        {item.price ? Tools.formatPrice(item.price) : `رایگان`}
                      </span>
                    </div>
                  })
              }
            </div>

            <div className={styles.container__totalPrice} style={{
              '--price-container-height': isMobile ? 'auto' : '98px',
              '--price-cell-width': isMobile ? '100%' : '50%',
              '--price-font-size': isMobile ? '18px' : '30px',
            }
            }>
              <div>
                <span>
                  مبلغ کل
                </span>
                <span>
                  {data.total_pay ? Tools.formatPrice(data.total_pay) : `رایگان`}
                </span>
              </div>

              <div>
                <span>
                  قابل پرداخت
                </span>
                <span>
                  {data.payable_amount ? Tools.formatPrice(data.payable_amount) : `رایگان`}
                </span>
              </div>
            </div>
            <div className={styles.container__action}>
              <span>
                20% از مبلغ نهایی فاکتور بصورت پیش پرداخت قابل پرداخت می باشد
              </span>
              {
                (!data.status || +data.status === 2) && <Button
                onClick={handlePayment}
                  type={'primary'}>
                  پرداخت
                </Button>
              }

            </div>
          </React.Fragment> : <span>
           نتیجه ای یافت نشد
         </span>
        }
      </div>

    </div>
  )
}

const DataParam = {
  encode: sortObj => {
    const key = Object.keys(sortObj)[0]
    return sortObj[key].name ? `${[key]}:${sortObj[key].name}` : null
  },
  decode: dataString => {
    return JSON.parse(dataString)
  },
}

export default Factor
