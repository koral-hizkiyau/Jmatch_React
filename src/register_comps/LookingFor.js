import React, { useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";
import { apiUrl, doApiPostToken } from '../services/apiService';
import { useHistory } from "react-router-dom";

import '../style/css/register.css';




function LookingFor() {

    let fromAgeRef = useRef();
    let toAgeRef = useRef();
    let genderRef = useRef();


    let history = useHistory()




    let dispatch = useDispatch();

    useEffect(() => {
        // document.getElementById("btn").disabled = true;
        // document.getElementById("btn").style.backgroundColor = "grey";
    }, [])

    const sendLookingFor = (e) => {
        e.preventDefault();
        let tempObj = {}



        if (genderRef.current.value === '-select gender-' && fromAgeRef.current.value !== "") {
            tempObj = {
                finish_registration: true,
                my_ideal_person: {
                    from_age: fromAgeRef.current.value,
                    to_age: toAgeRef.current.value,
                    gender: ""
                }
            }
        }
        else if (genderRef.current.value !== "-select gender-" && fromAgeRef.current.value === "") {
            tempObj = {
                finish_registration: true,
                my_ideal_person: {
                    from_age: "",
                    to_age: "",
                    gender: genderRef.current.value
                }
            }
        }
        else if (genderRef.current.value === "-select gender-" && fromAgeRef.current.value === "") {
            tempObj = {
                finish_registration: true,
                my_ideal_person: {
                    from_age: "",
                    to_age: "",
                    gender: ""
                }
            }

        }
        else {
            tempObj = {
                finish_registration: true,
                my_ideal_person: {
                    from_age: fromAgeRef.current.value,
                    to_age: toAgeRef.current.value,
                    gender: genderRef.current.value
                }
            }

        }


        let url = apiUrl+'/users/update';
        doApiPostToken(url, tempObj)
            .then(data => {
                if (data.ok === 1) {
                    history.push('/home');
                    window.location.reload();


                }
                else if (data.message) {
                    console.log(data.message);
                }
                else {
                    console.log(data);
                }
            })
    }

    const checkAges = () => {
        if (fromAgeRef.current.value !== "" && toAgeRef.current.value === "") {
            document.getElementById("toAgeId").style.border = "2px solid red";
            document.getElementById("btn").disabled = true;
            document.getElementById("btn").style.backgroundColor = "grey";
        }
        else {
            document.getElementById("toAgeId").style.border = "none";
        }
        if (fromAgeRef.current.value === "" && toAgeRef.current.value !== "") {
            document.getElementById("fromAgeId").style.border = "2px solid red";
            document.getElementById("btn").disabled = true;
            document.getElementById("btn").style.backgroundColor = "grey";
        }
        else {
            document.getElementById("fromAgeId").style.border = "none"
        }
        if (fromAgeRef.current.value !== "" && toAgeRef.current.value !== "") {
            if (fromAgeRef.current.value > toAgeRef.current.value) {
                document.getElementById("msgAge").innerHTML = "&#10007;"
                document.getElementById("btn").disabled = true;
                document.getElementById("btn").style.backgroundColor = "grey";

            }
            else {
                document.getElementById("btn").disabled = false;
                document.getElementById("btn").style.backgroundColor = "dodgerblue";
                document.getElementById("msgAge").innerHTML = ""
            }
        }
        if (fromAgeRef.current.value === "" && toAgeRef.current.value === "") {
            document.getElementById("btn").disabled = false;
            document.getElementById("btn").style.backgroundColor = "dodgerblue";
            document.getElementById("msgAge").innerHTML = ""
        }

    }




    return (
        <div className="App register">
            <div className="container">
                <div className="register-item">
                    <form onChange={checkAges} className="round-reg">

                        <h2 style={{ textAlign: "center" }}>What connections are you looking for? </h2>

                        <h3 style={{ color: "red" }}>* Questions (optional)</h3>
                        <p style={{ color: "gray" }}><i style={{ marginRight: "5px", fontSize: "23px" }} className="fa fa-eye"></i>This info be visible to others</p>

                        <div className="label-register"><div className="input-name-reg">From age</div><div className="msg-reg" id="msgAge"></div></div><br></br>

                        <input id="fromAgeId" ref={fromAgeRef} className="input-register" type="number" min="18" max="120"></input>
                        <div className="label-register"><div className="input-name-reg">To age</div></div><br></br>

                        <input id="toAgeId" ref={toAgeRef} className="input-register" type="number" min="18" max="120"></input>

                        <div className="label-register"><div className="input-name-reg">Gender</div><div className="msg-reg" id="msgGender"></div></div><br></br>
                        <select ref={genderRef} className="input-register" selected defaultValue  >
                            <option defaultValue="-select gender-" > -select gender- </option>
                            <option defaultValue="Man">Man</option>
                            <option defaultValue="Woman">Woman</option>
                        </select>
                        <br></br>

                        <button style={{ backgroundColor: "dodgerblue", marginBottom: "214px" }} className="btn-register" onClick={(e) => { sendLookingFor(e) }} id="btn" type="submit" value="Next">Next</button>


                    </form>

                </div>
            </div>
        </div>
    );
}

export default LookingFor;