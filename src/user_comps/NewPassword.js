import React, { useRef, useState, useEffect } from 'react';
import { apiUrl, doApiGet, doApiPost } from '../services/apiService';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

import { checkEmail, checkOnlyNumbers, checkOnlyLetters } from "../register_comps/js/checkData";
import { parseJwt } from '../style/js/help';
import NavRand from '../NavRand';
function NewPassword(props) {
    let [registeredUsers, setRegisteredUsers] = useState([]);
    let [registeredAdmins, setRegisteredAdmins] = useState([]);

    let [userId, setUserId] = useState(null);
    let [adminId, setAdminId] = useState(null);

    let myform = useRef(null);
    let history = useHistory();

    let userData = useSelector((myStore) => myStore)

    let emailRef = useRef();
    let passwordRef = useRef();
    let password2Ref = useRef();

    
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
    const onSendResset = async (e) => {
        e.preventDefault();
        let token = parseJwt(localStorage[process.env.REACT_APP_LOCALHOST_KEY])

        let email = token.email;
        let obj;
        let password = e.target.id_password.value

        
        if(userId.length!==0){
         obj = {
            _id: userId[0]._id,
            password: password,
            user: "user"
        }
    }
    else{
         obj = {
            _id: adminId[0]._id,
            password: password,
            user: "admin"
        } 
    }
            let url1 = apiUrl+'/users/updatePassword';
            doApiPost(url1, obj)
                .then(data => {
                    if (data.ok === 1) {
                         let bodyData={
                            email: token.email,
                            password: password
                        }         
  let url = apiUrl+'/users/login';
        let urlAdmins = apiUrl+'/admins/login';

        doApiPost(url, bodyData)
            .then(data => {
                console.log(data);
                //אומר שהצלחנו לקבל טוקן
                if (data.token) {
                    localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, data.token);
                    history.push("/home")
                }
                else {
                    doApiPost(urlAdmins, bodyData)
                        .then(data => {
                            if (data.token) {
                                localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, data.token);
                                history.push("/admin")
                            }
                            else {
                                alert("user or pass are wrong")
                            }
                        })
                }
            })


                    }
                })
        

    }
    const sendLoginForm = (event) => {
        event.preventDefault();

    }
    const getId = () => {
        let token = parseJwt(localStorage[process.env.REACT_APP_LOCALHOST_KEY])


        let idUser;
        let idAdmin;

        let urlUsers = apiUrl + "/users";
        doApiGet(urlUsers)
            .then(data => {
                idUser = data.filter(item => {
                    return (item.email === token.email)
                })
                setUserId(idUser)
            })
        let urlAdmins = apiUrl + "/admins";
        doApiGet(urlAdmins)
            .then(data => {
                idAdmin = data.filter(item => {
                    return (item.email === token.email)
                })
                setAdminId(idAdmin)
            })

        sendEmails(token.email);
    }
    const sendEmails = (email) => {
        let pas = false;
        let password2 = false;

        let massagePass = document.getElementById("msgPass");

        
      

        if (passwordRef.current.value.length >= 8 && checkOnlyNumbers(passwordRef.current.value) && checkOnlyLetters(passwordRef.current.value)) {
            massagePass.style.color = "pink"
            massagePass.innerHTML = "&#10004;";
            pas = true;
        }
        else {
            if (checkOnlyNumbers(passwordRef.current.value) === false && passwordRef.current.value.length >= 8) {
                massagePass.innerHTML = "only numbers";
            }
            else if (passwordRef.length < 8) {
                massagePass.innerHTML = "less than 8 numbers";
            }
            pas = false;
        }

        // בודק שסיסמא שניה תואמת לסיסמא הראשונה
        let massagePass2 = document.getElementById("msgPass2");
        if (passwordRef.current.value === password2Ref.current.value && pas) {
            massagePass2.innerHTML = "&#10004;";
            massagePass2.style.color = "pink"
            password2 = true;
        }
        else {
            massagePass2.style.color = "red"
            massagePass2.innerHTML = "";
            password2 = false;
            document.getElementById("btn1").disabled = true;
            document.getElementById("btn1").style.backgroundColor = "grey"        }



        if (pas === true && password2 === true) {
            document.getElementById("btn1").disabled = false;
            document.getElementById("btn1").style.color = "white";
            document.getElementById("btn1").style.backgroundColor = "dodgerblue";
        }



    }
    return (
        <>
        <NavRand/>
        <div className="register" style={{ paddingTop: "12rem", background:"bottom" }}>
            <div className="container">
                <div className="register-item">
                    <div className="round-reg">
                        <form onSubmit={onSendResset} onChange={() => getId()}>                        

                            <div className="label-register"><div className="input-name-reg">New Password</div> <div className="msg-reg" id="msgPass"></div></div><br></br>
                            <input className="input-register" id="id_password" ref={passwordRef} type="password" placeholder="8 characters minimum, at least 1 letter"></input>

                            <div className="label-register"><div className="input-name-reg">Reset Password</div> <div className="msg-reg" id="msgPass2"></div> </div><br></br>
                            <input className="input-register" id="id_password2" ref={password2Ref} type="password" ></input>

                            <button id="btn1" className="btn-register" >Send Email</button>
                        </form>
                    </div></div></div></div>
                    </>

    )

}

export default NewPassword