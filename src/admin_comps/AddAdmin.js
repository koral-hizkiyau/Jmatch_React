import React, { useEffect, useRef, useState } from 'react';
import { apiUrl, doApiGetToken, doApiPostToken, doPostImgs } from '../services/apiService';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { checkForm, uploadingImgs } from './js/addAdmin'
import '../style/css/register.css'



function AddAdmin() {


    let [valCity, setValCity] = useState([])
    let [registeredUsers, setRegisteredUsers] = useState([]);
    let [registeredUsersNotAdmin, setRegisteredUsersNotAdmin] = useState([]);

    let [userBasicDataState, setUserBasicDataState] = useState({});
    let dispatch = useDispatch()
    let [img_obj_names, SetImg_Obj_Names] = useState({});
    let [img_array, SetImg_Array] = useState([]);
    let [img_array_names, SetImg_Array_Name] = useState([]);



    // Refs
    let emailRef = useRef();
    let phoneRef = useRef();
    let passwordRef = useRef();
    let fnameRef = useRef();
    let genderRef = useRef();
    let bDateRef = useRef();
    let cityRef = useRef();
    let ownerRef = useRef();



    useEffect(() => {
        document.getElementById("btn1").disabled = true;
        document.getElementById("btn1").style.backgroundColor = "grey"

        let urlCities = apiUrl + "/cities";
        doApiGetToken(urlCities)
            .then(data => {
                setValCity(data);
            })

        let url = apiUrl+'/admins';
        Axios.get(url)
            .then(res => {
                setRegisteredUsers(res.data)
            });
            let url1 = apiUrl+'/users';
            Axios.get(url1)
                .then(res => {
                    setRegisteredUsersNotAdmin(res.data)
                });
            
    }, [])





    const sendImgsToServer = () => { 
            doPostImgs(img_array[img_array.length-1].file)
    }

    let sendForm = async(event) => {
        event.preventDefault();
        
        let bodyData = {
            first_name: event.target.id_name.value,
            email: event.target.id_email.value,
            gender: event.target.id_gender.value,
            phone: event.target.id_phone.value,
            password: event.target.id_password.value,
            city: event.target.id_city.value,
            date_of_birth: event.target.id_date.value,
            owner: (event.target.id_owner.value ==="True" ? true : false),
            image: img_obj_names
        }
        console.log(bodyData);

        let url = apiUrl + "/admins/add";

        doApiPostToken(url, bodyData)
            .then(data => {
                if (data.email) {
                    alert("admin add")
                    document.location.href = "/admin"

                }
                else if (data.message) {
                    console.log(data.massage);
                    alert("There is already admin in this email | phone")

                }

            })

            if (localStorage[process.env.REACT_APP_LOCALHOST_KEY]) {
                let email = bodyData.email;
                let localhost = window.location.origin;

                let url1 = apiUrl + "/sendmails/loginAccess";
                const response = await fetch(url1, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ email,localhost })
                });
                const resData = await response.json();
                if (resData.status === 'success') {

    
                } else if (resData.status === 'rejected') {
                    alert("Message failed to send")
                }
            }
    }

    return (
        <div className="register" style={{paddingTop: "12rem"}}>
        <div className="container">
        <div className="register-item">
        <div className="round-reg">
            <h2 ><b>Add a New Admin:</b></h2>
            <form onSubmit={sendForm} onChange={() => checkForm(emailRef.current.value, phoneRef.current.value, passwordRef.current.value,
                 fnameRef.current.value, genderRef.current.value, bDateRef.current.value, cityRef.current.value, ownerRef.current.value, img_array_names, registeredUsers, setUserBasicDataState,registeredUsersNotAdmin)}>

                <div className="label-register"><div className="input-name-reg">First name</div><div className="msg-reg" id="msgFname"></div></div><br></br>
                <input className="input-register" id="id_name" ref={fnameRef} type="text" />

                <div className="label-register"><div className="input-name-reg">Email</div>  <div className="msg-reg" id="msgEmail"></div></div><br></br>
                <input className="input-register" id="id_email" ref={emailRef} type="text" placeholder="your.mail@example.com"></input>
                <br /><br />

                <div className="row justify-content-md-center" onChange={e => uploadingImgs(e, SetImg_Obj_Names, img_array, img_array_names)}>
                    <div className="msg-reg" id="msgImage"></div>
                    <div className="col col-sm-8 round-img">
                        <input type="file" className="input-img" id="id-file"></input>
                        <img className="img-sty" id="id-img" />
                        <i className="fa fa-camera icon-sty" style={{ opacity: "0.4" }}></i>
                    </div>
                </div>

                <div className="label-register"><div className="input-name-reg">Gender</div><div className="msg-reg" id="msgGender"></div></div><br></br>
                <select className="input-register" id="id_gender" selected defaultValue ref={genderRef} >
                    <option> -select gender- </option>
                    <option defaultValue="Man">Man</option>
                    <option defaultValue="Woman">Woman</option>
                </select>

                <div className="label-register"><div className="input-name-reg">Phone</div> <div className="msg-reg" id="msgPhone"></div></div><br></br>
                <input className="input-register" id="id_phone" ref={phoneRef} type="text" placeholder="059-9999999"></input>


                <div className="label-register"><div className="input-name-reg">Password</div> <div className="msg-reg" id="msgPass"></div></div><br></br>
                <input className="input-register" id="id_password" ref={passwordRef} type="password" placeholder="8 characters minimum, at least 1 letter"></input>


                <div className="label-register"><div className="input-name-reg">City</div><div className="msg-reg" id="msgCity"></div></div><br></br>
                <select className="input-register" id="id_city" selected defaultValue ref={cityRef}>
                    <option> -select city- </option>
                    {valCity.map((city, i) => {
                        return (
                            <option key={i}>{city.city_name}</option>
                        )
                    })}
                </select>

                <div className="label-register"><div className="input-name-reg">Date of birth</div><div className="msg-reg" id="msgbDate"></div></div><br></br>
                <input className="input-register" ref={bDateRef} id="id_date" type="date" min="1950-01-01" max="2000-01-01"></input>
                <br></br>


                <div className="label-register"><div className="input-name-reg">Owner</div><div className="msg-reg" id="msgOwner"></div></div><br></br>
                <select className="input-register" id="id_owner" selected defaultValue ref={ownerRef} >
                    <option > -select- </option>
                    <option defaultValue="false">False</option>
                    <option defaultValue="true">True</option>
                </select>

                <button onClick={() => { sendImgsToServer() }} id="btn1" className="btn-register">Add Admin</button>
            </form>
        </div >
        </div>
        </div>
        </div>
    )
}

export default AddAdmin