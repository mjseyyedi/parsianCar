import React, {useState, useEffect} from 'react'

import Input from 'components/common/Input'
import Button from 'components/common/Button'
import CarCard from 'components/common/CarCard'
import Brand from 'components/common/BrandCard'
import Arrow from 'components/common/Icons/Arrow'

import styles from './styles'

const PAGE_SIZE = 5

const Cars = ({isMobile, getCarsList, carsList, getBrandsList, brands}) => {

  const [page, setPage] = useState(1)

  const totalPage = Math.ceil(carsList.length / PAGE_SIZE)

  useEffect(() => {
    // getCarsList()
    // getBrandsList()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.container__brands}>
        {brands &&
        brands
          .map(item => <div>
            <Brand {...item}/>
          </div>)}
      </div>

      <div className={styles.container__cars}>
          <span>
            خودرو خود را انتخاب کنید
          </span>
        <div className={styles.container__content}>
          {carsList && carsList
            .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
            .map((car, idx) => <CarCard {...car} hasBorder={(idx + 1) % 3}/>)}
        </div>
        {
          carsList.length > PAGE_SIZE && <div className={styles.container__paging}>
            {
              page === totalPage && <div style={{marginLeft: '8px'}} onClick={() => setPage(state => state - 1 )}>
                <Arrow rotation={'180deg'}/>
              </div>
            }
            <span>
            صفحه {page} از  {totalPage}
            </span>
            {
              page !== totalPage && <div onClick={() => setPage(state => state + 1 )}>
                <Arrow/>
              </div>
            }

          </div>
        }
      </div>

    </div>
  )
}

export default Cars
