import React, { useEffect, useRef, useState } from 'react';
import { apiUrl, doApiGetToken, doApiPostToken } from '../services/apiService';
import moment from 'moment';
import { checkForm } from "./js/faults";
import $ from "jquery";
import '../style/css/register.css'
import { parseJwt } from './js/data';

function Faults(props) {

    let [fault_ar, setFaultAr] = useState([]);
    let [counterApi, setCounterApi] = useState(0);
    let [adminName, setAdminName] = useState()
    let fnameRef = useRef();
    let emailRef = useRef();
    let descriptionRef = useRef();
    let faultTypeRef = useRef();
    let AfnameRef = useRef();


    useEffect(() => {
        document.getElementById("btn1").disabled = true;
        document.getElementById("btn1").style.backgroundColor = "grey"

        let token = parseJwt(localStorage[process.env.REACT_APP_LOCALHOST_KEY])

        let url1 = apiUrl + '/admins';
        doApiGetToken(url1)
            .then(data => {
                data.map(item => {
                if(token._id === item._id){                    
                setAdminName(item.first_name);
                }
            } )
            })


        let url = apiUrl + '/faults';
        doApiGetToken(url)
            .then(data => {
                setFaultAr(data);
            })

    }, [counterApi])

    let sendForm = (event) => {
        event.preventDefault();
        let bodyData = {
            first_name: event.target.id_name.value,
            email: event.target.id_email.value,
            fault_type: event.target.id_fault_type.value,
            fault_description: event.target.id_description.value,
            admin_name: adminName
        }

        let url = apiUrl + "/faults/add";

        doApiPostToken(url, bodyData)
            .then(data => {
                if (data.email) {
                    setCounterApi(counterApi + 1);
                    clearForm();
                }
                else if (data.message) {

                }

            })
    }

    //מאפס את הפורום
    const clearForm = () => {
        $("#myForm").trigger('reset');
        document.getElementById("msgFname").innerHTML = null;
        document.getElementById("msgEmail").innerHTML = null;
        document.getElementById("msgFaultType").innerHTML = null;
        document.getElementById("msgDescription").innerHTML = null;

    }


    return (
        <div className="register" style={{ paddingTop: "12rem" }}>
            <div className="container">
                <div className="register-item" >
                    <div className="round-reg">
                        <h2 ><b>Add a New Fault:</b></h2>
                        <form id="myForm" onSubmit={sendForm} onChange={() => checkForm(emailRef.current.value, fnameRef.current.value, faultTypeRef.current.value, descriptionRef.current.value)}>
                            <div className="label-register"><div className="input-name-reg">First Name</div><div className="msg-reg" id="msgFname"></div></div><br></br>
                            <input className="input-register" ref={fnameRef} id="id_name" type="text" />

                            <div className="label-register"><div className="input-name-reg">Email</div>  <div className="msg-reg" id="msgEmail"></div></div><br></br>
                            <input className="input-register" id="id_email" ref={emailRef} type="text" placeholder="your.mail@example.com"></input>

                            <div className="label-register"><div className="input-name-reg">Fault Type</div><div className="msg-reg" id="msgFaultType"></div></div><br></br>
                            <select className="input-register" id="id_fault_type" selected defaultValue ref={faultTypeRef} >
                                <option> -select type- </option>
                                <option defaultValue="System">System Fault</option>
                                <option defaultValue="Other">Other</option>
                            </select>

                            <div className="label-register"><div className="input-name-reg">Fault Description</div><div className="msg-reg" id="msgDescription"></div></div><br></br>
                            <textarea className="input-register" id="id_description" ref={descriptionRef} rows="10" cols="70" placeholder="Please detail the fault description"></textarea>
                       
                            <button id="btn1" className="btn-register">Add Admin</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="container" style={{ paddingBottom: "2rem" }}>
                <h2>Faults History: </h2>
                <table id="h" className="table table-striped" style={{ marginTop: "15px" }}>
                    <thead>
                        <tr>
                            <th className="align-middle"><b>Date</b></th>
                            <th className="align-middle"><b>First Name</b></th>
                            <th className="align-middle"><b>Email</b></th>
                            <th className="align-middle"><b>Fault Type</b></th>
                            <th className="align-middle"><b>Fault Description</b></th>
                            <th className="align-middle"><b>Admin Name</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {fault_ar.reverse().map((item, i) => {
                            return (
                                <tr key={item._id}>
                                    <td className="align-middle">{moment(item.date).format('DD/MM/YYYY')}</td>
                                    <td className="align-middle">{item.first_name}</td>
                                    <td className="align-middle">{item.email}</td>
                                    <td className="align-middle">{item.fault_type}</td>
                                    <td className="align-middle">{item.fault_description}</td>
                                    <td className="align-middle">{item.admin_name}</td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Faults