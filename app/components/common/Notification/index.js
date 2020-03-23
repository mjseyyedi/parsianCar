import React, {useRef, useEffect} from 'react'

import Close from 'components/common/Icons/Close'

import styles from './styles'

let timer = null

const Alert = ({text, type, onClose, isOpen}) => {

  useEffect(() =>{
    if(timer) clearTimeout(timer)

    if(isOpen){
        timer = setTimeout(() =>{
          onClose()
        }, 4000)
    }
    else onClose()
  } , [isOpen])

  const ToasterContent = () => {
    return <section className={`${styles.container} ${styles[`container__${type}`]} ${styles[`container--${isOpen ? 'open' : 'close'}`]}`}>
      <span onClick={onClose}>
        <Close/>
      </span>
      <span>
        {text}
      </span>
    </section>
  }


  return <ToasterContent/>
}

export default Alert
