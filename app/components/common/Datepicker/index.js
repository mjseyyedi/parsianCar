import React, {useState, useRef} from 'react'
import { DatePicker } from "jalali-react-datepicker";


import style from './styles'

function DatePickerComponent({name , className, label,selectDate, id, setRef}) {


  return (<div className={style.container} id={id}>
      <DatePicker isRenderingButtons={false} label={label}
                  ref={el => setRef(el)}
                  onClickSubmitButton={({value}) =>{
                    const date = new Date(value._i.replace('-//', ''))
                    selectDate(date.toLocaleDateString('fa-IR'))
                  }}
                  timePicker={false}
      />
  </div>)
}

export default DatePickerComponent
