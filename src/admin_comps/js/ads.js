import { apiUrl, doApiPost } from "../../services/apiService";
import { dateCheck } from "./data";
import moment from 'moment';

export const delAds = async (_id, counterApi, setCounterApi) => {
    let userChoose = global.confirm("Are you sure you want to delete?");
    if (userChoose) {
        let url = apiUrl+'/ads/del';
        let data = await doApiPost(url, { del: _id });



        if (data.message) {
            setCounterApi(counterApi + 1)
            return true;
        }
        else {
            alert("error something not work!")
        }
    }
}

export const adsCheck = (ads_ar, setFlag, valCategory, valEmail, valDateStart, valDateEnd) => {

    let temp;
    setFlag(false)
    //אם המשתמש הכניס שם ובלי עיר ובלי אימייל
    if (valCategory !== null && valEmail === null) {
        if (valDateStart !== '' && valDateEnd === '') {
            temp = ads_ar.filter(item => (moment(item.date).format('DD-MM-YYYY') >= valDateStart) && (item.category === valCategory))
        }
        else if (valDateStart === '' && valDateEnd !== '') {
            temp = ads_ar.filter(item => (moment(item.date).format('DD-MM-YYYY') <= valDateEnd) && (item.category === valCategory))
        }
        else {
            temp = ads_ar.filter(item => (item.category === valCategory))
        }
    }
    else if (valCategory !== null && valEmail !== null) {
        if (valDateStart !== '' && valDateEnd === '') {
            temp = ads_ar.filter(item => (moment(item.date).format('DD-MM-YYYY') >= valDateStart) && (item.category === valCategory) && (item.user.email === valEmail))
        }
        else if (valDateStart === '' && valDateEnd !== '') {
            temp = ads_ar.filter(item => (moment(item.date).format('DD-MM-YYYY') <= valDateEnd) && (item.category === valCategory) && (item.user.email === valEmail))
        }
        else {
            temp = ads_ar.filter(item => (item.category === valCategory) && (item.user.email === valEmail))
        }

    }
    else if (valCategory === null && valEmail !== null) {
        if (valDateStart !== '' && valDateEnd === '') {
            temp = ads_ar.filter(item => (moment(item.date).format('DD-MM-YYYY') >= valDateStart) && (item.user.email === valEmail))
        }
        else if (valDateStart === '' && valDateEnd !== '') {
            temp = ads_ar.filter(item => (moment(item.date).format('DD-MM-YYYY') <= valDateEnd) && (item.user.email === valEmail))
        }
        else {
            temp = ads_ar.filter(item => (item.user.email === valEmail))
        }

    }
    else if (valCategory === null && valEmail === null) {
        if (valDateStart !== '' && valDateEnd === '') {
            temp = ads_ar.filter(item => (moment(item.date).format('DD-MM-YYYY') >= valDateStart))
        }
        else if (valDateStart === '' && valDateEnd !== '') {
            temp = ads_ar.filter(item => (moment(item.date).format('DD-MM-YYYY') <= valDateEnd))
        }
        else {
            temp = ads_ar;
        }

    }
    //אם המשתמש הזין 2 תאריכים בחיפוש
    if (valDateStart !== '' && valDateEnd !== '') {
        temp = valCheckDatesAds(temp, valDateStart, valDateEnd)

    }

    return temp;




}

export const valCheckDatesAds = (temp_ar, valDateStart, valDateEnd) => {
    
    let temp = temp_ar.filter(item => true === dateCheck(valDateStart, valDateEnd, item.date))
    
    return temp;

}