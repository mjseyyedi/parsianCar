import React from 'react'

import styles from './styles'

const Button = ({children, type, onClick, submit}) => {

  return (
    <button className={[styles.button, styles[type]].join(' ')}
             onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
