import { apiUrl, doApiGetToken, doApiPost } from '../../services/apiService';
import $ from "jquery";
import moment from 'moment';
import { doApiPostToken } from '../../services/apiService';

//פונקצייה שחוסמת משתמש
export const delUser = async (_id, item, counterApi, setCounterApi, setProfileSingle) => {
    let userChoose = global.confirm("Are you sure you want to block?");
    if (userChoose) {
        item.block_status = true;

        doApiPostToken(apiUrl + "/users/updateBlock", item)
            .then(data => {
                setProfileSingle(data)

            })
        let urlB = apiUrl+'/blockeds/add/users';
        let dataB = await doApiPost(urlB, {
            _id: item._id,
            email: item.email,
            password: item.password,
            first_name: item.first_name,
            phone: item.phone,
            gender: item.gender,
            image: item.image,
            pets: item.pets,
            country: item.country,
            city: item.city,
            date_of_birth: item.date_of_birth,
            about_me: item.about_me,
            height: item.height,
            speaks: item.speaks,
            smoking: item.smoking,
            drinking: item.drinking,
            marijuana: item.marijuana,
            children: item.children,
            body_type: item.body_type,
            education: item.education,
            relationship: item.relationship,
            relationship_type: item.relationship_type,
            orientation: item.orientation,
            my_traits: item.my_traits,
            hobbies: item.hobbies,
            categories: item.categories,
            finish_registration: item.finish_registration,
            my_ideal_person: item.my_ideal_person,
            matching_ads: item.matching_ads,
            registration_date: item.registration_date
        });
        return true;
    }
    else {
        alert("error something not work!")
    }

}

export const UnblockUser = async (_id, item, counterApi, setCounterApi, setProfileSingle) => {
    let userChoose = global.confirm("Are you sure you want to unblock?");
    if (userChoose) {
        item.block_status = false;

        doApiPostToken(apiUrl + "users/updateBlock", item)
            .then(data => {
                setProfileSingle(data)
            })

        setCounterApi(counterApi + 1)
        let urlB = apiUrl+'/blockeds/del';
        let dataB = await doApiPost(urlB, { del: _id });
        return true;
    }
    else {
        alert("error something not work!")
    }



}

//פונצקיה שמוחקת מנהל
export const delAdmin = async (_id, item, counterApi, setCounterApi) => {
    let userChoose = global.confirm("Are you sure you want to delete?");
    if (userChoose) {
        let url = apiUrl+'/admins/del';
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

//פונקציה שבודקת בלוקאל איזה כפתור פועל טבלאות או דיאגרמות
export const Checking_table = (e, setUsersArr, setAdminsArr, setUsersBlockArr) => {
    let urlUsers = apiUrl + "/users";
    let urlAdmin = apiUrl + "/admins";
    let urlBlock = apiUrl + "/blockeds";

    //מעדכן את הלוקאל סטורז כל פעם מחדש לפי הערך
    localStorage.setItem('RadioOptionsUsers', e.currentTarget.value);
    //רשימה של הכפתורים
    let radios = document.getElementsByName("RadioOptionsUsers");
    //הערך של הלוקאל סטורז
    let val = localStorage.getItem('RadioOptionsUsers');
    //לולאה שבודקת איזה כפתור לחוץ ולפי זה משנה דברים
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].value === val && e.currentTarget.value === "users") {
            $("#vip").hide();
            $("#admins").hide();
            $("#regularUsers").hide();
            $('#blockUsers').hide();
            $("#users").show();

            doApiGetToken(urlUsers)
                .then(data => {
                    setUsersArr(data)
                })
        }
        else if (radios[i].value === val && e.currentTarget.value === "vip") {
            $("#users").hide();
            $("#admins").hide();
            $("#regularUsers").hide();
            $('#blockUsers').hide();
            $("#vip").show();

            doApiGetToken(urlUsers)
                .then(data => {
                    setUsersArr(data)
                })
        }
        else if (radios[i].value === val && e.currentTarget.value === "admins") {
            $("#users").hide();
            $("#vip").hide();
            $("#regularUsers").hide();
            $('#blockUsers').hide();
            $("#admins").show();

            doApiGetToken(urlAdmin)
                .then(data => {

                    setAdminsArr(data);
                })
        }
        else if (radios[i].value === val && e.currentTarget.value === "regularUsers") {
            $("#users").hide();
            $("#vip").hide();
            $("#admins").hide();
            $('#blockUsers').hide();
            $("#regularUsers").show();

            doApiGetToken(urlUsers)
                .then(data => {
                    setUsersArr(data)
                })

        }
        else if (radios[i].value === val && e.currentTarget.value === "blockUsers") {
            $("#users").hide();
            $("#vip").hide();
            $("#admins").hide();
            $('#blockUsers').show();
            $("#regularUsers").hide();

            doApiGetToken(urlBlock)
                .then(data => {
                    setUsersBlockArr(data)
                })

        }
    }
}
// פונקציה שבודקת את המין של המשתמש בחיפוש
export const genderCheck = (e, _ar, setFlag, valCity, setValGender, valName, valGender, setTempAr, valDateStart, valDateEnd, valEmail) => {
    setValGender(e.currentTarget.value)
    let temp = valCheck(_ar, setFlag, valCity, e.currentTarget.value, valName, valDateStart, valDateEnd, valEmail)
    setTempAr(temp)
}

//פונקציה שבודקת את החיפוש במחלקה של המשתמשים
export const valCheck = (_ar, setFlag, valCity, valGender, valName, valDateStart, valDateEnd, valEmail) => {
    let temp;
    setFlag(false)
    //אם המשתמש הכניס שם ובלי עיר ובלי אימייל
    if (valName !== null && valCity === null && valEmail === null) {
        if (valGender === "allGenders") {
            if (valDateStart !== '' && valDateEnd === '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') >= valDateStart) && (item.first_name === valName) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
            else if (valDateStart === '' && valDateEnd !== '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') <= valDateEnd) && (item.first_name === valName) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
            else {
                temp = _ar.filter(item => (item.first_name === valName) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
        }
        else {
            if (valDateStart !== '' && valDateEnd === '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') >= valDateStart) && (item.first_name === valName) && (item.gender.toLowerCase() === valGender))

            }
            else if (valDateStart === '' && valDateEnd !== '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') <= valDateEnd) && (item.first_name === valName) && (item.gender.toLowerCase() === valGender))
            }
            else {
                temp = _ar.filter(item => (item.first_name === valName) && (item.gender.toLowerCase() === valGender))
            }
        }

    }//אם המשתמש הכניס עיר, שם ואימייל
    else if (valName !== null && valCity !== null && valEmail !== null) {
        if (valGender === "allGenders") {
            if (valDateStart !== '' && valDateEnd === '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') >= valDateStart) && (item.first_name === valName) && (item.email === valEmail) && (item.city === valCity) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
            else if (valDateStart === '' && valDateEnd !== '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') <= valDateEnd) && (item.first_name === valName) && (item.email === valEmail) && (item.city === valCity) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
            else {
                temp = _ar.filter(item => (item.city === valCity) && (item.first_name === valName) && (item.email === valEmail) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
        }
        else {
            if (valDateStart !== '' && valDateEnd === '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') >= valDateStart) && (item.first_name === valName) && (item.email === valEmail) && (item.city === valCity) && (item.gender.toLowerCase() === valGender))
            }
            else if (valDateStart === '' && valDateEnd !== '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') <= valDateEnd) && (item.first_name === valName) && (item.email === valEmail) && (item.city === valCity) && (item.gender.toLowerCase() === valGender))
            }
            else {
                temp = _ar.filter(item => (item.city === valCity) && (item.first_name === valName) && (item.email === valEmail) && (item.gender.toLowerCase() === valGender))
            }
        }
    }// אם המשתמש לא הכניס שם ועיר
    else if (valName === null && valCity === null && valEmail === null) {
        if (valGender === "allGenders") {
            //אם המשתמש הכניס רק תאריך אחד
            if (valDateStart !== '' && valDateEnd === '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') >= valDateStart))
            }
            else if (valDateStart === '' && valDateEnd !== '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') <= valDateEnd))
            }
            else {
                temp = _ar.filter(item => (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
        }
        else {
            //אם המשתמש הכניס רק תאריך אחד
            if (valDateStart !== '' && valDateEnd === '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') >= valDateStart) && (item.gender.toLowerCase() === valGender))
            }
            else if (valDateStart === '' && valDateEnd !== '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') <= valDateEnd) && (item.gender.toLowerCase() === valGender))

            }
            else {
                temp = _ar.filter(item => (item.gender.toLowerCase() === valGender))
            }
        }
    } //אם המשתמש הכניס עיר ואימייל, ללא שם
    else if (valCity !== null && valName === null && valEmail !== null) {
        if (valGender === "allGenders") {
            if (valDateStart !== '' && valDateEnd === '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') >= valDateStart) && (item.email === valEmail) && (item.city === valCity) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
            else if (valDateStart === '' && valDateEnd !== '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') <= valDateEnd) && (item.email === valEmail) && (item.city === valCity) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
            else {
                temp = _ar.filter(item => (item.city === valCity) && (item.email === valEmail) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
        }
        else {
            if (valDateStart !== '' && valDateEnd === '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') >= valDateStart) && (item.email === valEmail) && (item.city === valCity) && (item.gender.toLowerCase() === valGender))
            }
            else if (valDateStart === '' && valDateEnd !== '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') <= valDateEnd) && (item.email === valEmail) && (item.city === valCity) && (item.gender.toLowerCase() === valGender))
            }
            else {
                temp = _ar.filter(item => (item.city === valCity) && (item.email === valEmail) && (item.gender.toLowerCase() === valGender))
            }
        }
    }


    // אם המשתמש הכניס שם ואימייל, ללא עיר
    else if (valName !== null && valEmail !== null && valCity === null) {
        if (valGender === "allGenders") {
            if (valDateStart !== '' && valDateEnd === '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') >= valDateStart) && (item.email === valEmail) && (item.first_name === valName) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
            else if (valDateStart === '' && valDateEnd !== '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') <= valDateEnd) && (item.email === valEmail) && (item.first_name === valName) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
            else {
                temp = _ar.filter(item => (item.first_name === valName) && (item.email === valEmail) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
        }
        else {
            if (valDateStart !== '' && valDateEnd === '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') >= valDateStart) && (item.email === valEmail) && (item.first_name === valName) && (item.gender.toLowerCase() === valGender))
            }
            else if (valDateStart === '' && valDateEnd !== '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') <= valDateEnd) && (item.email === valEmail) && (item.first_name === valName) && (item.gender.toLowerCase() === valGender))
            }
            else {
                temp = _ar.filter(item => (item.first_name === valName) && (item.email === valEmail) && (item.gender.toLowerCase() === valGender))
            }
        }
    }


    // אם המשתמש הכניס שם ועיר, ללא אימייל
    else if (valName !== null && valCity !== null && valEmail === null) {
        if (valGender === "allGenders") {
            if (valDateStart !== '' && valDateEnd === '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') >= valDateStart) && (item.city === valCity) && (item.first_name === valName) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
            else if (valDateStart === '' && valDateEnd !== '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') <= valDateEnd) && (item.city === valCity) && (item.first_name === valName) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
            else {
                temp = _ar.filter(item => (item.first_name === valName) && (item.city === valCity) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
        }
        else {
            if (valDateStart !== '' && valDateEnd === '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') >= valDateStart) && (item.city === valCity) && (item.first_name === valName) && (item.gender.toLowerCase() === valGender))
            }
            else if (valDateStart === '' && valDateEnd !== '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') <= valDateEnd) && (item.city === valCity) && (item.first_name === valName) && (item.gender.toLowerCase() === valGender))
            }
            else {
                temp = _ar.filter(item => (item.first_name === valName) && (item.city === valCity) && (item.gender.toLowerCase() === valGender))
            }
        }
    }

    // אם המשתמש הכניס עיר, ללא אימייל ושם
    else if (valName === null && valCity !== null && valEmail === null) {
        if (valGender === "allGenders") {
            if (valDateStart !== '' && valDateEnd === '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') >= valDateStart) && (item.city === valCity) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
            else if (valDateStart === '' && valDateEnd !== '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') <= valDateEnd) && (item.city === valCity) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
            else {
                temp = _ar.filter(item => (item.city === valCity) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
        }
        else {
            if (valDateStart !== '' && valDateEnd === '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') >= valDateStart) && (item.city === valCity) && (item.gender.toLowerCase() === valGender))
            }
            else if (valDateStart === '' && valDateEnd !== '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') <= valDateEnd) && (item.city === valCity) && (item.gender.toLowerCase() === valGender))
            }
            else {
                temp = _ar.filter(item => (item.city === valCity) && (item.gender.toLowerCase() === valGender))
            }
        }
    }

    // אם המשתמש הכניס אימייל, ללא עיר ושם
    else if (valName === null && valCity === null && valEmail !== null) {
        if (valGender === "allGenders") {
            if (valDateStart !== '' && valDateEnd === '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') >= valDateStart) && (item.email === valEmail) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
            else if (valDateStart === '' && valDateEnd !== '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') <= valDateEnd) && (item.email === valEmail) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
            else {
                temp = _ar.filter(item => (item.email === valEmail) && (item.gender.toLowerCase() === "woman" || item.gender.toLowerCase() === "man"))
            }
        }
        else {
            if (valDateStart !== '' && valDateEnd === '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') >= valDateStart) && (item.email === valEmail) && (item.gender.toLowerCase() === valGender))
            }
            else if (valDateStart === '' && valDateEnd !== '') {
                temp = _ar.filter(item => (moment(item.registration_date).format('DD-MM-YYYY') <= valDateEnd) && (item.email === valEmail) && (item.gender.toLowerCase() === valGender))
            }
            else {
                temp = _ar.filter(item => (item.email === valEmail) && (item.gender.toLowerCase() === valGender))
            }
        }
    }

    //אם המשתמש הזין 2 תאריכים בחיפוש
    if (valDateStart !== '' && valDateEnd !== '') {
        temp = valCheckDates(temp, valDateStart, valDateEnd)

    }
    return temp;
}

//פונצקייה שבודקת אם התאריכים שהמשתמש הזין נמצאת 
export function dateCheck(from, to, check) {
    let date = moment(check).format('DD-MM-YYYY')
    var parts = from.split('-');
    var d1 = Number(parts[2] + parts[1] + parts[0]);
    parts = to.split('-');
    var d2 = Number(parts[2] + parts[1] + parts[0]);
    parts = date.split('-');
    var d3 = Number(parts[2] + parts[1] + parts[0]);
    if (d3 >= d1 && d3 <= d2) {
        return true;
    }
    return false;
}

//פונצקיה שבודקת את הטווח בין התאריכים
export const valCheckDates = (temp_ar, valDateStart, valDateEnd) => {
    let temp = temp_ar.filter(item => true === dateCheck(valDateStart, valDateEnd, item.registration_date))
    return temp;

}


//פונקצייה שמחשבת גיל
export function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//פונקציה שבודקת את התוכן של הטוקן
export function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};