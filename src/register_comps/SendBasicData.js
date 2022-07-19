import React from 'react';
import { useSelector } from "react-redux"
import { apiUrl, doApiPost, doApiPostToken } from '../services/apiService';
import { useHistory } from "react-router-dom";
import moment from 'moment';


import '../style/css/register.css'



function SendBasicData() {

    let history = useHistory()

    let userData = useSelector((myStore) => myStore)




    const sendData = () => {

        localStorage.setItem("msg", 0);




        let readyUserData = userData;
        delete readyUserData.submitingType;
        let url = apiUrl+'/users/add';
        doApiPost(url, readyUserData)
            .then(data => {
                if (data.email) {
                    // הוספת תיבת הודעות חדשה עם מנהל


                    // פרופיל של אדמיין להודעות בצאט
                    let tempUserA = {
                        id: "1",
                        img: "admin.jpg",
                        name: "Admin",
                        date_of_birth: "01-01-2020",
                        city: "admin",
                    }

                    // פרופיל של היוזר להודעות בצאט
                    let tempUserB = {
                        id: data._id,
                        img: userData.image[0],
                        name: userData.first_name,
                        date_of_birth: userData.date_of_birth,
                        city: userData.city
                    }

                    let tempLastTimeChat = moment();

                    let msgg = 'Welcome! We thought you should have a few pointers to help you get started: Match Questions help us find you higher quality matches. The more questions you answer on your profile, the better our matching system becomes, which means better dates for you! Be yourself. Welcome to JMatch!'

                    // יוצר את מערך ההודעות עם הודעת אדמיין להרשמה
                    let tempMessages = [{
                        userPost: "1",
                        time: tempLastTimeChat,
                        msg: msgg
                    }];

                    // מכין אובייקט לתיבה חדשה
                    let tempObjMsgBox = {
                        userA: tempUserA,
                        userB: tempUserB,
                        messages: tempMessages,
                        lastTimeChat: tempLastTimeChat,
                        admin_status: true
                    }

                    // שולח את התיבה לשרת 
                    let urlMsg = apiUrl+'/msgs/add';
                    doApiPostToken(urlMsg, tempObjMsgBox)
                        .then(data => {
                            if (data[0].lastTimeChat) {
                                console.log("chat box update");
                                history.push('/registration_login');
                            }
                            else if (data.message) {
                                console.log(data.message);
                            }
                            else {
                                console.log(data);
                            }
                        })


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
    }



    return (
        <div className="App">
            <h2>Hello!</h2>
            <img style={{ width: "56%" }} src={require('../images/welcome2.png')} />
            <button className="btn-register" style={{ display: "block", margin: "auto", width: "50%", backgroundColor: "dodgerblue" }} onClick={sendData} type="submit" value="Next">Next</button>
        </div>
    );
}

export default SendBasicData;