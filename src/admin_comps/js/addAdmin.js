import { checkEmail, checkOnlyNumbers, checkPhone, checkOnlyLetters } from '../../register_comps/js/checkData'


// check data to open next button

// משתנים כדי לבדוק אם הטופס תקין יפתח את הכפתור שליחה
let email = false, phone = false, password = false;
let fname = false, genderv = false, cityv = false, owner = false, bDatev = false, imageAr = false;

let email2 = false;
let user = false;
let admin = false;
export const checkForm = (emailRef, phoneRef, passwordRef, fnameRef, genderRef, bDateRef, cityRef, ownerRef, img_obj_names, registeredUsers, setUserBasicDataState, registeredUsersNotAdmin) => {
    let massageEmail = document.getElementById("msgEmail");

    // בודק שהקלט אימייל תקין
    let validEmail = checkEmail(emailRef);
    if (validEmail === true) {
        if (user === false) {
            for (let i = 0; i < registeredUsersNotAdmin.length; i++) {
                if (emailRef === registeredUsersNotAdmin[i].email) {
                    massageEmail.style.color = "red";
                    massageEmail.innerHTML = " The email is in use";
                    user = true;
                    break;
                }
            }
        }
         if (admin === false) {
            for (let i = 0; i < registeredUsers.length; i++) {
                if (emailRef === registeredUsers[i].email) {
                    massageEmail.style.color = "red";
                    massageEmail.innerHTML = " The email is in use";
                    admin = true;
                    break;
                }
            }

        }
         if (admin === false && user === false) {
            massageEmail.innerHTML = "&#10004;";
            massageEmail.style.color = "pink";
            email= true;

        }

    }

    else {
        massageEmail.style.color = "red";
        massageEmail.innerHTML = validEmail;
        user=false;
        admin=false;
    }


    // if (email === false && email2 === false) {
    //     massageEmail.innerHTML = "&#10004;";
    //     massageEmail.style.color = "pink";    
    // }
    // else{
    //     massageEmail.style.color = "red";
    //     massageEmail.innerHTML = " The email is in use";
    //     email = false;
    //     email2 = false;

    // }
    // בודק שהקלט טלפון תקין
    let validPhone = checkPhone(phoneRef);
    let massagePhone = document.getElementById("msgPhone");
    if (validPhone === true) {
        for (let i = 0; i < registeredUsers.length; i++) {
            if (phoneRef === registeredUsers[i].phone) {
                massagePhone.style.color = "red"
                massagePhone.innerHTML = " The phone is in use";
                break;
            }
            else {
                massagePhone.innerHTML = "&#10004;";
                massagePhone.style.color = "pink"
                phone = true;
            }
        }
    }


    // בודק שהקלט סיסמא תקין
    // להוסיף א הבדיקה שאין רק מספרים
    let massagePass = document.getElementById("msgPass");
    if (passwordRef.length >= 8 && checkOnlyNumbers(passwordRef) && checkOnlyLetters(passwordRef)) {
        massagePass.style.color = "pink"
        massagePass.innerHTML = "&#10004;";
        password = true;
    }
    else {
        if (checkOnlyNumbers(passwordRef) === false && passwordRef.length >= 8) {
            massagePass.innerHTML = "only numbers";
        }
        else if (passwordRef.length < 8) {
            massagePass.innerHTML = "less than 8 numbers";
        }
        password = false;
    }


    let validFname = checkOnlyLetters(fnameRef);
    let massageFname = document.getElementById("msgFname");
    let massageGender = document.getElementById("msgGender");
    let massageCity = document.getElementById("msgCity");
    let massageOwner = document.getElementById("msgOwner");
    let massagebDate = document.getElementById("msgbDate");
    let massageImageAr = document.getElementById("msgImage");

    if (validFname === true) {
        massageFname.innerHTML = "&#10004;";
        massageFname.style.color = "pink";
        fname = true;
    }
    else {
        massageFname.innerHTML = validFname;
        massageFname.style.color = "red";
        fname = false;
    }
    if (genderRef === "-select gender-") {
        genderv = false;
        massageGender.style.color = "red";
        massageGender.innerHTML = " must";
    }
    else {
        genderv = true;
        massageGender.style.color = "pink";
        massageGender.innerHTML = "&#10004;";
    }
    if (cityRef === "-select city-") {
        cityv = false;
        massageCity.style.color = "red";
        massageCity.innerHTML = " must";
    }
    else {
        cityv = true;
        massageCity.style.color = "pink";
        massageCity.innerHTML = "&#10004;";
    }
    if (ownerRef === "-select-") {
        owner = false;
        massageOwner.style.color = "red";
        massageOwner.innerHTML = " must";
    }
    else {
        owner = true;
        massageOwner.style.color = "pink";
        massageOwner.innerHTML = "&#10004;";
    }
    if (bDateRef === "") {
        bDatev = false;
        massagebDate.style.color = "red";
        massagebDate.innerHTML = " must";
    }
    else {
        bDatev = true;
        massagebDate.style.color = "pink";
        massagebDate.innerHTML = "&#10004;";
    }

    if (img_obj_names.length > 0) {
        imageAr = true;
        massageImageAr.style.color = "pink";
        massageImageAr.innerHTML = "&#10004;";
    }
    else {
        imageAr = false;
        massageImageAr.style.color = "red";
        massageImageAr.innerHTML = " must";
    }




    // אם כל הקלטים תקינים העבר את הכפתור למצב פעיל, ושמור את האובייקט של המידע בסטייט
    if (email && phone && password && fname && genderv && cityv && owner && bDatev) {
        document.getElementById("btn1").disabled = false;
        document.getElementById("btn1").style.color = "white";
        document.getElementById("btn1").style.backgroundColor = "dodgerblue";


        let userObj = {
            email: emailRef,
            phone: phoneRef,
            password: passwordRef,
            first_name: fnameRef,
            gender: genderRef,
            date_of_birth: bDateRef,
            city: cityRef,
            owner: ownerRef
        };

        setUserBasicDataState(userObj);
    }
}


// לאחר העלאת תמונה היא מוצגת על המסך ונשמרת למערך של התמונות
export const uploadingImgs = (event, SetImg_Obj_Names, img_array, img_array_names) => {

    // לכתוב קוד שישנה את השמות של התמונות ויפתח תיקייה
    if (event.target.id === "id-file") {
        let image = document.getElementById('id-img');
        image.src = URL.createObjectURL(event.target.files[0]);
        let tempObj = {
            file: event.target.files[0],
            file_name: event.target.files[0].name
        };
        img_array.push(tempObj);
        img_array_names.push(event.target.files[0].name);
        SetImg_Obj_Names(event.target.files[0].name);

    }
}