import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from "react-redux"
import { checkOnlyLetters } from './js/checkData';
import Axios from 'axios';
import '../style/css/register.css';
import {apiUrl} from "../services/apiService";

import { getAge } from '../style/js/help';



function BasicPlus() {

    // Refs
    let fnameRef = useRef();
    let genderRef = useRef();
    let bDateRef = useRef();
    let cityRef = useRef();

    // חיבור לשליחה לרדיוסר
    let dispatch = useDispatch()

    // סטייט של הנתונים של הטופס
    let [userBasicPlusDataState, setUserBasicPlusDataState] = useState({});

    let [cities_ar, setCities_ar] = useState([]);

    let fname = false, genderv = false, cityv = false, bDatev = false;

    // איתחול הכפתור שליחה ללא פעיל
    useEffect(() => {
        document.getElementById("btn").disabled = true;
        document.getElementById("btn").style.backgroundColor = "grey"


        let url = apiUrl+'/cities';
        Axios.get(url)
            .then(res => {
                setCities_ar(res.data)

            });

        document.getElementById("btn").disabled = true;
    }, [])

    // בדיקת טופס לפתיחת הכפתור נקסט
    const checkForm = () => {
        let validFname = checkOnlyLetters(fnameRef.current.value);
        let massageFname = document.getElementById("msgFname");
        let massageGender = document.getElementById("msgGender");
        let massageCity = document.getElementById("msgCity");
        let massagebDate = document.getElementById("msgbDate");
        if (validFname === true) {
            massageFname.innerHTML = "&#10004;";
            massageFname.style.color = "pink";
            fname = true;
        }
        else {
            massageFname.innerHTML = validFname;
            massageFname.style.color = "red";
            fname = false;
            document.getElementById("btn").disabled = true;
        }
        if (genderRef.current.value === "-select gender-") {
            genderv = false;
            massageGender.style.color = "red";
            massageGender.innerHTML = " Can't be blank &#10007;";
            document.getElementById("btn").disabled = true;
        }
        else {
            genderv = true;
            massageGender.style.color = "pink";
            massageGender.innerHTML = "&#10004;";
        }
        if (cityRef.current.value === "-select city-") {
            cityv = false;
            massageCity.style.color = "red";
            massageCity.innerHTML = " Can't be blank &#10007;";
            document.getElementById("btn").disabled = true;
        }
        else {
            cityv = true;
            massageCity.style.color = "pink";
            massageCity.innerHTML = "&#10004;";
        }
        if (bDateRef.current.value === "") {
            bDatev = false;
            massagebDate.style.color = "red";
            massagebDate.innerHTML = " Can't be blank &#10007;";
            document.getElementById("btn").disabled = true;
        }
        else {
            if (getAge(bDateRef.current.value) < 18) {
                bDatev = false;
                massagebDate.style.color = "red";
                massagebDate.innerHTML = " Under 18 &#10007;";
                document.getElementById("btn").disabled = true;

            }
            else if (getAge(bDateRef.current.value) > 100) {
                bDatev = false;
                massagebDate.style.color = "red";
                massagebDate.innerHTML = " &#10007;";
                document.getElementById("btn").disabled = true;
            }
            else {
                bDatev = true;
                massagebDate.style.color = "pink";
                massagebDate.innerHTML = "&#10004;";

            }

        }

        if (document.getElementById("btn").disabled === true) {
            document.getElementById("btn").style.backgroundColor = "grey";
        }

        if (fname === true && genderv === true && cityv === true && bDatev === true) {
            document.getElementById("btn").disabled = false;
            document.getElementById("btn").style.color = "white";
            document.getElementById("btn").style.backgroundColor = "dodgerblue";
        }


        let userObj = {
            first_name: fnameRef.current.value,
            gender: genderRef.current.value,
            date_of_birth: bDateRef.current.value,
            city: cityRef.current.value
        };
        setUserBasicPlusDataState(userObj);
    }


    return (
        <div className="App round-reg">
            <h2>Let's start with the basics</h2>
            <p style={{ color: "gray" }}><i style={{ marginRight: "5px", fontSize: "23px" }} className="fa fa-eye"></i>This info be visible to others</p>

            <div onChange={checkForm}>

                <div className="label-register"><div className="input-name-reg">First name</div><div className="msg-reg" id="msgFname"></div></div><br></br>
                <input className="input-register" ref={fnameRef} type="text" ></input>
                <br></br>

                <div className="label-register"><div className="input-name-reg">I am a...</div><div className="msg-reg" id="msgGender"></div></div><br></br>
                <select className="input-register" selected defaultValue ref={genderRef} >
                    <option > -select gender- </option>
                    <option defaultValue="Man">Man</option>
                    <option defaultValue="Woman">Woman</option>
                </select>
                <br></br>

                <div className="label-register"><div className="input-name-reg">Date of birth</div><div className="msg-reg" id="msgbDate"></div></div><br></br>
                <input className="input-register" ref={bDateRef} type="date" ></input>
                <br></br>

                <div className="label-register"><div className="input-name-reg">City</div><div className="msg-reg" id="msgCity"></div></div><br></br>
                <select className="input-register" selected defaultValue ref={cityRef}>
                    <option> -select city- </option>
                    {cities_ar.map((city, i) => {
                        return (
                            <option key={i}>{city.city_name}</option>
                        )
                    })}
                </select>
                <br></br>

                <button className="btn-register" onClick={() => { dispatch({ type: "addData", userData: userBasicPlusDataState, submitingType: "uploadingImg" }) }} id="btn" type="submit" value="Next">Next</button>

            </div>
        </div>
    );
}

export default BasicPlus;