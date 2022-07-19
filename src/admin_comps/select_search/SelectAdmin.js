import React, { useState } from 'react';
import { genderCheck } from '../js/data';
import AutocompleteCities from './AutocompleteCities';
import AutocompleteEmails from './AutocompleteEmails';
import AutocompleteNames from './AutocompleteNames';
import DatePickerSearch from './DatePickerSearch';

function SelectAdmin(props) {
    let [valCity, setValCity] = useState(null)
    let [valGender, setValGender] = useState("allGenders")
    let [valName, setValName] = useState(null)
    let [valDateStart, setValDateStart] = useState('');
    let [valDateEnd, setValDateEnd] = useState('');
    let [valEmail, setValEmail] = useState(null);



    return (
        <div className="row py-3 d-flex justify-content-center">
            <select className="custom-select-white mx-1 bg-dark text-white" style={{ height: 55 }} onChange={e => genderCheck(e, props._ar, props.setFlag, valCity, setValGender, valName, valGender, props.setTempAr, valDateStart, valDateEnd,valEmail)}>
                <option name="RadioOptionsUsers" value="allGenders">All Genders</option>
                <option name="RadioOptionsUsers" value="woman">Woman</option>
                <option name="RadioOptionsUsers" value="man">Man</option>
            </select>
                <AutocompleteCities _ar={props._ar} setTempAr={props.setTempAr} setFlag={props.setFlag} setValCity={setValCity} valGender={valGender} valName={valName} valDateStart={valDateStart} valDateEnd={valDateEnd} valEmail={valEmail} textFlag={props.textFlag}/>
                <AutocompleteEmails _ar={props._ar} setTempAr={props.setTempAr} setFlag={props.setFlag} valCity={valCity} valGender={valGender} setValEmail={setValEmail} valDateStart={valDateStart} valDateEnd={valDateEnd} valName={valName} textFlag={props.textFlag}/>       
                <AutocompleteNames _ar={props._ar} setTempAr={props.setTempAr} setFlag={props.setFlag} valCity={valCity} valGender={valGender} setValName={setValName} valDateStart={valDateStart} valDateEnd={valDateEnd} valEmail={valEmail} textFlag={props.textFlag}/>       
                <DatePickerSearch _ar={props._ar} setTempAr={props.setTempAr} setFlag={props.setFlag} valCity={valCity} valGender={valGender} valName={valName} setValDateStart={setValDateStart} setValDateEnd={setValDateEnd} valEmail={valEmail} textFlag={props.textFlag}/>
        </div >)
}

export default SelectAdmin