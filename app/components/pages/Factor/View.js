import React, {useState, useEffect} from 'react'
import {ObjectParam, useQueryParams} from 'use-query-params'

import Input from 'components/common/Input'
import Button from 'components/common/Button'
import Img from 'components/common/Img'
import Arrow from 'components/common/Icons/Arrow'

import styles from './styles'

const Factor = ({history, isMobile, ...props}) => {

  const [insurance, setInsurance] = useState(null)
  const [query] = useQueryParams({
    data: DataParam,
  })

  const {data} = query

  useEffect(() => {
    let insure = data && data.factor_details
      ? data.factor_details.filter(item => item.name === 'insurance') : []

    if (insure && insure.length > 0) {
      insure = insure[0]
    }

    setInsurance(insure)

  }, [data])

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
                        {item.price}
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
                  {data.total_pay}
                </span>
              </div>

              <div>
                <span>
                  قابل پرداخت
                </span>
                <span>
                  {Math.floor(data.total_pay * 20 / 100)}
                </span>
              </div>
            </div>
            <div className={styles.container__action}>
              <span>
                20% از مبلغ نهایی فاکتور بصورت پیش پرداخت قابل پرداخت می باشد
              </span>
              {
                +data.status === 2 && <Button type={'primary'}>
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
