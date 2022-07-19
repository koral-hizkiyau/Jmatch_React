import React, { useRef, useState, useEffect } from 'react';
import { apiUrl, doApiGet, doApiPost } from '../services/apiService';
import { useHistory } from 'react-router-dom';
import { checkEmail, checkOnlyNumbers, checkOnlyLetters } from "../register_comps/js/checkData";



import { useSelector } from "react-redux";
import NavRand from '../NavRand';




function Login(props) {
    let [registeredUsers, setRegisteredUsers] = useState([]);
    let [registeredAdmins, setRegisteredAdmins] = useState([]);

    let [userId, setUserId] = useState([]);
    let [adminId, setAdminId] = useState(null);

    let myform = useRef(null);
    let history = useHistory();

    let userData = useSelector((myStore) => myStore)

    let emailRef = useRef();
    let passwordRef = useRef();

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
    const sendLoginForm = (event) => {
        console.log(userData);
        event.preventDefault();

        let bodyData = {
            email: event.target.id_email.value,
            password: event.target.id_password.value
        }
        let url = apiUrl+'/users/login';
        let urlAdmins = apiUrl+'/admins/login';

        doApiPost(url, bodyData)
            .then(data => {
                //אומר שהצלחנו לקבל טוקן
                if (data.token) {
                    localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, data.token);
                    history.push("/newPassword")
                }
                else {
                    doApiPost(urlAdmins, bodyData)
                        .then(data => {
                            if (data.token) {
                                localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, data.token);
                                history.push("/newPassword")
                            }
                            else {
                                alert("Email or password are wrong")
                            }
                        })
                }
            })
    }
    const getId = () => {
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
    let pas = false;
    let em2 = false;
    let em3=false;
    const sendEmails = (email) => {

        let massageEmail = document.getElementById("msgEmail");
        let massagePass = document.getElementById("msgPass");

        let validE = checkEmail(email)

        // בודק שהקלט אימייל תקין
        if (validE === true ) {
            if (em2===false) {
                for (let i = 0; i < registeredUsers.length; i++) {
                    if (email === registeredUsers[i].email) {
                        massageEmail.innerHTML = "&#10004;";
                        massageEmail.style.color = "pink";
                        em3=true;
                        break;
                    }
                    else {
                        massageEmail.style.color = "red";
                        massageEmail.innerHTML = " The email not found";
                    }
                }
            }
           if(em3===false) {
                for (let i = 0; i < registeredAdmins.length; i++) {
                    if (email === registeredAdmins[i].email) {
                        massageEmail.innerHTML = "&#10004;";
                        massageEmail.style.color = "pink";
                        em2=true;
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

        if (passwordRef.current.value.length >= 8 && checkOnlyNumbers(passwordRef.current.value) && checkOnlyLetters(passwordRef.current.value)) {
            massagePass.style.color = "pink"
            massagePass.innerHTML = "&#10004;";
            pas = true;
            console.log("d")
        }
        else {
            if (checkOnlyNumbers(passwordRef.current.value) === false && passwordRef.current.value.length >= 8) {
                massagePass.innerHTML = "only numbers";
            }
            else if (passwordRef.length < 8) {
                massagePass.innerHTML = "less than 8 numbers";
            }
            pas = false;
            console.log("n")

        }

        if ((em2 === true || em3 === true) && pas === true) {
            document.getElementById("btn1").disabled = false;
            document.getElementById("btn1").style.color = "white";
            document.getElementById("btn1").style.backgroundColor = "dodgerblue";
        }



    }
    return (
        <>
        <NavRand/>
        <div className="register" style={{ paddingTop: "12rem" ,background:"bottom"}}>
            <div className="container">
                <div className="register-item">
                    <div className="round-reg">
                        <form onSubmit={sendLoginForm} onChange={() => getId()}>
                            <div className="label-register"><div className="input-name-reg">Email</div><div className="msg-reg" id="msgEmail"></div></div><br></br>
                            <input className="input-register" id="id_email" ref={emailRef} type="text" placeholder="your_mail@example.com" ></input>
                            <br /><br />

                            <div className="label-register"><div className="input-name-reg">Password</div> <div className="msg-reg" id="msgPass"></div></div><br></br>
                            <input className="input-register" id="id_password" ref={passwordRef} type="password" placeholder="8 characters minimum, at least 1 letter"></input>

                            <button id="btn1" className="btn-register" >Login</button>
                        </form>
                    </div></div></div></div>
                    </>

    )

}

export default Login;