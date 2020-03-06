import React from 'react'

import styles from './styles'
import Img from 'components/common/Img'

const Brand = ({
             id, name, brands_logo
             }) => {


  return (<section className={styles.container}>
    <div>
      {brands_logo ? <Img src={brands_logo.logo} alt={name}/> : null}
    </div>
    <div>
      {name}
    </div>
  </section>)
}

export default Brand
