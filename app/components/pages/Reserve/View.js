import React, {useState, useEffect} from 'react'

import Input from 'components/common/Input';
import Button from 'components/common/Button';
import Img from 'components/common/Img';

import styles from './styles'

const Reserve = ({ ...props}) => {

  const [info, setInfo] = useState('')

  return (
    <div className={styles.container}>
      <div>
        <span>
          اطلاعات رزرو
        </span>
        <Input type={'textarea'} />
      </div>
    </div>
  )
}

export default Reserve
