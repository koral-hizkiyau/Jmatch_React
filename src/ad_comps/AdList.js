import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux"
import AdItem from './AdItem';
import { doApiPostToken, doApiGetToken, doApiGet, apiUrl } from '../services/apiService';
import moment from 'moment';
import $ from "jquery";





import { parseJwt } from '../style/js/help'






function AdList(props) {

 
    let [presentAd, setPresentAd] = useState(null);  // פוסט קודם
    let [changeCount, setChangeCount] = useState(0);  // כדי להפעיל את העמוד ולרנדר את הפוסטים בעת לחיצה
    let userData = useSelector((myStore) => myStore)  // מושך את המידע של המשתמש הקיים

    let [ad_ar, setAd_ar] = useState(null);  // מערך פוסטים


    let [userState, setUserState] = useState(null)






    useEffect(() => {



        let token = parseJwt(localStorage["tok"])


        if (userState == null) {
            let urlAds = apiUrl+'/ads';  // שולף את כל הפוסטים
            doApiGetToken(urlAds)
                .then(data => {
                    if (data.length === 0) {
                        setAd_ar([])
                    }
                    else {
                        if (data[0]._id) {
                            let urlUser = apiUrl+'/users/single';
                            doApiGetToken(urlUser)
                                .then(dataUser => {
                                    if (dataUser.first_name) {
                                        setUserState(dataUser)
                                        let tempArr = data;
                                        // לסנן פוסטים ששייכים ליוזר עצמו
                                        let filterByUserPost = tempArr.filter(post => post.user._id !== token._id);





                                        // לבודד את הפוסטים הרלוונטים לפי קטגוריות

                                        let catUser = dataUser.categories;
                                        let filterByCat = []
                                        for (let i = 0; i < filterByUserPost.length; i++) {
                                            for (let j = 0; j < catUser.length; j++) {
                                                if (filterByUserPost[i].category === catUser[j]) {
                                                    filterByCat.push(filterByUserPost[i])
                                                }
                                            }
                                        }

                                        // סינון אם המשתמש כבר לחץ בעבר לייק על המודעה
                                        let filterByLikes = []

                                        for (let k = 0; k < filterByCat.length; k++) {
                                            if (!filterByCat[k].who_likes.includes(dataUser._id)) {
                                                filterByLikes.push(filterByCat[k])
                                            }
                                        }

                                        // סינון אם השמשתמש כבר לחץ דלג על המודעה
                                        let filterByPass = []

                                        for (let p = 0; p < filterByLikes.length; p++) {
                                            if (!filterByLikes[p].who_pass.includes(dataUser._id)) {
                                                filterByPass.push(filterByLikes[p])
                                            }
                                        }

                                        // סינון פוסטים על פי חסימות
                                        // סינון כל מערך היוזרים אם נחסמו או חסמו
                                        // לערוך בדיקה לזה!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


                                        for (let i = 0; i < dataUser.block_users.length; i++) {
                                            for (let j = 0; j < filterByPass.length; j++) {
                                                if (dataUser.block_users[i].id === filterByPass[j].id_post) {
                                                    filterByPass.splice(j, 1)
                                                }
                                            }
                                        }

                                        // סינון אם מישהו חסם את המשתמש עצמו
                                        for (let i = 0; i < filterByPass.length; i++) {
                                            if (dataUser.who_block.includes(filterByPass[i].id_post)) {
                                                filterByPass.splice(i, 1);
                                            }
                                        }   // לתקן למערך חדש ולהדביק אותו על טמפ איי ארר

                                        // סינון אם אדמיין חסם את היוזר שלא יופיע יותר במודעות
                                        // דרך הצד של האדמיין לעשות מחיקה של המודעות שלו!!!!

                                        setAd_ar(filterByPass);

                                        let rand = Math.floor(Math.random() * filterByPass.length);
                                        setPresentAd(filterByPass[rand])

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
                        }
                        else {
                            console.log(data);
                        }

                    }


                })
        }


    }, [props.ad_list, changeCount])

    // const setThings = (data, userData) => {
    //     console.log(data);
    //     console.log(props.userData);
    //     console.log(ad_ar);
    // }

    // בלחיצה על אנלייק תעדכן את מערך האנלייקים של המודעה
    const onClickPass = (event) => {
        let temp_who_pass = presentAd.who_pass; // שומר במשתנה את מערך היוזרים שדילגו על המודעה שהמשתמש דילג עליה
        temp_who_pass.push(userData._id) // דוחף לאותו מערך את האיי די של המשתמש הקיים
        let tempObj = {   // יוצר אובייקט עם האיי די של המודעה והמערך החדש 
            who_pass: temp_who_pass,
            id: presentAd._id
        }

        let url = apiUrl+'/ads/update';  // שולח לשרת את העידכון
        doApiPostToken(url, tempObj)
            .then(data => {
                console.log(data);
                if (data.ok === 1) {
                    console.log("update")
                }
                else if (data.message) {
                    console.log(data.message);
                }
                else {
                    console.log(data);
                }
            })

        // console.log(ad_ar);
        // console.log(presentAd._id);

        let filterOnPass = ad_ar.filter(ad => ad._id !== presentAd._id);
        // console.log(filterOnPass);
        setAd_ar(filterOnPass);

        let rand = Math.floor(Math.random() * filterOnPass.length);
        setPresentAd(filterOnPass[rand]);

        // $("#try-fade").animate({ opacity: "0.3" })
        // $("#try-fade").animate({ opacity: "1" });
        $("#try-fade").fadeOut(100).fadeIn(100);

        // hitsoty.push("/home")

        // כדי שהיוז אפקט יעבוד מחדש
        setChangeCount(changeCount + 1)
    }

    // משתמש אהב פוסט

    // להוסיף בדיקה נוספתת!!! שאותו יוזר לא מופיע פעמיים במערך
    const onClickLike = () => {

        let idUserAd = presentAd.user._id
        // $("#try-fade1").fadeIn();

        // מכניס למשתנה את מערך הלייקים הקודם
        let temp_who_likes_ad = presentAd.who_likes;
        // delete userData.submitingType;

        // מכניס למערך הלייקים את היוזר הנוכחי שלחץ לייק
        temp_who_likes_ad.push(userState._id);

        // מכין אובייקט חדש עם איי די של מודעה רלוונטית לעידכון ומערך חדש שיש לעדכן
        let tempObj_updateAd = {
            who_likes: temp_who_likes_ad,
            id: presentAd._id
        }

        // // מעדכן את מערך הפוסטים
        let url1 = apiUrl+'/ads/update';
        doApiPostToken(url1, tempObj_updateAd)
            .then(data => {
                console.log(data);
                if (data.ok === 1) {
                    console.log("update")
                }
                else if (data.message) {
                    console.log(data.message);
                }
                else {
                    console.log(data);
                }
            })

        console.log(ad_ar);
        console.log(presentAd._id);

        let filterOnPass = ad_ar.filter(ad => ad._id !== presentAd._id);
        console.log(filterOnPass);
        setAd_ar(filterOnPass);

        let rand = Math.floor(Math.random() * filterOnPass.length);
        setPresentAd(filterOnPass[rand]);

        // $("#try-fade").animate({ opacity: "0.3" })
        // $("#try-fade").animate({ opacity: "1" });
        $("#try-fade").fadeOut(100).fadeIn(100);

        console.log(userState);


        // בדיקה אם היוזר כבר לחץ לייק על אותו משתמש
        const checkIfInclude = userState.who_user_like.filter(like => like._id === presentAd.user._id);
        console.log(checkIfInclude);


        // אם לחץ לייק לראשונה
        if (checkIfInclude.length === 0) {
            console.log("first like");
            // עידכון מערך של מי שהמשתמש אהב עם הפוסט של המשתמש החדש
            let temp_who_user_like = userState.who_user_like;

            console.log(presentAd.user);
            let tempPresentUser = {
                _id: presentAd.user._id,
                first_name: presentAd.user.first_name,
                image: presentAd.user.image,
                city: presentAd.user.city,
                gender: presentAd.user.gender,
                date_of_birth: presentAd.user.date_of_birth
            }

            temp_who_user_like.push(tempPresentUser);

            // אובייקט חדש לשליחה לעידכון בשרת
            let tempObj_who_user_like = {
                who_user_like: temp_who_user_like
            }

            // עידכון משתמש שלחץ לייק

            let url2 = apiUrl+'/users/update';
            doApiPostToken(url2, tempObj_who_user_like)
                .then(data => {
                    if (data.ok === 1) {
                        console.log("user update");
                    }
                    else if (data.message) {
                        console.log(data.message);
                    }
                    else {
                        console.log(data);
                    }
                })

            // עידכון של המשתמש שלחצו עליו לייק
            let temp_who_like_id = {
                id: idUserAd
            }

            let url3 = apiUrl+'/users/updatelike';
            doApiPostToken(url3, temp_who_like_id)
                .then(data => {
                    if (data.ok === 1) {
                        console.log("update like");
                    }
                    else if (data.message) {
                        console.log(data.message);
                    }
                    else {
                        console.log(data);
                    }
                })

            let whoUserLikeCheckMatch;

            let urlGet = apiUrl+'/users/profile/' + idUserAd;
            doApiGet(urlGet)
                .then(data => {
                    if (data.first_name) {
                        console.log(data);
                        whoUserLikeCheckMatch = data.who_user_like;
                        // בודק אם יש התאמה 
                        const checkIfMatch = whoUserLikeCheckMatch.filter(like => like._id === userState._id);
                        if (checkIfMatch.length > 0) {
                            console.log("its a match");
                            // name: String, date_of_birth: String, city: String, id: String, img: String
                            // $("#modalPush").show();
                            // $('.modal').modal('show');
                            $(".ad-s").css({ "filter": "blur(7px)" });
                            $("#modalPush").show();
                            $("#modalPush").css("opacity", 1);

                            document.getElementById("ownerImg").style.backgroundImage = 'url('+apiUrl+'/images/users_imgs/' + userState.image[0] + ')';
                            document.getElementById("secImg").style.backgroundImage = 'url('+apiUrl+'/images/users_imgs/' + presentAd.user.image[0] + ')';

                            let tempUserA = {
                                id: userState._id,
                                img: userState.image[0],
                                name: userState.first_name,
                                date_of_birth: userData.date_of_birth,
                                city: userState.city,
                            }
                            let tempUserB = {
                                id: presentAd.user._id,
                                img: presentAd.user.image[0],
                                name: presentAd.user.first_name,
                                date_of_birth: presentAd.user.date_of_birth,
                                city: presentAd.user.city
                            }
                            let tempMessages = [];
                            // let time = { time: moment() }
                            let tempLastTimeChat = moment();

                            let tempObjMsgBox = {
                                userA: tempUserA,
                                userB: tempUserB,
                                userAId: userState._id,
                                userBId: presentAd.user._id,
                                messages: tempMessages,
                                lastTimeChat: tempLastTimeChat
                            }

                            let urlMsg = apiUrl+'/msgs/add';
                            doApiPostToken(urlMsg, tempObjMsgBox)
                                .then(data => {
                                    if (data.lastTimeChat) {
                                        console.log("chat box update");
                                    }
                                    else if (data.message) {
                                        console.log(data.message);
                                    }
                                    else {
                                        console.log(data);
                                    }
                                })
                        }
                    }
                    else {
                        console.log(data);
                    }
                })



        }
        else {
            console.log("Exists");
        }

        setChangeCount(changeCount + 1)
    }

    const tryrotate = () => {

        $(".ad-s").css({ "filter": "blur(7px)" });
        $("#modalPush").css("opacity", 1);

        $("#modalPush").show();
        //    $("#modalPush").css("opacity", 1);
        document.getElementById("ownerImg").style.backgroundImage = 'url('+apiUrl+'/images/users_imgs/' + userState.image[0] + ')';
        document.getElementById("secImg").style.backgroundImage = 'url('+apiUrl+'/images/users_imgs/' + presentAd.user.image[0] + ')';

    }





    return (

        <div id="blur">

            <>{userState === null ?
                <div style={{ marginTop: "116px", marginBottom: "245px" }}><div className="loader-blue"></div></div> :
                <>
                    <button style={{ display: "none" }} onClick={tryrotate} type="button" className="btn btn-primary" >Launch modal</button>

                    {/* <h2>That may interest you</h2><hr></hr> */}

                    {ad_ar === null || presentAd === null || presentAd === undefined ?
                        <div style={{ height: "321px", border: "3px dashed white" }}>
                            <div id="msg-empty">
                                <p style={{ margin: "0" }}>Your posts stack is empty right now</p>
                                <p>Try again later 🥰</p>
                            </div>
                            <img style={{ width: "29%" }} src={require('../images/emptystack.png')}></img>


                        </div>
                        :
                        <div>
                            <AdItem
                                category={presentAd.category}
                                from_date={presentAd.from_date}
                                till_date={presentAd.till_date}
                                comment={presentAd.comment}
                                id={presentAd._id}
                                id_post={presentAd.id_post}
                                date={presentAd.date}
                                user={presentAd.user}
                                who_likes={presentAd.who_likes}
                                onClickPass={onClickPass}
                                onClickLike={onClickLike}
                            />
                        </div>
                    }

                </>

            }</>




        </div>
    )
}

export default AdList;