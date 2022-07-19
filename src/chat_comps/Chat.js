import React, { useEffect, useState } from 'react';

import '../style/css/chat.css'
import Contact from './Contact';

import Axios from 'axios';
import ChatSingle from './ChatSingle';
import EmptyChat from './EmptyChat';
import $ from "jquery"





import { apiUrl, doApiGetToken } from '../services/apiService'

import {  useHistory } from 'react-router-dom'


import io from 'socket.io-client';
const ENDPOINT = "http://localhost:4002/";



function Chat() {

    const socket = io(ENDPOINT);


    let [contact_ar, setContact_ar] = useState([]);
    let [singleConversData, setSingleConversData] = useState(null);
    let [allMsg, setAllMsg] = useState(null)
    let [accountHolder, setAccountHolder] = useState(null);
    let [contact_msgs, setContact_msgs] = useState(null);

    let [renderFlag, setRenderFlag] = useState(0)

    let history = useHistory();


    useEffect(() => {






        socket.on("out put", msgBackEnd => {
            console.log("yes");

            // if (msgBackEnd.userGet === props.all.userB.id) {
            //     console.log("yes");
            // }

            // // window.location.reload();
            setRenderFlag(renderFlag + 1)



            history.push('/messages')
        })



        // למשוך את המידע של המשתמש עצמו דרך הטוקן
        let url = apiUrl+'/users/single';
        doApiGetToken(url)
            .then(data => {
                if (data._id) {

                    console.log(data);
                    setAccountHolder(data);
                    let urlMsg = apiUrl+'/msgs';
                    Axios.get(urlMsg)
                        .then(res => {

                            // פילטר ששולף את ההודעות הרלוונטיות
                            let accountMsgs = res.data.filter(msg => msg.userA.id === data._id || msg.userB.id === data._id)

                            setAllMsg(accountMsgs)

                            // להוציא את היוזרים הרלוונטים מהמודעות
                            let tempAccountArr = [];
                            for (let i = 0; i < accountMsgs.length; i++) {
                                if (accountMsgs[i].userA.id !== data._id) {
                                    tempAccountArr.push(accountMsgs[i].userA);
                                }
                                else {
                                    tempAccountArr.push(accountMsgs[i].userB)
                                }
                            }


                            setContact_ar(tempAccountArr);


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

    }, [renderFlag])

    const ss =() =>{
        $("#id-scroll").scrollTop($("#id-scroll")[0].scrollHeight);   // לבדוק את זה

    }



    // כאשר לוחצים על יוזר בתפריט השמאלי נפתח הצאט שלו בצד ימין
    // לפי האיי די שנשלח לפונקציה (האיי די של היוזר הנלחץ) עדכן את המשתנה אחרי פילטר
    const selectConvers = (e) => {
        const user = contact_ar.filter(user => user.id === e);
        const msg = allMsg.filter(msg => msg.userA.id === user[0].id || msg.userB.id === user[0].id)

        setSingleConversData(user[0]);
        setContact_msgs(msg[0])
    }


    return (
        <div className="round-chat">
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-md-4 col-xl-3 chat">
                        <div className="card mb-sm-3 mb-md-0 contacts_card">

                            {/* side left */}
                            <div id="contact-st" className="card-body contacts_body">
                                <ul className="contacts" >
                                    {contact_ar.map(post => {
                                        return (
                                            <Contact
                                                first_name={post.name}
                                                image={post.img}
                                                date_of_birth={post.date_of_birth}
                                                key={post.id}
                                                selectConvers={(e) => selectConvers(e)}
                                                id={post.id}
                                                ss={ss}
                                            // msg={post.chatMsg.msg}
                                            // time={post.chatMsg.nowTime}

                                            />
                                        )
                                    })}
                                </ul>
                            </div>
                            {/* <div className="card-footer"></div> */}
                        </div>
                    </div>

                    {/*side right*/}
                    <div className="col-md-8 col-xl-6 chat">

                        {singleConversData === null ?
                            <EmptyChat></EmptyChat>
                            :
                            <ChatSingle
                                // massages={singleConversData.chat_box}
                                name={singleConversData.name}
                                id={singleConversData.id}
                                date_of_birth={singleConversData.date_of_birth}
                                img={singleConversData.img}
                                allMsg={contact_msgs.messages}
                                accountHolder={accountHolder}
                                all={contact_msgs}

                            />

                        }

                    </div>
                </div>
            </div>
        </div>

    );
}

export default Chat;
