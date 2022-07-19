import React, { useState, useEffect, useRef } from 'react';
import '../style/css/chat.css';
import MsgSend from './MgsSend';
import $ from "jquery"
import { useHistory } from 'react-router-dom';



import MsgUser from './MsgUser';
import { getAge, parseJwt } from '../style/js/help';
import { apiUrl, doApiPostToken } from '../services/apiService';
import moment from 'moment';
import io from 'socket.io-client';
const ENDPOINT = "http://localhost:4002/";







function ChatSingle(props) {

    let scrollRef = useRef();

    //const socket;
    const socket = io(ENDPOINT);

    $("#id-scroll").scrollTop($("#id-scroll")[0].scrollHeight);   // לבדוק את זה





    let [singleMsg, setSingleMsg] = useState("");  // ההודעה הנוכחית שמשתמש מקליד



    let scro = document.getElementById("id-scroll");

    let [id_get, setId_get] = useState(null);

    let [scrollFlag, setScrollFlag] = useState(0)

    let [scrollCount, setScrollCount] = useState(200)

    let history = useHistory();





    useEffect(() => {


        socket.on("out put", msgBackEnd => {
            setScrollFlag(0)
            document.getElementById("id-scroll").scrollTop += scrollCount;
            // scro.scrollTop = scro.scrollHeight;
            // setScrollCount(scrollCount*2)


            // let navEle=document.getElementsByClassName("navbar");


            let token = parseJwt(localStorage[process.env.REACT_APP_LOCALHOST_KEY])
            console.log(token);

            if (msgBackEnd.userPost !== token._id) {

                let msg = msgBackEnd.messages.msg;
                let nowTime = msgBackEnd.messages.time;

                // הדיב העוטף
                let rDiv = document.createElement("DIV");

                // הדיב הפנימי
                let iDiv = document.createElement("DIV");
                rDiv.appendChild(iDiv)

                // בתוך הדיב הפנימי
                let span = document.createElement("SPAN");
                span.innerHTML += nowTime;

                let textnode = document.createTextNode(msg);
                rDiv.style.marginBottom = "1.5rem"
                rDiv.style.display = "flex"
                iDiv.style.marginTop = "auto";
                iDiv.style.marginBottom = "auto";
                iDiv.style.marginRight = "10px";
                iDiv.style.padding = "13px";
                iDiv.style.position = "relative"
                span.style.position = "absolute"
                span.style.right = "0"
                span.style.bottom = "-15px"
                span.style.fontSize = "10px"

                iDiv.appendChild(textnode);
                iDiv.appendChild(span);



                rDiv.style.justifyContent = "flex-start"
                iDiv.style.borderRadius = "24px 24px 24px 4px";
                iDiv.style.backgroundColor = "#cce1ff";
                document.getElementById("id-scroll").appendChild(rDiv);

                localStorage.setItem("render", "1")


                if (scro !== null) {
                    scro.scrollTop = scro.scrollHeight;
                }

            }
        }

        )


        if (props.all.userA.id !== props.accountHolder.id) {
            setId_get(props.all.userA.id)
        }
        else {
            setId_get(props.all.userB.id);
        }

        // $('.card-footer').append("<MsgUser style={{color:'red'}}>sss</MsgUser>");



        if (scro !== null) {
            scro.scrollTop = scro.scrollHeight;
            console.log(scro.scrollTop);


        }

        document.getElementById("id-scroll").focus();




        // document.getElementById("chat-input").focus();

    }, []);






    const onChangeInputMsg = (e) => {
        setSingleMsg(e.target.value)
    }



    // פונקציה המתרחשת כאשר משתמש שלח הודעה למשתמש אחר
    const sendMsg = () => {

        // socket.emit("notify", a => {
        //     console.log("hihi");
        // });


        // console.log(scro.scrollHeight);
        let msg_arr = props.allMsg;

        let singleMsgObj = {
            time: moment(),
            msg: singleMsg,
            userPost: props.accountHolder._id
        }

        msg_arr.push(singleMsgObj);

        console.log(id_get);
        console.log(props.accountHolder._id);

        let updateObj = {
            messages: msg_arr,
            boxId: props.all._id,
            userGet: id_get,
            userPost: props.accountHolder._id
        }

        let url2 = apiUrl+'/msgs/update';
        doApiPostToken(url2, updateObj)
            .then(data => {
                console.log(data);
                if (data.ok === 1) {
                    $("#chat-input").val("");

                    socket.emit("Set new msg", {
                        updateObj
                    });
                }
                else if (data.massage) {
                    console.log(data.massage);
                    alert("Problem");
                }
                else {
                    console.log(data);
                    alert("there is already user in this name")
                }
            })

        // history.push("/messages")

        // let scro = document.getElementById("id-scroll id-new-msg");
        // let msg = singleMsg;
        // let nowTime = singleMsgObj.time._d;
        // console.log(nowTime._d);
        // moment(item.date).format('DD/MM/YYYY')
        // moment(nowTime._d).format("dddd, MMMM Do YYYY, h:mm:ss a")

        // moment(nowTime._d).format("MMMM Do YYYY, h:mm:ss a")
        // console.log(nowTime);


        // מבקרה של שליחת הודעה של המשתמש עצמו

        // rDiv.style.justifyContent = "flex-end"
        // iDiv.style.borderRadius = "24px 24px 4px 24px";
        // iDiv.style.backgroundColor = "lightgrey";
        // document.getElementById("id-scroll").appendChild(rDiv)




        // socket.emit("alert", {
        //     updateObj
        // });      

    }


    const onKeyUp = (event) => {
        if (event.key === "Enter") {
            console.log(scro.scrollHeight);
            let msg_arr = props.allMsg;

            let singleMsgObj = {
                time: moment(),
                msg: singleMsg,
                userPost: props.accountHolder._id
            }

            msg_arr.push(singleMsgObj);

            console.log(id_get);
            console.log(props.accountHolder._id);

            let updateObj = {
                messages: msg_arr,
                boxId: props.all._id,
                userGet: id_get,
                userPost: props.accountHolder._id
            }

            history.push("/messages")


            $("#chat-input").val('');


            // socket.emit("Set new msg", {
            //     updateObj
            // });


            // socket.emit("alert", {
            //     updateObj
            // });      
        }
    }

    const scrollFunc = () => {
        // document.getElementById("id-scroll").focus()

        document.getElementById("id-scroll").style.scrollBehavior = "smooth"
        if (scrollFlag === 0) {
            scro.scrollTop = scro.scrollHeight;
            setScrollFlag(1)
        }


    }

    const tt = () => {
        console.log("tt");
        // if (scrollFlag == 0) {
        //     scro.scrollTop = scro.scrollHeight;
        //     setScrollFlag(1)
        // }

    }

    return (
        <div className="card" id="gg" onMouseOver={scrollFunc}>
            <div className="card-header msg_head">
                <div className="d-flex bd-highlight">
                    <div className="img_cont">
                        <img src="https://m.media-amazon.com/images/M/MV5BODg3MzYwMjE4N15BMl5BanBnXkFtZTcwMjU5NzAzNw@@._V1_.jpg"
                            className="rounded-circle user_img"></img>
                        <span className="online_icon"></span>
                    </div>
                    <div className="user_info">
                        <span>{props.name}, {getAge(props.date_of_birth)}</span>

                    </div>

                </div>
                <span id="action_menu_btn"><i className="fa fa-ellipsis-v"></i></span>
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

            <div ref={scrollRef} id="id-scroll" className="card-body msg_card_body">
                <div className="d-flex mb-4" style={{ justifyContent: "center" }}>
                    <div>It's a match!</div>
                </div>

                {props.allMsg === null ? null : props.allMsg.map(post => {
                    if (post.userPost === props.accountHolder._id) {
                        return (
                            <MsgUser
                                pmsg={post.msg}
                                key={post.id}
                            />
                        )
                    }
                    else {
                        return (
                            <MsgSend
                                pmsg={post.msg}
                                key={post.id}
                            />
                        )
                    }

                })}



                {/* <MsgSend />
                <MsgUser /> */}
            </div>
            <div className="card-footer">
                <div className="input-group">

                    <textarea onKeyPress={onKeyUp} onFocus={tt} defaultValue={singleMsg} onChange={onChangeInputMsg} id="chat-input" name="" className="form-control type_msg"
                        placeholder="Type your message..." autoFocus></textarea>
                    <div className="input-group-append" >
                        <span className="input-group-text send_btn" onClick={sendMsg}><i className="fa fa-location-arrow" aria-hidden="true"></i></span>
                    </div>
                </div>
            </div>
        </div>


    )

}

export default ChatSingle;