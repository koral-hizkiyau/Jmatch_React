import React, { useRef, useEffect } from 'react';

import './App.css';
import './style/css/landing.css';
import { useHistory } from 'react-router-dom';


import Typed from 'react-typed';

import { Link } from 'react-router-dom';

import { doApiPost, doApiGetToken, apiUrl } from './services/apiService';
import { parseJwt } from './admin_comps/js/data'

import $ from "jquery"
import NavRand from './NavRand';
import Footer from './Footer';




function LandingPage() {

    let emailRef = useRef();
    let passRef = useRef();

    let history = useHistory();








    useEffect(() => {

            
        let url1 = apiUrl + '/admins';
        let url = apiUrl + '/users';

        document.getElementById("signBtn").disabled = true;

        if (localStorage[process.env.REACT_APP_LOCALHOST_KEY]) {
            if (window.location.pathname === "/") {
                let token = parseJwt(localStorage[process.env.REACT_APP_LOCALHOST_KEY])
                doApiGetToken(url1)
                    .then(data => {
                        let count = 0;
                        data.map(item => {
                            if (item.email === token.email) {
                                count++;
                            }
                        })
                        if (count > 0) {
                            document.location.href = "/admin"
                        }
                    })
                doApiGetToken(url)
                    .then(data => {
                        let count = 0;
                        data.map(item => {
                            if (item.email === token.email) {
                                count++;
                            }
                        })
                        if (count > 0) {
                            document.location.href = "/home"
                        }
                    })
            }
        }
    }, [])

    const sendLoginForm = (event) => {
        event.preventDefault();

        let bodyData = {
            email: emailRef.current.value,
            password: passRef.current.value
        }
        let url = apiUrl+'/users/login';
        let urlAdmins = apiUrl+'/admins/login';

        doApiPost(url, bodyData)
            .then(data => {
                console.log(data);
                //אומר שהצלחנו לקבל טוקן
                if (data.token) {
                    console.log(data.token)
                    localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, data.token);
                    
                  
                    // לעשות כאן שמשתמש חסום לא יוכל להתחבר לאתר
                    history.push("/home")
                    $('body').removeClass('modal-open');
                    $('div').removeClass('modal-backdrop');
                    window.location.reload();
                }
                else {
                    doApiPost(urlAdmins, bodyData)
                        .then(data => {
                            if (data.token) {
                                localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, data.token);
                                history.push("/admin")
                                $('body').removeClass('modal-open');
                                $('div').removeClass('modal-backdrop');
                                window.location.reload();

                            }
                            else {
                                $("#wrongData").show();
                            }
                        })
                }
            })
        console.log(bodyData);
    }

    const onChangeLoginform = () => {
        $("#wrongData").hide();
        if (emailRef.current.value !== "" && passRef.current.value !== "") {
            console.log("tes")
            document.getElementById("signBtn").disabled = false;
            document.getElementById("signBtn").style.backgroundColor = "rgb(0, 0, 191)"
        }
        else {
            document.getElementById("signBtn").disabled = true;
            document.getElementById("signBtn").style.backgroundColor = "grey"
        }
    }

    const forgotPass=()=>{
        history.push("/users/forgotPassword")


        $('body').removeClass('modal-open');
        $('div').removeClass('modal-backdrop');
        window.location.reload();
    }

    return (
        <>
            <NavRand />
             <div className="hero" id="home" >
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-sm-12 col-md-5">
                            <div className="hero-content">
                                <div className="hero-text">
                                    <p>We are</p>
                                    <img id="img-l" style={{ display: "block" }} src={require('./images/logo4.png')} width="70%" />

                                    {/* <h1>Jmatch</h1> */}
                                    <h2>
                                        <Typed
                                            strings={['Social Networking', 'Dating site', 'Meet new people anytime', 'Anywhere!']}
                                            typeSpeed={40}
                                            backSpeed={50}
                                            loop
                                        />
                                    </h2>
                                </div>

                                <div className="hero-btn">
                                    <Link className="btn-lan btn-join" to='/register'><b>JOIN US</b></Link>
                                    <a data-toggle="modal" data-target="#myModal" className="btn-lan btn-sign" href="">Sign In</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-7 d-none d-md-block">
                            <div className="hero-image">
                                <img src={require('./images/layout.png')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">

                        <button style={{ textAlign: "right", padding: "14px", fontSize: "40px" }} type="button" className="close" data-dismiss="modal">&times;</button>

                        <h2 style={{ textAlign: "center", margin: "0" }}>Enter email and password</h2>
                        <div className="modal-body">
                            {/*style="display: flex; flex-direction: column; width: 50%; margin: auto;"*/}
                            <div onChange={onChangeLoginform} style={{ display: "flex", flexDirection: "column", width: "55%", margin: "auto" }}>
                                <p style={{ margin: "0", fontWeight: "bold" }}>Email</p>
                                <input ref={emailRef} style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "4px", resize: "vertical", boxShadow: "0 2px 5px rgba(0, 0, 0, .3)" }} type="text" placeholder="Email" ></input>
                                <p style={{ margin: "0", fontWeight: "bold", marginTop: "15px" }}>Password</p>
                                <input ref={passRef} style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "4px", resize: "vertical", boxShadow: "0 2px 5px rgba(0, 0, 0, .3)" }} type="password" placeholder="password" ></input>
                                <p id="wrongData" style={{paddingTop:"11px", color:"red", display:"none"}}>That email or password is incorrect.</p>

                                <button id="signBtn" onClick={sendLoginForm} style={{ backgroundColor: "grey", padding: "12px", borderRadius: "3px", fontWeight: "bold", border: "2px solid white", color: "white", marginTop: "48px" }} >Sign in</button>
                               <p style={{ fontWeight: "bold", textAlign: "center", color: "blue", marginTop: "10px", cursor:"pointer" }} onClick={forgotPass}>FORGOT PASSWORD?</p>
                                {/* <p style={{ textAlign: "center" }}>OR</p> */}
                                {/* <input style={{ backgroundColor: "#0000bf", padding: "12px", borderRadius: "3px", fontWeight: "bold", border: "2px solid white", color: "white", marginTop: "-6px" }} type="button" defaultValue="Log in with facebook"></input> */}
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>

            <Footer/>

        </>

    );
}

export default LandingPage;