import { checkEmail, checkOnlyLetters } from '../../register_comps/js/checkData'



let email = false;
let fname = false;
let faultType = false;
let faultDescription = false;

export const checkForm = (emailRef, fnameRef, faultTypeRef,descriptionRef) => {

    // בודק שהקלט אימייל תקין
    let validEmail = checkEmail(emailRef);
    let massageEmail = document.getElementById("msgEmail");
    if (validEmail === true) {        
                massageEmail.innerHTML = "&#10004;";
                massageEmail.style.color = "pink";
                email = true;
            } 
    else {
        massageEmail.innerHTML = validEmail;
        massageEmail.style.color = "red";
        email = false;
    }

    let validFname = checkOnlyLetters(fnameRef);
    let massageFname = document.getElementById("msgFname");
   
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

    let msgFaultType = document.getElementById("msgFaultType");

    if (faultTypeRef === "-select type-") {
        faultType = false;
        msgFaultType.style.color = "red";
        msgFaultType.innerHTML = " must";
    }
    else {
        faultType = true;
        msgFaultType.style.color = "pink";
        msgFaultType.innerHTML = "&#10004;";
    }

    let msgDescription = document.getElementById("msgDescription");
   
    if (descriptionRef !== '') {
        msgDescription.innerHTML = "&#10004;";
        msgDescription.style.color = "pink";
        faultDescription = true;
    }
    else {
        msgDescription.innerHTML = "must";
        msgDescription.style.color = "red";
        faultDescription = false;
    }
    

    // אם כל הקלטים תקינים העבר את הכפתור למצב פעיל, ושמור את האובייקט של המידע בסטייט
    if (email && fname === true && faultType === true && faultDescription === true) {
        document.getElementById("btn1").disabled = false;
        document.getElementById("btn1").style.color = "white";
        document.getElementById("btn1").style.backgroundColor = "dodgerblue";
    
    }
}