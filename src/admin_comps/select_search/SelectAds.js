import React, { useState } from 'react';
import AutocompleteAdsEmails from './AutocompleteAdsEmail';
import AutocompleteCatagory from "./AutocompleteCatagory"
import DatePickerSearchAds from './DatePickerSearchAds';

function SelectAds(props) {

    let [valCategory, setValCategory] = useState(null)
    let [valEmail, setValEmail] = useState(null)
    let [valDateStart, setValDateStart] = useState('');
    let [valDateEnd, setValDateEnd] = useState('');

    return (
        <div className="row py-3 d-flex justify-content-center">

            <AutocompleteAdsEmails ads_ar={props.ads_ar} setAdsArr={props.setAdsArr} setTempAr={props.setTempAr} setFlag={props.setFlag} valCategory={valCategory} setValEmail={setValEmail} valDateStart={valDateStart} valDateEnd={valDateEnd}/>
            <AutocompleteCatagory ads_ar={props.ads_ar} setAdsArr={props.setAdsArr} setTempAr={props.setTempAr} setFlag={props.setFlag} setValCategory={setValCategory} valEmail={valEmail} valDateStart={valDateStart} valDateEnd={valDateEnd}/>
            <DatePickerSearchAds ads_ar={props.ads_ar} setAdsArr={props.setAdsArr} setTempAr={props.setTempAr} setFlag={props.setFlag} valCategory={valCategory} valEmail={valEmail} setValDateStart={setValDateStart} setValDateEnd={setValDateEnd} />
                </div>
                )
}

export default SelectAds;