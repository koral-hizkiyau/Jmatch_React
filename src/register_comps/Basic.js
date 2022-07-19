import React, { useState, useRef, useEffect } from 'react';
import { checkEmail, checkOnlyNumbers, checkPhone } from './js/checkData';
import { useDispatch } from "react-redux";
import Axios from 'axios';
import '../style/css/register.css';
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
import {apiUrl} from "../services/apiService";

function Basic() {


    // for sending function to reducer
    let dispatch = useDispatch()


    // Refs
    let emailRef = useRef();
    // let phoneRef = useRef();
    let passwordRef = useRef();
    let password2Ref = useRef();


    // משתנים כדי לבדוק אם הטופס תקין יפתח את הכפתור שליחה
    let email = false, password = false, password2 = false;

    let [userBasicDataState, setUserBasicDataState] = useState({});

    let [allUsers, setAllUsers] = useState([]);

    let [allAdmins, setAllAdmins] = useState([])




    // איתחול הכפתור שליחה ללא פעיל
    useEffect(() => {
        document.getElementById("btn").disabled = true;
        document.getElementById("btn").style.backgroundColor = "grey";

        let tempArr = [];

        let urlUser = apiUrl+'/users';

        Axios.get(urlUser)
            .then(res => {
                setAllUsers(res.data)
            });

        let urlAdmin = apiUrl+'/admins';
        Axios.get(urlAdmin)
            .then(res => {
                setAllAdmins(res.data)
            });

    }, [])




    // check data to open next button
    const checkForm = () => {



        // בודק שהקלט אימייל תקין
        let validEmail = checkEmail(emailRef.current.value);
        let massageEmail = document.getElementById("msgEmail");



        if (validEmail === true) {
            let ifTaken = false;

            for (let i = 0; i < allUsers.length; i++) {
                if (emailRef.current.value === allUsers[i].email) {
                    ifTaken = true;
                    break;
                }
            }
            for (let i = 0; i < allAdmins.length; i++) {
                if (emailRef.current.value === allAdmins[i].email) {
                    ifTaken = true;
                    break;
                }
            }

            if (ifTaken) {
                massageEmail.style.color = "red";
                massageEmail.innerHTML = " That email is taken &#10007;";
            }
            else {
                massageEmail.innerHTML = "&#10004;";
                massageEmail.style.color = "pink";
                email = true;
            }



        }
        else {
            massageEmail.innerHTML = validEmail;
            massageEmail.style.color = "red";
            email = false;
            document.getElementById("btn").disabled = true;
        }



        // בודק שהקלט סיסמא תקין
        // להוסיף א הבדיקה שאין רק מספרים
        let massagePass = document.getElementById("msgPass");
        if (passwordRef.current.value.length > 8 && checkOnlyNumbers(passwordRef.current.value)) {
            massagePass.style.color = "pink"
            massagePass.innerHTML = "&#10004;";
            password = true;
        }
        else {
            massagePass.style.color = "red"
            if (checkOnlyNumbers(passwordRef.current.value) === false && passwordRef.current.value.length > 8) {
                massagePass.innerHTML = " Only numbers &#10007;";
            }
            else if (passwordRef.current.value.length < 8) {
                massagePass.innerHTML = " Less than 8 characters &#10007;";
            }
            password = false;
            document.getElementById("btn").disabled = true;
        }

        // בודק שסיסמא שניה תואמת לסיסמא הראשונה
        let massagePass2 = document.getElementById("msgPass2");
        if (passwordRef.current.value === password2Ref.current.value && password) {
            massagePass2.innerHTML = "&#10004;";
            massagePass2.style.color = "pink"
            password2 = true;
        }
        else {
            massagePass2.style.color = "red"
            massagePass2.innerHTML = "";
            password2 = false;
            document.getElementById("btn").disabled = true;
        }


        if (document.getElementById("btn").disabled === true) {
            document.getElementById("btn").style.backgroundColor = "grey";
        }


        // אם כל הקלטים תקינים העבר את הכפתור למצב פעיל, ושמור את האובייקט של המידע בסטייט
        if (email && password && password2) {
            document.getElementById("btn").disabled = false;
            document.getElementById("btn").style.color = "white";
            document.getElementById("btn").style.backgroundColor = "dodgerblue";


            let userObj = {
                email: emailRef.current.value.toLowerCase(),
                // phone: phoneRef.current.value,
                password: passwordRef.current.value,
            };
            setUserBasicDataState(userObj);
        }
    }




    return (
        <div className="App round-reg" >
            <h2>Welcome! Who you are?</h2>
            <div onChange={checkForm}>
                <div className="label-register"><div className="input-name-reg">Email</div>  <div className="msg-reg" id="msgEmail"></div></div><br></br>
                <input className="input-register" ref={emailRef} type="text" placeholder="your.mail@example.com"></input>

                <br></br>

                {/* <div className="label-register"><div className="input-name-reg">Phone</div> <div className="msg-reg" id="msgPhone"></div></div><br></br>
                <input className="input-register" ref={phoneRef} type="text" placeholder="059-9999999"></input>
                
                <br></br> */}

                <div className="label-register"><div className="input-name-reg">Password</div> <div className="msg-reg" id="msgPass"></div></div><br></br>
                <input className="input-register" id="pass1" ref={passwordRef} type="password" placeholder="8 characters minimum, at least 1 letter"></input>

                <br></br>

                <div className="label-register"><div className="input-name-reg">Reset Password</div> <div className="msg-reg" id="msgPass2"></div> </div><br></br>
                <input className="input-register" ref={password2Ref} type="password" ></input>

                <br></br>


                <button className="btn-register" onClick={() => { dispatch({ type: "addData", userData: userBasicDataState, submitingType: "basicPlus" }) }} id="btn" type="submit">Next</button>
            </div>

        </div>
    );
}

export default Basic;