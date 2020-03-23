import React, {useState} from 'react'

import Img from 'components/common/Img'
import Button from 'components/common/Button'
import HomeLand from 'components/common/Icons/HomeLand'
import Arrow from 'components/common/Icons/Arrow'
import Comment from 'components/common/Icons/Comment'
import Star from 'components/common/Icons/Star'

import styles from './styles'

const Car = ({
               id,
               category_name, brand_name,
               name, available,
               reserve,
               model,
               car_details,
               car_images,
               car_reserve_costs,
               car_options,
               car_conditions,
               car_stations,
               car_reserve_detail,
               car_comments,
               car_votes,
               hasBorder,
               reserveCar,
               selectCar,
               isMobile,
             }) => {

  const [isHovered, setHovered] = useState(false)

  return (<section className={`${styles.container} ${hasBorder && styles['container--border']}`}
                   onClick={() => selectCar(id)}
                   onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)}>
    <section className={isMobile ? styles.container__mobile : styles.container__desk}
      style={{backgroundColor: isHovered ? `var(--hover-background)` : ''}}>
      <div style={{backgroundImage: isMobile && car_images && car_images.length && `url(${car_images[0].image})`}}>
        {car_images && car_images.length && !isMobile?
          <Img src={car_images[0].image} alt={name}/>
          : null}
      </div>
      <div>
        <div className={`${styles.container__info} ${isMobile ? styles['container__info--mobile'] : styles['container__info--desk']}`}>
          <div>
            <span className={styles.container__name}>{name}</span>
            <span className={styles.container__location}>
            {car_stations && car_stations.length ?
              <React.Fragment>
                <HomeLand/>&nbsp;
                {car_stations[0].car_station_city}،{car_stations[0].car_station_subcity}
              </React.Fragment>
              : ''}
            </span>
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
        <div className={styles.container__pricing}>
        <span>
          {car_reserve_costs && car_reserve_costs.length ? car_reserve_costs[0].value : ''}&nbsp;
          تومان
        </span>
          <span>
          (روزانه)
        </span>
        </div>
      </div>
      {
        isMobile &&
        <div className={styles['container__arrow']}>
          <Arrow />
        </div>
      }
      {
        !isMobile && <div className={styles.container__button}>
          <Button type={isHovered ? 'primary' : 'deactive'} onClick={e => {
            e.stopPropagation()
            reserveCar(id)
          }}>
            رزرو کنید
          </Button>
        </div>
      }

    </section>

  </section>)
}

export default Car
