import React, { useEffect} from 'react'

import Close from 'components/common/Icons/Close'

import styles from './styles'

let timer = null

const Alert = ({text, type, onClose, isOpen, isMobile}) => {

  useEffect(() =>{
    if(timer) clearTimeout(timer)

    if(isOpen){
        timer = setTimeout(() =>{
          // onClose()
        }, 4000)
    }
    else onClose()
  } , [isOpen])

  function ToasterContent () {
    return <div className={`${styles.container} ${styles[`container__${type}`]} ${styles[`container--${isOpen ? 
      (isMobile ? 'mobile-open' : 'open') :(isMobile ? 'mobile-close' : 'close')}`]}`}
    style={{'--top-position' : isMobile ? '70vh' :'calc(var(--navbar-height) + 25px)'}}>
      <span onClick={onClose}>
        <Close/>
      </span>
      <span>
        {text}
      </span>
    </div>
  }


  return ToasterContent()
}

export default Alert
