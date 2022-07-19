import React, { useRef, useEffect } from 'react';
import './App.css';
import DeleteAccount from './support_comps/DeleteAccount';
import EnoughMatch from './support_comps/EnoughMatch';
import HideConvers from './support_comps/HideConvers';
import Photorules from './support_comps/Photorules';
import SeeLikes from './support_comps/SeeLikes';
import SignIn from './support_comps/SignIn';
import './style/css/support.css'
import { apiUrl } from './services/apiService';
import Nav from './Nav';
import NavRand from './NavRand'
import Footer from './Footer';



function Support() {

    let emailRef = useRef(1);
    let commentRef = useRef(1);
    let titleRef = useRef(1);
    let myform = useRef(null);

    useEffect(() => {

      

    }, [])






    const submitRequest = async (e) => {
        e.preventDefault();
        let email = emailRef.current.value;
        let message = commentRef.current.value;
        let title = titleRef.current.value;

        let url = apiUrl + "sendmails/access";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, title, message })
        });
        const resData = await response.json();
        if (resData.status === 'success') {
            alert("Message Sent");
            myform.current.reset();
        } else if (resData.status === 'rejected') {
            alert("Message failed to send")
        }

    }








    return (
        <>
        {localStorage[process.env.REACT_APP_LOCALHOST_KEY]? <Nav/> : <NavRand/>}
        <div style={{ position: "relative", width: "100%", padding: "120px 0 0 0", backgroundColor: "#f3f5f9" }}>
            <SeeLikes />
            <SignIn />
            <Photorules />
            <DeleteAccount />
            <EnoughMatch />
            <HideConvers />

            <div style={{ display: "flex", justifyContent: "center", boxShadow: "0 1px 6px rgba(0, 0, 0, 0.175)", width: "65%", margin: "auto", backgroundColor: "#fff", flexDirection: "column" }}>
                <h1 style={{ textAlign: "center", paddingTop: "38px" }}>Search for help</h1>
                <div style={{ display: "flex", justifyContent: "center" }}>

                    <div style={{ padding: "30px", fontSize: "17px" }}>
                        <div className="roundDiv-sup" data-toggle="modal" data-target="#myModal1">
                            <i className="fa fa-question-circle-o fafa-st-sup"></i><p className="p-supp">How to delete your account</p>
                        </div>
                        <div className="roundDiv-sup" data-toggle="modal" data-target="#myModal2">
                            <i className="fa fa-question-circle-o fafa-st-sup"></i><p className="p-supp" >How to see who likes you</p>
                        </div>
                        <div className="roundDiv-sup" data-toggle="modal" data-target="#myModal3" >
                            <i className="fa fa-question-circle-o fafa-st-sup"></i><p className="p-supp" >Photo rules</p>
                        </div>

                    </div>

                    <div style={{ padding: "30px", fontSize: "17px" }}>
                        <div className="roundDiv-sup" data-toggle="modal" data-target="#myModal4">
                            <i className="fa fa-question-circle-o fafa-st-sup"></i><p className="p-supp" >Sign-in troubleshooting</p>
                        </div>
                        <div className="roundDiv-sup" data-toggle="modal" data-target="#myModal5">
                            <i className="fa fa-question-circle-o fafa-st-sup"></i><p className="p-supp" >Why am I not seeing enough matches?</p>
                        </div>
                        <div className="roundDiv-sup" data-toggle="modal" data-target="#myModal6">
                            <i className="fa fa-question-circle-o fafa-st-sup"></i><p className="p-supp" >How to hide a conversation</p>
                        </div>

                    </div>

                </div>

                <div style={{ padding: "26px" }}>
                    <div className="container">
                        <form ref={myform}>
                            <h2>Do you have any question?</h2>
                            <button id="btn-supp" type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                <i className="fa fa-envelope" aria-hidden="true"></i> Send us mail</button>
                            <div className="modal fade" id="myModal">
                                <div className="modal-dialog">
                                    <div className="modal-content">

                                        <div style={{ backgroundColor: "mistyrose" }} className="modal-header">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <h4 style={{ fontSize: "20px", color: "brown" }} className="modal-title">Send us mail<i style={{ marginLeft: "10px" }} className="fa fa-envelope" aria-hidden="true"></i></h4>
                                                </div>
                                            </div></div>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-lg-12 py-3">
                                                    <div style={{ fontSize: "17px" }} className="input-name-reg">Email</div><div className="msg-reg" id="msgEmail"></div>
                                                    <input className="input-register" id="id_email" ref={emailRef} type="text" placeholder="your.mail@example.com"></input>
                                                </div>
                                                <div className="col-lg-12 py-3">
                                                    <div style={{ fontSize: "17px" }} className="input-name-reg">Subject</div><div className="title-reg" id="msgTitle"></div>
                                                    <input className="input-register" id="id_title" ref={titleRef} type="text"></input>
                                                </div>
                                                <div className="col-lg-12 py-3">
                                                    <div style={{ fontSize: "17px" }} className="input-name-reg">Content</div><div className="text-reg" id="msgTitle"></div>
                                                    <textarea className="input-register" name="comment" id="id_text" rows="5" cols="50" ref={commentRef} ></textarea>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ backgroundColor: "lightsteelblue" }} className="modal-footer">
                                            {/* <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={submitRequest}>Send</button>
                                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button> */}
                                            <button className="btn btn-primary btn-lg active" role="button" aria-pressed="true" data-dismiss="modal" onClick={submitRequest}>Send <i className="fa fa-send-o"></i></button>
                                            <button className="btn btn-secondary btn-lg active" role="button" aria-pressed="true" data-dismiss="modal">Close</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>


            </div>


        </div>

        <Footer/>

        </>

    );
}

export default Support;
