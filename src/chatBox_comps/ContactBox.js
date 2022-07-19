import React, { useState, useEffect } from 'react';
import '../style/css/chat.css';

// import { useHistory } from 'react-router-dom';

import ContactSingle from './ContactSingle';

import { apiUrl, doApiGetToken } from '../services/apiService';

import Axios from 'axios';
import { parseJwt } from '../style/js/help';


import io from 'socket.io-client';
const ENDPOINT = "http://localhost:4002/";







function ContactBox(props) {

    let [contact_ar, setContact_ar] = useState([]);
    // let [singleConversData, setSingleConversData] = useState(null);
    let [allMsg, setAllMsg] = useState(null)
    let [accountHolder, setAccountHolder] = useState(null);
    // let [contact_msgs, setContact_msgs] = useState(null);

    // let [renderFlag, setRenderFlag] = useState(0)






    const socket = io(ENDPOINT);




    useEffect(() => {
        let token = parseJwt(localStorage[process.env.REACT_APP_LOCALHOST_KEY]);


        socket.on("out put admin msg", msgBackEnd => {

                // למשוך את המידע של המשתמש עצמו דרך הטוקן
                let url2 = apiUrl+'/users/single';
                doApiGetToken(url2)
                    .then(data => {
                        if (data._id) {

                            console.log(data);
                            setAccountHolder(data);
                            let urlMsg = apiUrl+'/msgs';
                            Axios.get(urlMsg)
                                .then(res => {
                                    // פילטר ששולף את ההודעות הרלוונטיות
                                    let accountMsgs = res.data.filter(msg => msg.userA.id === data._id || msg.userB.id === data._id);

                                    console.log(accountMsgs);

                                    setAllMsg(accountMsgs)


                                    let tempAccountArr = [];
                                    for (let i = 0; i < accountMsgs.length; i++) {
                                        if (accountMsgs[i].userA.id !== data._id) {
                                            tempAccountArr.push(accountMsgs[i].userA);
                                            tempAccountArr[i]['boxId'] = accountMsgs[i]._id;
                                            tempAccountArr[i]['date'] = accountMsgs[i].lastTimeChat;
                                        }
                                        else {
                                            tempAccountArr.push(accountMsgs[i].userB);
                                            tempAccountArr[i]['boxId'] = accountMsgs[i]._id;
                                            tempAccountArr[i]['date'] = accountMsgs[i].lastTimeChat;
                                        }
                                    }
                                    console.log(tempAccountArr)

                                    tempAccountArr.sort(function (a, b) {
                                        return new Date(b.date) - new Date(a.date);
                                    })

                                    console.log(tempAccountArr);
                                    setContact_ar(tempAccountArr);

                                });

                        }
                        else if (data.message) {
                            console.log(data.message);
                        }
                        else {
                            console.log(data);
                        }
                    })

            // }



        })






        socket.on("out put", msgBackEnd => {
            console.log(msgBackEnd.boxId)
            console.log(window.location.pathname)
            // history.push("/chatbox/5fdd55f98e84b254c42a480f")

            if (window.location.pathname === "/chatbox/" + msgBackEnd.boxId || msgBackEnd.userGet === token._id) {
                // למשוך את המידע של המשתמש עצמו דרך הטוקן
                let url2 = apiUrl+'/users/single';
                doApiGetToken(url2)
                    .then(data => {
                        if (data._id) {

                            console.log(data);
                            setAccountHolder(data);
                            let urlMsg = apiUrl+'/msgs';
                            Axios.get(urlMsg)
                                .then(res => {
                                    // פילטר ששולף את ההודעות הרלוונטיות
                                    let accountMsgs = res.data.filter(msg => msg.userA.id === data._id || msg.userB.id === data._id);

                                    console.log(accountMsgs);

                                    setAllMsg(accountMsgs)


                                    let tempAccountArr = [];
                                    for (let i = 0; i < accountMsgs.length; i++) {
                                        if (accountMsgs[i].userA.id !== data._id) {
                                            tempAccountArr.push(accountMsgs[i].userA);
                                            tempAccountArr[i]['boxId'] = accountMsgs[i]._id;
                                            tempAccountArr[i]['date'] = accountMsgs[i].lastTimeChat;
                                        }
                                        else {
                                            tempAccountArr.push(accountMsgs[i].userB);
                                            tempAccountArr[i]['boxId'] = accountMsgs[i]._id;
                                            tempAccountArr[i]['date'] = accountMsgs[i].lastTimeChat;
                                        }
                                    }
                                    console.log(tempAccountArr)

                                    tempAccountArr.sort(function (a, b) {
                                        return new Date(b.date) - new Date(a.date);
                                    })

                                    console.log(tempAccountArr);
                                    setContact_ar(tempAccountArr);

                                });

                        }
                        else if (data.message) {
                            console.log(data.message);
                        }
                        else {
                            console.log(data);
                        }
                    })

            }



        })


        localStorage.setItem("newMsgs", 0);



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
                            let accountMsgs = res.data.filter(msg => msg.userA.id === data._id || msg.userB.id === data._id);

                            console.log(accountMsgs);

                            setAllMsg(accountMsgs)


                            let tempAccountArr = [];
                            for (let i = 0; i < accountMsgs.length; i++) {
                                if (accountMsgs[i].userA.id !== data._id) {
                                    tempAccountArr.push(accountMsgs[i].userA);
                                    tempAccountArr[i]['boxId'] = accountMsgs[i]._id;
                                    tempAccountArr[i]['date'] = accountMsgs[i].lastTimeChat;
                                }
                                else {
                                    tempAccountArr.push(accountMsgs[i].userB);
                                    tempAccountArr[i]['boxId'] = accountMsgs[i]._id;
                                    tempAccountArr[i]['date'] = accountMsgs[i].lastTimeChat;
                                }
                            }
                            console.log(tempAccountArr)

                            tempAccountArr.sort(function (a, b) {
                                return new Date(b.date) - new Date(a.date);
                            })

                            console.log(tempAccountArr);
                            setContact_ar(tempAccountArr);

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

    }, [])


    return (
        <div id="contact-st" className="card-body contacts_body">
            <ul className="contacts" >
                {contact_ar.map(post => {
                    return (
                        <ContactSingle
                            first_name={post.name}
                            image={post.img}
                            date_of_birth={post.date_of_birth}
                            key={post.id}
                            // selectConvers={(e) => selectConvers(e)}
                            id={post.id}
                            idBox={post.boxId}
                            lastMsg={post.date}
                        // ss={ss}
                        // msg={post.chatMsg.msg}
                        // time={post.chatMsg.nowTime}
                        />
                    )
                })}
            </ul>
        </div>

    )

}

export default ContactBox;