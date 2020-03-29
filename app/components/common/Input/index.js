import React, {useState, useEffect} from 'react'

import styles from './styles'

const Input = ({type, onInput, placeholder, disabled, initialValue = '', value}) => {

  const [input, setInput] = useState('')

  useEffect(() =>{
    if(initialValue){
      setInput(initialValue)
    }
  } , [initialValue])

  useEffect(() =>{
    if(!disabled && type !== 'submit'){
      onInput(input)
    }
  } , [input])

  return (
    <input className={styles.container}
           onInput={e => {
             setInput(e.target.value)
           }}
           placeholder={placeholder}
           value={type === 'submit' ? value : input}
           disabled={disabled}
           type={type}/>
  )
}

export default Input
