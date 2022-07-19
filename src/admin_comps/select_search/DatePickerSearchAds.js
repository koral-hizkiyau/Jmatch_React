import React, { useState } from 'react';
import { DateInput } from 'semantic-ui-calendar-react';
import 'semantic-ui-css/semantic.min.css';
import { adsCheck } from '../js/ads';

export default function DatePickerSearchAds(props) {

  let [valDateStart, setValDateStart] = useState('');
  let [valDateEnd, setValDateEnd] = useState('');

 

  const handleChange = (event, { name, value }) => {
    if (name === "from") {
      setValDateStart(value)
      props.setValDateStart(value)
      let temp = adsCheck(props.ads_ar,props.setFlag,props.valCategory,props.valEmail,value,valDateEnd)
      props.setTempAr(temp);
    }
    else if (name === "to") {
      setValDateEnd(value)
      props.setValDateEnd(value)
      let temp = adsCheck(props.ads_ar,props.setFlag,props.valCategory,props.valEmail,valDateStart,value)
      props.setTempAr(temp);
    }
  }

const onChangeClear = (event, { name, value }) => {  

  if (name === "from") {
    setValDateStart('')
    props.setValDateStart('')
    let temp = adsCheck(props.ads_ar,props.setFlag,props.valCategory,props.valEmail,value,valDateEnd)
    props.setTempAr(temp);
  }
  else if (name === "to") {
    setValDateEnd('')
    props.setValDateEnd('')
    let temp = adsCheck(props.ads_ar,props.setFlag,props.valCategory,props.valEmail,valDateStart,value)
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



