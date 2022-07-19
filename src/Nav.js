import React, { useEffect, useState } from 'react';
import './App.css';
import './style/css/nav.css';
import { apiUrl, doApiGetToken } from './services/apiService';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import $ from "jquery";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { parseJwt } from './style/js/help';



import io from 'socket.io-client';
const ENDPOINT = "http://localhost:4002/";



function Nav() {

    const socket = io(ENDPOINT);


    let [userData, setUserData] = useState({});
    // let [msgCount, setMsgCount] = useState(null);
    let [tok, setTok] = useState(0);


    let dispatch = useDispatch()


    let history = useHistory()

    // let [flagE, setFlagE] = useState(null);



    let linkArray = ["/home", "/discovey", "/youlike", "/chatbox", "/vip"];



    // const scrollFunc = () => {
    //     if (window.pageYOffset > 0) {
    //         document.getElementById("sticky-nav").classList.add("nav-sticky");
    //     }
    //     else {
    //         document.getElementById("sticky-nav").classList.remove("nav-sticky");
    //     }
    // }






    useEffect(() => {



        $(".count-msg").css({
            "color": "white", "background-color": "#fa50bc", "padding-left": "9px", "padding-right": "9px",
            "border": "2px solid white", "border-radius": "50%", "font-size": "11px"
        });



        socket.on("back alert", msgBackEnd => {
            let tokenUser = parseJwt(localStorage[process.env.REACT_APP_LOCALHOST_KEY])
            if (msgBackEnd.userGet === tokenUser._id) {

                // $(".count-msg").css({
                //     "color": "white", "background-color": "#fa50bc", "padding-left": "9px", "padding-right": "9px",
                //     "border": "2px solid white", "border-radius": "50%", "font-size": "11px"
                // });


                if (window.location.pathname == "/chatbox/" + msgBackEnd.boxId || window.location.pathname == "/chatbox") {
                    localStorage.setItem("newMsgs", 0)

                }
                else {
                    localStorage.setItem("newMsgs", JSON.parse(localStorage.getItem("newMsgs")) + 1)
                    history.push(window.location.pathname)

                }
            }
        })

        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {

            let token = parseJwt(localStorage[process.env.REACT_APP_LOCALHOST_KEY])
            setTok(token);



            let url = apiUrl+'/users/single';
            doApiGetToken(url)
                .then(data => {
                    if (data.first_name) {
                        if (data.vip.vip === true){
                            localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY_VIP, "0")

                        }
                        else{
                            localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY_VIP, "1")

                        }
                        setUserData(data)
                        dispatch({ type: "addData", userData: data, submitingType: "basicPlus" })

                    }
                  
                })

            pageChange(window.location.pathname)

        }

    }, [])



    const logoutUser = () => {
        localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
        document.location.href = "/"
    }


    const pageChange = (after) => {

        linkArray.map(item => {
            if (item === after) {
                document.getElementById(after).classList.add("active-n");
                document.getElementById(after).style["color"] = "#ff4dc4";
            }
            else {
                document.getElementById(item).classList.remove("active-n");
                document.getElementById(item).removeAttribute("style");
            }

        })

    }


    return (

        <div id="sticky-nav" className="navbar navbar-expand-lg bg-light navbar-light nav-sticky">
            <div className="container-fluid">
                <Link to='/home' onClick={() => pageChange("/home")}><img style={{ marginRight: "34px" }} src={require('./images/logo4.png')} width="169px" /></Link>

                <div style={{ display: "flex", alignItems: "center" }}>
                    {userData.image === undefined ? null :
                        <img style={{ borderRadius: "100px", width: "50px", marginRight: "6px", height: "48px" }} src={apiUrl+'/images/users_imgs/' + userData.image[0]} width="169px" />
                    }
                    {/* <img style={{ borderRadius: "100px", width: "50px", marginRight:"6px" }} src={require('./images/regina.jpg')} width="169px" /> */}

                    {/* <a style={{ fontSize: "18px", marginLeft: "-11px" }} href="index.html" className="nav-item nav-link"><b>
                  {userData === null ? null : userData.first_name}
                  <i className="fa fa-chevron-circle-down"></i>
              </b></a> */}


                    <NavDropdown title={<b>{userData.first_name}</b>} id="basic-nav-dropdown" style={{ fontSize: "18px", marginLeft: "-11px" }}>
                        <NavDropdown.Item id="drop" className="nav-item nav-link" href={`/my-profile`} style={{ fontSize: "18px", color: "white" }} onClick={() => pageChange("")}>My Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item id="drop" className="nav-item nav-link" onClick={logoutUser} style={{ fontSize: "18px", color: "white" }}>Sign Out</NavDropdown.Item>
                    </NavDropdown>

                </div>

                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                    <div className="navbar-nav ml-auto">
                        <Link id="/home" className="nav-item nav-link" to='/home' onClick={() => pageChange("/home")}><i style={{ marginRight: "5px" }} className="fa fa-sticky-note"></i>DoubleTake</Link>
                        <Link id="/youlike" className="nav-item nav-link" to='/youlike' onClick={() => pageChange("/youlike")}><i style={{ marginRight: "5px" }} className="fa fa-heart" aria-hidden="true"></i>Likes</Link>
                        <Link id="/discovey" className="nav-item nav-link" to='/discovery' onClick={() => pageChange("/discovey")}><i style={{ marginRight: "5px" }} className="fa fa-search"></i>Discovery</Link>
                        <Link id="/chatbox" className="nav-item nav-link" to='/chatbox' onClick={() => pageChange("/chatbox")}><i style={{ marginRight: "5px" }} className="fa fa-inbox"></i>Messages

                        {JSON.parse(localStorage.getItem("newMsgs")) == 0 ?
                                null : <span style={{color:"white",backgroundColor:"#fa50bc", paddingLeft:"9px", paddingRight:"9px",border:"2px solid white", borderRadius:"50%", fontSize:"11px"}} className="count-msg">{localStorage.getItem("newMsgs")}</span>
                            }

                        </Link>



                        <Link id="/vip" className="nav-item nav-link active-n" to='/vip' onClick={() => pageChange("/vip")}>VIP</Link>





                    </div>
                </div>
            </div>

        </div >

    );
}

export default Nav;