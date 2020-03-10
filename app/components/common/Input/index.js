import React, {useState, useEffect} from 'react'

import styles from './styles'

const Input = ({type, onInput, placeholder, disabled, initialValue = ''}) => {

  const [input, setInput] = useState(initialValue)

  useEffect(() =>{
    setInput(initialValue)
  } , [initialValue])

  useEffect(() =>{
    console.log(placeholder, disabled)
    if(!disabled){
      onInput(input)
    }
  } , [input])

  return (
    <input className={styles.container}
           onInput={e => setInput(e.target.value)}
           placeholder={placeholder}
           value={input}
           disabled={disabled}
           type={type}/>
  )
}

export default Input
