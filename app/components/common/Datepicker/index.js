import React, {useState, useEffect} from 'react'
import {DatePicker} from 'jalali-react-datepicker'
import 'moment'

import styles from './styles'

function DatePickerComponent({
                               placeholder, selectDate
                             }) {

  const [date, setDate] = useState(null)
  const [ref, setRef] = useState(null)

  useEffect(()=>{
      if(date){
        selectDate(date)
      }
  }, [date])


  return (<div className={styles.container} onClick={() => {
    !(ref.state.isOpenModal) && ref.toggleModalOpen()
    setRef(state => ({...state}))
  }}>
    <div placeholder={placeholder} >
      {date || placeholder}
    </div>
    <DatePicker isRenderingButtons={false}
                ref={el => setRef(el)}
                onClickSubmitButton={({value}) => {
                  if(value && value._i){
                    const date = new Date(value._i.replace('-//', ''))
                    const persianDate = date.toLocaleDateString('fa-IR')
                    if(persianDate)
                      setDate(persianDate)
                  }

                }}
                timePicker={false}
    />
  </div>)
}

export default DatePickerComponent
