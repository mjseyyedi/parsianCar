import React, {useState} from 'react'
import { DatePicker } from "jalali-react-datepicker";

import style from './styles'

function DatePickerComponent({name , className, label,selectDate, id, ...props }) {


  return (<div className={style.container} id={id}>
      <DatePicker isRenderingButtons={false} label={label}
                  onClickSubmitButton={selectDate}
                  timePicker={false}
      />
  </div>)
}

export default DatePickerComponent
