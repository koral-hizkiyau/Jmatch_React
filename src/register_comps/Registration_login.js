import React, { useEffect, useRef } from 'react';
import { apiUrl, doApiPost } from '../services/apiService';
import { useHistory } from 'react-router-dom';

import '../style/css/register.css';



import { useSelector } from "react-redux";
import NavRand from '../NavRand';
import { parseJwt } from '../style/js/help';




function Registration_login() {

    let emailRef = useRef();
    let passRef = useRef();

    let history = useHistory();

    let userData = useSelector((myStore) => myStore);


    // איתחול הכפתור שליחה ללא פעיל
    useEffect(() => {
        document.getElementById("btn").disabled = true;
        document.getElementById("btn").style.backgroundColor = "grey";


    }, [])




    const sendLoginForm = async(event) => {
        console.log(userData);
        event.preventDefault();
        let bodyData = {
            email: event.target.email.value.toLowerCase(),
            password: event.target.password.value
        }
        let url = apiUrl+'/users/login';

        doApiPost(url, bodyData)
            .then(data => {
                //אומר שהצלחנו לקבל טוקן
                if (data.token) {
                    localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, data.token);                               
                    history.push("/categories")

                }
                else {
                    console.log(data)
                    alert("That email or password is incorrect")
                }
            })
            if (localStorage[process.env.REACT_APP_LOCALHOST_KEY]) {
            let email = bodyData.email;
            let localhost = window.location.origin;
            
            let url1 = apiUrl + "sendmails/loginAccess";
            const response = await fetch(url1, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email, localhost })
            });
            const resData = await response.json();
            if (resData.status === 'success') {

            } else if (resData.status === 'rejected') {
                alert("Message failed to send")
            }
        }
           
    }

    const changeLogin = () => {
        if (emailRef.current.value.length > 0 && passRef.current.value.length > 0) {
            document.getElementById("btn").disabled = false;
            document.getElementById("btn").style.color = "white";
            document.getElementById("btn").style.backgroundColor = "dodgerblue";
        }
        else {
            document.getElementById("btn").disabled = true;
            document.getElementById("btn").style.backgroundColor = "grey";
        }

    }

    return (
        <>
            <NavRand />
            <div className="register">
                <div className="container">
                    <div className="register-item" style={{ paddingBottom: "260px" }}>
                        <div className="round-reg">

                            <form onChange={changeLogin} onSubmit={sendLoginForm}>
                                <h2>Login</h2>
                                <div className="label-register"><div className="input-name-reg">Email</div>  <div className="msg-reg" id="msgEmail"></div></div><br></br>
                                <input ref={emailRef} className="input-register" type="text" name="email" placeholder="your_mail@example.com"></input>

                                <br></br>


                                <div className="label-register"><div className="input-name-reg">Password</div>  <div className="msg-reg" id="msgPass"></div></div><br></br>
                                <input ref={passRef} className="input-register" type="password" name="password" ></input>

                                <br></br>


                                <button className="btn-register" id="btn" type="submit">Login</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )

}

export default Registration_login;