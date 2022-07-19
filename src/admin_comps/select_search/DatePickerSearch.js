import React, { useState } from 'react';
import { DateInput } from 'semantic-ui-calendar-react';
import 'semantic-ui-css/semantic.min.css';
import { valCheck } from '../js/data';

export default function DatePickerSearch(props) {

  let [valDateStart, setValDateStart] = useState('');
  let [valDateEnd, setValDateEnd] = useState('');

 

  const handleChange = (event, { name, value }) => {
    if (name === "from") {
      setValDateStart(value)
      props.setValDateStart(value)
      let temp = valCheck(props._ar, props.setFlag, props.valCity, props.valGender, props.valName, value, valDateEnd,props.valEmail)
      props.setTempAr(temp);
    }
    else if (name === "to") {
      setValDateEnd(value)
      props.setValDateEnd(value)
      let temp = valCheck(props._ar, props.setFlag, props.valCity, props.valGender, props.valName, valDateStart, value,props.valEmail)
      props.setTempAr(temp);
    }
  }

const onChangeClear = (event, { name, value }) => {  

  if (name === "from") {
    setValDateStart('')
    props.setValDateStart('')
    let temp = valCheck(props._ar, props.setFlag, props.valCity, props.valGender, props.valName, value, valDateEnd, props.valEmail)
    props.setTempAr(temp);
  }
  else if (name === "to") {
    setValDateEnd('')
    props.setValDateEnd('')
    let temp = valCheck(props._ar, props.setFlag, props.valCity, props.valGender, props.valName, valDateStart, value, props.valEmail)
    props.setTempAr(temp);
    
  }
}

  let dateNow = new Date();
  return (
    <div>
      <form className="row mx-1" >
        <DateInput
          name="from"
          placeholder="From"
          style={{height: 55}}
          value={valDateStart}
          iconPosition="left"
          onChange={handleChange}
          maxDate={(valDateEnd !== '' ? valDateEnd : dateNow)}
          closable
          clearable
          onClear={onChangeClear}
        />
        <DateInput
          name="to"
          placeholder="To"
          style={{height: 55}}
          value={valDateEnd}
          iconPosition="left"
          onChange={handleChange}
          minDate={valDateStart}
          maxDate={dateNow}
          closable
          clearable
          onClear={onChangeClear}

        />
      </form>
    </div>
  )
}



