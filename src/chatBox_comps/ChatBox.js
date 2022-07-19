import React, { useState, useEffect, useRef } from 'react';
import '../style/css/chat.css';
import MsgPost from './MsgPost';
import $ from "jquery"
import { useHistory, Link } from 'react-router-dom';

import MsgGet from './MsgGet';
import { getAge, parseJwt } from '../style/js/help';
import { doApiPostToken, doApiGet, apiUrl } from '../services/apiService';
import moment from 'moment';
import io from 'socket.io-client';
const ENDPOINT = "http://localhost:4002/";


function ChatBox(props) {

    const socket = io(ENDPOINT);

    let singleMsgRef = useRef();





    let [userChatData, setUserChatData] = useState([]);

    let [msgs, setMsgs] = useState([])

    let [ownerId, setOwnerId] = useState(null);

    let [boxIdState, setBoxIdState] = useState(null)

    let history = useHistory();

    let scro = document.getElementById("id-scroll");

    let [adminS, setAdminS] = useState(true);




    useEffect(() => {

        if (JSON.parse(localStorage.getItem("newMsgs")) > 0) {
            localStorage.setItem("newMsgs", 0);
            window.location.reload();
        }



        socket.on("out put admin msg", data => {
            console.log(data)
            if (localStorage.getItem("adminStatus") === "true") {
                console.log("yes")
                localStorage.setItem("count", JSON.parse(localStorage.getItem("count")) + 1);

                if (JSON.parse(localStorage.getItem("count")) % 2 === 0) {

                    let msg = data.newMsg;

                    // הדיב העוטף
                    let rDiv = document.createElement("DIV");

                    // הדיב הפנימי
                    let iDiv = document.createElement("DIV");
                    rDiv.appendChild(iDiv)

                    // בתוך הדיב הפנימי
                    // let span = document.createElement("SPAN");
                    // span.innerHTML += nowTime;

                    let textnode = document.createTextNode(msg);
                    rDiv.style.marginBottom = "1.5rem"
                    rDiv.style.display = "flex"
                    iDiv.style.marginTop = "auto";
                    iDiv.style.marginBottom = "auto";
                    iDiv.style.marginRight = "10px";
                    iDiv.style.marginLeft = "10px"
                    iDiv.style.padding = "13px";
                    iDiv.style.position = "relative"
                    // span.style.position = "absolute"
                    // span.style.right = "0"
                    // span.style.bottom = "-15px"
                    // span.style.fontSize = "10px"

                    iDiv.appendChild(textnode);
                    // iDiv.appendChild(span);

                    rDiv.style.justifyContent = "flex-start"
                    iDiv.style.borderRadius = "24px 24px 24px 4px";
                    iDiv.style.backgroundColor = "#cce1ff";

                    if (document.getElementById("id-scroll") !== null) {
                        document.getElementById("id-scroll").appendChild(rDiv);

                        document.getElementById("id-scroll").style.scrollBehavior = "smooth"

                        document.getElementById("id-scroll").scrollTop += 300;

                    }


                    history.push("/chatbox/" + props.match.params.id)

                }


            }
        })




        socket.on("out put", msgBackEnd => {
            let token = parseJwt(localStorage[process.env.REACT_APP_LOCALHOST_KEY]);

            if (window.location.pathname === "/chatbox/" + msgBackEnd.boxId) {
                document.getElementById("id-scroll").scrollTop += document.getElementById("id-scroll").scrollHeight + 100;


            }

            // document.getElementById("id-scroll").scrollTop += scrollCount;
            // history.push("/chatbox/" + props.match.params.id)

            if (props.match.params.id === msgBackEnd.boxId && window.location.pathname==="/chatbox/" + msgBackEnd.boxId) {

                if (msgBackEnd.userPost !== token._id) {
                    localStorage.setItem("count", JSON.parse(localStorage.getItem("count")) + 1);

                    if (JSON.parse(localStorage.getItem("count")) % 2 === 0) {
                        // window.location.reload();

                        let msg = msgBackEnd.messages.msg;
                        // let nowTime = msgBackEnd.messages.time;

                        // הדיב העוטף
                        let rDiv = document.createElement("DIV");

                        // הדיב הפנימי
                        let iDiv = document.createElement("DIV");
                        rDiv.appendChild(iDiv)

                        // בתוך הדיב הפנימי
                        // let span = document.createElement("SPAN");
                        // span.innerHTML += nowTime;

                        let textnode = document.createTextNode(msg);
                        rDiv.style.marginBottom = "1.5rem"
                        rDiv.style.display = "flex"
                        iDiv.style.marginTop = "auto";
                        iDiv.style.marginBottom = "auto";
                        iDiv.style.marginRight = "10px";
                        iDiv.style.marginLeft = "10px"
                        iDiv.style.padding = "13px";
                        iDiv.style.position = "relative"
                        // span.style.position = "absolute"
                        // span.style.right = "0"
                        // span.style.bottom = "-15px"
                        // span.style.fontSize = "10px"

                        iDiv.appendChild(textnode);
                        // iDiv.appendChild(span);

                        rDiv.style.justifyContent = "flex-start"
                        iDiv.style.borderRadius = "24px 24px 24px 4px";
                        iDiv.style.backgroundColor = "#cce1ff";


                        document.getElementById("id-scroll").appendChild(rDiv);

                        document.getElementById("id-scroll").style.scrollBehavior = "smooth"

                        document.getElementById("id-scroll").scrollTop += 300;

                        history.push("/chatbox/" + props.match.params.id)

                    }
                }
            }
        })


        let chatBoxId = props.match.params.id;
        setBoxIdState(chatBoxId);

        let token = parseJwt(localStorage[process.env.REACT_APP_LOCALHOST_KEY])

        setOwnerId(token._id)

        let url = apiUrl+'/msgs/single/' + props.match.params.id;
        doApiGet(url)
            .then(data => {
                if (data._id) {
                    if (data.admin_status) {
                        localStorage.setItem("adminStatus", true);
                    }
                    else {
                        localStorage.setItem("adminStatus", false)
                    }
                    setAdminS(data.admin_status);

                    // console.log(window.location.pathname==="/chatbox/")
                    // document.getElementById("id-scroll").style.scrollBehavior = "smooth";
                    document.getElementById("id-scroll").scrollTop += document.getElementById("id-scroll").scrollHeight;

                    if (data.userA.id !== token._id) {
                        setUserChatData(data.userA)
                    }
                    else {
                        setUserChatData(data.userB)
                    }
                    setMsgs(data.messages)

                }
                else if (data.message) {
                }
                else {
                    console.log(data);
                }
            })


    }, [scro]);




    // פונקציה המתרחשת כאשר משתמש שלח הודעה למשתמש אחר
    const sendMsg = () => {

        let msg_arr = msgs;

        let singleMsgObj = {
            time: moment(),
            msg: singleMsgRef.current.value,
            userPost: ownerId
        }

        let newLastTimeM = moment();


        msg_arr.push(singleMsgObj);

        let updateObj = {
            messages: msg_arr,
            boxId: boxIdState,
            userGet: userChatData.id,
            userPost: ownerId,
            lastTimeChat: newLastTimeM
        }

        console.log(updateObj);

        let urlMsg = apiUrl+'/msgs/update';
        doApiPostToken(urlMsg, updateObj)
            .then(data => {
                console.log(data);
                if (data.ok === 1) {
                    console.log("update msgs");
                    $("#chat-input").val("");
                    socket.emit("Set new msg", {
                        updateObj
                    });
                }
                else if (data.message) {
                    console.log(data.message);
                    alert("Problem");
                }
                else {
                    console.log(data);
                    alert("there is already user in this name")
                }
            })

        let userGetAlert = userChatData.id

        socket.emit("alert", {
            boxIdState,
            userGetAlert
        });

        history.push("/chatbox/" + props.match.params.id)
    }

    const goToPro = () => {

        if (adminS === false) {

            history.push("/profile/" + userChatData.id)
            window.location.reload();

        }



    }



    return (

        <div className="card"  >
            <div style={{ background: "lightsteelblue" }} className="card-header msg_head">
                <div className="d-flex bd-highlight">
                    <div style={{ cursor: adminS === true ? "unset" : "pointer" }} onClick={goToPro} className="img_cont">
                        <img src={apiUrl+'/images/users_imgs/' + userChatData.img} className="rounded-circle user_img" />
                        {/* <img src="https://m.media-amazon.com/images/M/MV5BODg3MzYwMjE4N15BMl5BanBnXkFtZTcwMjU5NzAzNw@@._V1_.jpg"
                            className="rounded-circle user_img"></img> */}
                        <span style={{ display: "none" }} className="online_icon"></span>
                    </div>
                    <div className="user_info">
                        <span>{userChatData.name}  {adminS ? null : "," + getAge(userChatData.date_of_birth)}</span>

                    </div>

                </div>
                {adminS ? null :
                    <span style={{ display: "none" }} id="action_menu_btn"><i className="fa fa-ellipsis-v"></i></span>
                }
                <div className="action_menu">
                    <ul>
                        <li><i className="fas fa-user-circle"></i> View profile</li>
                        <li><i className="fas fa-users"></i> Add to close friends</li>
                        <li><i className="fas fa-plus"></i> Add to group</li>
                        <li><i className="fas fa-ban"></i> Block</li>
                    </ul>
                </div>
            </div>

            {/* message chat */}

            <div id="id-scroll" className="card-body msg_card_body">
                <div className="d-flex mb-4" style={{ justifyContent: "center" }}>
                    {adminS ? null :
                        <div style={{ fontSize: "20px", backgroundColor: "cornflowerblue", color: "white", paddingRight: "10px", paddingLeft: "10px", borderRadius: "17px" }}>It's a match!</div>
                    }
                </div>

                {ownerId === null ? null : msgs.map(post => {
                    if (post.userPost === ownerId) {
                        return (
                            <MsgGet
                                pmsg={post.msg}
                                key={post.id + post.msg}
                            />
                        )
                    }
                    else {
                        return (
                            <MsgPost
                                pmsg={post.msg}
                                key={post.id + post.msg}
                            />
                        )
                    }

                })}

                {/* <MsgSend />
            <MsgUser /> */}
            </div>
            {adminS ? null :

                <div style={{ backgroundColor: "rgba(39,80,250,0.2)" }} className="card-footer">
                    <div className="input-group">

                        <textarea ref={singleMsgRef} id="chat-input" name="" className="form-control type_msg"
                            placeholder="Type your message..." autoFocus></textarea>
                        <div className="input-group-append" >
                            <span onClick={sendMsg} className="input-group-text send_btn" style={{ backgroundColor: "rgba(39,80,250,0.3)" }} ><i className="fa fa-location-arrow" aria-hidden="true"></i></span>
                        </div>
                    </div>
                </div>

            }
        </div>

    );
}

export default ChatBox;
