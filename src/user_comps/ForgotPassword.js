import React, { useEffect, useRef, useState } from 'react';
// import $ from "jquery"
import { checkEmail } from "../register_comps/js/checkData";
import { apiUrl, doApiGet, doApiPost, doApiPostToken } from '../services/apiService';
import { useHistory } from 'react-router-dom';
import NavRand from '../NavRand';

function ForgotPassword(props) {
    let [registeredUsers, setRegisteredUsers] = useState([]);
    let [registeredAdmins, setRegisteredAdmins] = useState([]);

    let [userId, setUserId] = useState([]);
    let [adminId, setAdminId] = useState(null);
    let history = useHistory();
    let myform = useRef(null);
    let emailRef = useRef();

    useEffect(() => {
        document.getElementById("btn1").disabled = true;
        document.getElementById("btn1").style.backgroundColor = "grey"

        let urlUsers = apiUrl + "/users";
        doApiGet(urlUsers)
            .then(data => {
                setRegisteredUsers(data)
            })
        let urlAdmins = apiUrl + "/admins";
        doApiGet(urlAdmins)
            .then(data => {
                setRegisteredAdmins(data)
            })
    }, [])


    const getId = (e) => {
        let email = emailRef.current.value;

        let idUser;
        let idAdmin;

        let urlUsers = apiUrl + "/users";
        doApiGet(urlUsers)
            .then(data => {
                idUser = data.filter(item => {
                    return (item.email === email)
                })
                setUserId(idUser)
            })
        let urlAdmins = apiUrl + "/admins";
        doApiGet(urlAdmins)
            .then(data => {
                idAdmin = data.filter(item => {
                    return (item.email === email)
                })
                setAdminId(idAdmin)
            })

        sendEmails(email);
    }
let em2 = false;
let em3 = false;
    const sendEmails = (emailRef) => {
        let massageEmail = document.getElementById("msgEmail");

        let validE = checkEmail(emailRef)

        // בודק שהקלט אימייל תקין
        if (validE === true) {

            if (em2 === false) {
                for (let i = 0; i < registeredUsers.length; i++) {
                    if (emailRef === registeredUsers[i].email) {
                        massageEmail.innerHTML = "&#10004;";
                        massageEmail.style.color = "pink";
                        em3 = true;                       
                        document.getElementById("btn1").disabled = false;
                        document.getElementById("btn1").style.color = "white";
                        document.getElementById("btn1").style.backgroundColor = "dodgerblue";
                        break;
                    }
                    else {
                        massageEmail.style.color = "red";
                        massageEmail.innerHTML = " The email not found";
                    }
                }
            }
            if(em3 === false) {
                for (let i = 0; i < registeredAdmins.length; i++) {
                    if (emailRef === registeredAdmins[i].email) {
                        massageEmail.innerHTML = "&#10004;";
                        massageEmail.style.color = "pink";
                        em2 = true;
                        document.getElementById("btn1").disabled = false;
                        document.getElementById("btn1").style.color = "white";
                        document.getElementById("btn1").style.backgroundColor = "dodgerblue";
                        break;
                    }
                    else {
                        massageEmail.style.color = "red";
                        massageEmail.innerHTML = " The email not found";
                    }
                }

            }
        }
        else {
            massageEmail.style.color = "red";
            massageEmail.innerHTML = " The email not found";

        }


    }


    const onSendResset = async (e) => {
        e.preventDefault();
        let email = emailRef.current.value;
        let obj;
        let password1 = Math.random().toString(36).substr(2, 9);
        let localhost = window.location.origin;
        
        if (userId.length !== 0) {
            obj = {
                _id: userId[0]._id,
                password: password1,
                localhost: localhost,
                user: "user"
            }
        }
        else {
            obj = {
                _id: adminId[0]._id,
                password: password1,
                localhost: localhost,
                user: "admin"
            }
        }

        let url = apiUrl + "/sendmails/forgotAccess";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password1 ,localhost })
        });
        const resData = await response.json();
        if (resData.status === 'success') {
            alert("Password sent to your email address!");

            let url1 = apiUrl+ '/users/updatePassword';
            doApiPost(url1, obj)
                .then(data => {
                    if (data.ok === 1) {
                        myform.current.reset();
                        history.push("/")
                    }
                })
        } else if (resData.status === 'rejected') {
            alert("Failed to send message")
        }

    }

    return (
        <>
        <NavRand/>
        <div className="register" style={{ paddingTop: "12rem", background:"bottom" }}>
            <div className="container">
                <div className="register-item">
                    <div className="round-reg">
                        <form ref={myform} onChange={(e) => getId(e)}>
                            <div className="label-register"><div className="input-name-reg">Enter email</div>  <div className="msg-reg" id="msgEmail"></div></div><br></br>
                            <input className="input-register" id="id_email" ref={emailRef} type="text" placeholder="your_mail@example.com"></input>
                            <br /><br />
                            <button id="btn1" className="btn-register" onClick={onSendResset}>Send me new password</button>
                        </form>
                    </div></div></div></div>
                    </>
    )
}

export default ForgotPassword