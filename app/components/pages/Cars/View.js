import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useQueryParams, StringParam} from 'use-query-params'

import CarCard from 'components/common/CarCard'
import Brand from 'components/common/BrandCard'
import Arrow from 'components/common/Icons/Arrow'

import styles from './styles'

const PAGE_SIZE = 5

const Cars = ({
                isMobile, getCarsList, carsList, getBrandsList,
                brands, history, searchCars, setCarsList, getCategoriesList, categories,
              }) => {

  const [page, setPage] = useState(1)
  const {brand, category} = useParams()

  const [query] = useQueryParams({
    start_date: StringParam,
    end_date: StringParam,
    city: StringParam,
  })


  let cars = brand !== 'all' ? carsList.filter(({brand_name}) => brand_name === brand) : carsList
  cars = category !== 'all' ? cars.filter(({category_name}) => category_name === category) : cars
  const totalPage = Math.ceil(cars.length / PAGE_SIZE)

  useEffect(() => {
    if (!carsList || !carsList.length) {
      if (query && Object.values(query).some(item => item)) {
        searchCars(query)
      } else {
        getCarsList()
      }
    }
    (!brands || !brands.length) && getBrandsList();
    (!categories || !categories.length) && getCategoriesList()

    return () => {
      if(!(history.location && history.location.pathname && history.location.pathname.includes('detail')))
      setCarsList([])
    }

  }, [])


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  return (
    <div className={styles.container} style={{height: isMobile && 'var(--mobile-container-height)'}}>
      {!isMobile && <div className={styles.container__brands}>
        <section className={styles.container__category}>
          {
            categories &&
            categories.map(cat => <div onClick={() => history.replace(`/cars/${brand}/${cat.name}`+ history.location.search)}
              className={category === cat.name ? styles['container__category--active'] : ''}>
              {cat.name}
            </div>)
          }
        </section>

        {brands &&
        brands
          .map(item => <div>
            <Brand {...item}
                   activeBrand={brand}
                   onClick={brand => history.replace('/cars/' + brand + '/' + category + history.location.search)}/>
          </div>)}
      </div>
      }


      <div className={`${styles.container__cars} ${isMobile ?
        styles['container__cars--mobile'] :
        styles['container__cars--desk']}`}>
          <span>
            خودرو خود را انتخاب کنید
          </span>
        <div className={styles.container__content}>
          {cars && cars
            .slice((page - 1) * PAGE_SIZE, isMobile ? cars.length : page * PAGE_SIZE)
            .map((car, idx) => <CarCard {...car}
                                        isMobile={isMobile}
                                        selectCar={id => history.push(`/cars/${brand}/${category}/detail/` + id)}
                                        reserveCar={id => history.push('/cars/reserve/' + id)}
                                        hasBorder={!isMobile && ((idx + 1) % 3)}/>)}
        </div>
        {
          cars.length > PAGE_SIZE && !isMobile && <div className={styles.container__paging}>
            {
              page === totalPage && <div style={{marginLeft: '8px'}} onClick={() => setPage(state => state - 1)}>
                <Arrow rotation={'180deg'}/>
              </div>
            }
            <span>
            صفحه {page} از {totalPage}
            </span>
            {
              page !== totalPage && <div onClick={() => setPage(state => state + 1)}>
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
