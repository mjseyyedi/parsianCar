import React, {useState} from 'react'

import Img from 'components/common/Img'
import Button from 'components/common/Button'
import HomeLand from 'components/common/Icons/HomeLand'

import styles from './styles'

const Car = ({
               category_name, brand_name, name, available,
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
                hasBorder
             }) => {

  const [isHovered, setHovered] = useState(false)


  console.log(car_images)
  return (<section className={`${styles.container} ${hasBorder && styles['container--border']}`}
                   onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)}>
    <section style={{backgroundColor: isHovered ? `var(--hover-background)` : ''}}>
      <div>
        {car_images && car_images.length ?
          <Img src={car_images[0].image}/>
          : null}
      </div>
      <div className={styles.container__info}>
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

        <div>
          <span>

          </span>
          <span>

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
      <div className={styles.container__button}>
        <Button type={isHovered ? 'primary' : 'deactive'}>
          رزرو کنید
        </Button>
      </div>

    </section>

  </section>)
}

export default Car
