import React, { useEffect, useRef, useState } from 'react';
import { apiUrl, doApiGetToken, doApiPostToken } from '../services/apiService';
import '../style/css/profile.css';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import { getAge } from '../style/js/help';
import $ from 'jquery';
import { useScrollTrigger } from '@material-ui/core';
import Footer from '../Footer';


function UserSingle(props) {

    let reportCause = useRef();
    let reportDes = useRef();

    let [profileSingle, setProfileSingle] = useState({});

    let [imgArr, setImgArr] = useState([]);

    let [imgIndex, setImgIndex] = useState(0);

    let [ownerData, setOwnerData] = useState(null);

    let [likeStatus, setLikeStatus] = useState(null);

    let [profileIdeal, setProfileIdeal] = useState(null);

    let history = useHistory();



    useEffect(() => {
        $("#showTab").hide();

        document.getElementById("reportC").disabled = true;


        let userId = props.match.params.id;


        let userData;

        let url = apiUrl+'/users';
        doApiGetToken(url)
            .then(data1 => {
                if (data1) {
                    userData = data1.filter(item => {
                        return (item._id === userId)
                    })
                    console.log(userData);

                    if (userData.length < 1) {
                        alert("This user is no longer registered on Jmatch");
                        history.goBack()

                    }
                    else {


                        setProfileIdeal(userData[0].my_ideal_person)
                        setProfileSingle(userData[0])
                        setImgArr(userData[0].image);
                        // let gal = document.getElementById("gal-pointer")
                        // let point = document.createElement("DIV");
                        // point.classList.add("point-st");
                        // for (let i = 0; i < userData[0].image.length; i++) {
                        //     gal.appendChild(point)
                        // }

                        let urlOwner = apiUrl+'/users/single';
                        doApiGetToken(urlOwner)
                            .then(data => {
                                if (data.first_name) {
                                    $("#showTab").hide();
                                    const checkIfBlock = data.block_users.filter(block => block.id === userData[0]._id);
                                    if (checkIfBlock.length > 0) {
                                        alert("You blocked this user");
                                        history.goBack()

                                    }


                                    const checkIfPrevLike = data.who_user_like.filter(like => like._id === userData[0]._id);
                                    if (checkIfPrevLike.length > 0) {
                                        setLikeStatus(true);
                                    }
                                    else {
                                        setLikeStatus(false);
                                    }

                                    setOwnerData(data)
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
                else if (data1.message) {
                    console.log(data1.message);
                }
                else {
                    console.log(data1);
                }
            })


    }, [])



    // img gallery
    const prev = () => {
        setImgIndex(imgIndex - 1)
    }

    const next = () => {
        setImgIndex(imgIndex + 1)
    }

    const showTab = () => {
        $("#showTab").show();
        $("#showTab").css({ opacity: 1 });


    }

    const closeTab = () => {
        $("#showTab").hide();
    }

    // אם המשתמש דיווח על משתמש אחר

    const onClickReport = (e) => {
        e.preventDefault();
        let reportObj = {
            name: profileSingle.first_name,
            image: profileSingle.image[0],
            title: reportCause.current.value,
            info: reportDes.current.value,
            reported_id: profileSingle._id
        }

        let urlRe = apiUrl+'/reports/add';
        doApiPostToken(urlRe, reportObj)
            .then(data => {
                if (data[0].name) {
                    console.log("report added");
                    // $('body').removeClass('modal-open');
                    // $('div').removeClass('modal-backdrop');
                    // history.push("/profile/"+props.match.params.id)ף
                    window.location.reload();

                }
                else if (data.message) {
                    console.log(data.message);
                }
                else {
                    console.log(data);
                }
            })

    }

    const changeReportForm = () => {

        if (reportCause.current.value !== "Select") {
            document.getElementById("reportC").disabled = false;
        }
        else {
            document.getElementById("reportC").disabled = true;
        }
    }


    // בחסימה של משתמש
    // מתעדכן מערך החסומים אצל המשתמש עצמו
    // מתעדכן מערך מי חסם אצל משתמש שני
    // במידה והחסימה היא אחרי שנפתחה תיבת הודעות היא נמחקת
    const onBlockUser = () => {
        console.log(ownerData);
        console.log(profileSingle);

        // עדכון מערך החסומים של בעל החשבון משתמש
        let tempBlockArr = ownerData.block_users;

        let newBlockArr = {
            name: profileSingle.first_name,
            id: profileSingle._id,
            image: profileSingle.image[0],
            date_of_birth: profileSingle.date_of_birth
        }
        tempBlockArr.push(newBlockArr)
        let ownerBlockObj = {
            block_users: tempBlockArr
        }

        let url = apiUrl+'/users/update';
        doApiPostToken(url, ownerBlockObj)
            .then(data => {
                if (data.ok === 1) {
                    console.log("update user");

                }
                else if (data.message) {
                    console.log(data.message);
                }
                else {
                    console.log(data);
                }
            })

        // עדכון המשתמש שנחסם
        let tempBlockPro = profileSingle.who_block;
        tempBlockPro.push(ownerData._id)
        let newBlockPro = {
            who_block: tempBlockPro,
            id: profileSingle._id
        }

        let url2 = apiUrl+'/users/updateanother';
        doApiPostToken(url2, newBlockPro)
            .then(data => {
                if (data.ok === 1) {
                    console.log("update user")
                    window.location.reload();
                    $('body').removeClass('modal-open');
                    $('div').removeClass('modal-backdrop');

                    history.goBack()

                }
                else if (data.message) {
                    console.log(data.message);
                }
                else {
                    console.log(data);
                }
            })



        // אם יש תיבת הודעות צריך למחוק אותה מהרשימה
    }




    // אם משתמש לחץ לייק על פרופיל
    const onClickLikeUser = () => {
        setLikeStatus(true);

        console.log(likeStatus)

        // עידכון מערך של מי שהמשתמש אהב עם הפוסט של המשתמש החדש
        let temp_who_user_like = ownerData.who_user_like;

        let tempProfileUser = {
            _id: profileSingle._id,
            first_name: profileSingle.first_name,
            image: profileSingle.image,
            city: profileSingle.city,
            gender: profileSingle.gender,
            date_of_birth: profileSingle.date_of_birth
        }

        temp_who_user_like.push(tempProfileUser);

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
            id: profileSingle._id
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

        const checkIfMatch = profileSingle.who_user_like.filter(like => like._id === ownerData._id);
        if (checkIfMatch.length > 0) {

            let tempUserA = {
                id: ownerData._id,
                img: ownerData.image[0],
                name: ownerData.first_name,
                date_of_birth: ownerData.date_of_birth,
                city: ownerData.city,
            }
            let tempUserB = {
                id: profileSingle._id,
                img: profileSingle.image[0],
                name: profileSingle.first_name,
                date_of_birth: profileSingle.date_of_birth,
                city: profileSingle.city
            }
            let tempMessages = [];
           let tempLastTimeChat = moment();

            let tempObjMsgBox = {
                userA: tempUserA,
                userB: tempUserB,
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


    const onClickUnlike = () => {
        // להסיר את היוזר מרשימת הלייקים שלי
        // להסיר את הלייק שלי מרשימת המי אהב שלו

        let temp_who_user_like = ownerData.who_user_like;
        for (let i = 0; i < temp_who_user_like.length; i++) {
            if (temp_who_user_like[i]._id === profileSingle._id) {
                temp_who_user_like.splice(i, 1)
            }
        }
        console.log(temp_who_user_like)
        let obj = {
            who_user_like: temp_who_user_like
        }

        let url = apiUrl+'/users/update';
        doApiPostToken(url, obj)
            .then(data => {
                if (data.ok === 1) {
                    console.log("user update");
                    // window.location.reload();
                    // history.push("/my-profile")

                }
                else if (data.message) {
                    console.log(data.message);
                }
                else {
                    console.log(data);
                }
            })


        let temp_who_likes = profileSingle.who_likes;
        console.log(temp_who_likes)

        for (let i = 0; i < temp_who_likes.length; i++) {
            if (temp_who_likes[i]._id === ownerData._id) {
                temp_who_likes.splice(i, 1)
            }
        }

        let obj2 = {
            who_likes: temp_who_likes,
            id: profileSingle._id
        }


        let url2 = apiUrl+'/users/updateanother';
        doApiPostToken(url2, obj2)
            .then(data => {
                if (data.ok === 1) {
                    console.log("user update");
                    // window.location.reload();
                    // history.push("/my-profile")

                }
                else if (data.message) {
                    console.log(data.message);
                }
                else {
                    console.log(data);
                }
            })

        setLikeStatus(false)

    }


    return (

        <>

        <div style={{ backgroundColor: "#f3f5f9", padding: "120px" }}>

            <div className="modal fade" id="modalReport" role="dialog">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div style={{ textAlign: "center", background: "lightblue" }} className="modal-body">
                            <form onChange={changeReportForm} style={{ padding: "29px" }}>
                                <div>How does this violate our terms of service?</div>
                                <select ref={reportCause} style={{ width: "100%", borderRadius: "9px", border: "none" }}>
                                    <option defaultValue="Select">Select</option>
                                    <option defaultValue="Aggressive / Harassment">Aggressive / Harassment</option>
                                    <option defaultValue="Sexual Harassment">Sexual Harassment</option>
                                    <option defaultValue="Spammer / Scammer / Fake">Spammer / Scammer / Fake</option>
                                    <option defaultValue="Offsite behavior: Assault / Abuse / Violence">Offsite behavior: Assault / Abuse / Violence</option>
                                    <option defaultValue="Not who I'm looking for">Not who I'm looking for</option>
                                    <option defaultValue="other">other</option>
                                </select>

                                <div>Description</div>
                                <textarea ref={reportDes} rows="4" style={{ width: "100%", borderRadius: "9px", border: "none" }}></textarea>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button id="reportC" onClick={(e) => onClickReport(e)} type="button" className="btn btn-primary">Report them!</button>
                            <button style={{ color: "#007bff" }} type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className="modal fade" id="modalBlock" role="dialog">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div style={{ textAlign: "center" }} className="modal-body">
                            <div style={{ padding: "9px", fontWeight: "500", fontSize: "20px" }}>Block?</div>
                            <div style={{ padding: "5px", fontSize: "15px" }}>
                                Is this person bothering you?
                                Blocking hides you from them
                                and prevents further messages
                                from being exchanged.<br></br><br></br>
                                If you're being harassed by this person,
                                please report them.
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={onBlockUser}>Yes, please</button>
                            <button style={{ color: "#007bff" }} type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>





            <div className="container" >
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog modal-xl">


                        <div className="modal-content">
                            <div style={{ height: "635px", display: "flex", flexDirection: "row", alignItems: "center" }} id="gallery" className="modal-body">
                                {imgArr.length === 1 ? null : <>{imgIndex === 0 ? null : <div style={{ backgroundColor: "lightblue", color: "white", padding: "7px" }} className="prevnext-st" onClick={prev}>❮</div>}</>}

                                <div style={{ display: "flex", flexDirection: "row", margin: "auto" }} id="gal-round1" >

                                    <div style={{ display: "flex" }} id="gal-round2" >
                                        <img id="img-gallery1" className="img-responsive thumbnail" src={apiUrl+'/images/users_imgs/' + imgArr[imgIndex]} alt="img"/>
                                    </div>

                                    {/* <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", paddingTop: "10px" }} id="gal-pointer"></div> */}
                                </div>
                                {imgArr.length === 1 ? null : <> {imgIndex === imgArr.length - 1 ? null : <div style={{ backgroundColor: "lightblue", color: "white", padding: "7px" }} className="prevnext-st" onClick={next}>❯</div>} </>}


                            </div>
                        </div>

                    </div>
                </div>

                {ownerData === null ? <div style={{ marginTop: "116px", marginBottom: "245px" }}><div className="loader-blue"></div></div>
                    :
                    <div className="row user-menu-container square" >
                        <div className="col-md-7 user-details">
                            <div className="row coralbg white">
                                <div className="col-md-4 no-pad">
                                    <div className="user-pad">
                                        <div style={{ color: "gray", backgroundColor: "white", position: "absolute", top: "53px", left: "39px", zIndex: "9", display: "flex", flexDirection: "column", boxShadow: "0 2px 5px rgba(0, 0, 0, .3)", opacity: "0" }} id="showTab">
                                            <span onClick={closeTab} style={{ textAlign: "right", padding: "4px", cursor: "pointer" }}>X</span>
                                            <span data-toggle="modal" data-target="#modalBlock" style={{ padding: "8px", paddingTop: "0", cursor: "pointer" }}>Block</span>
                                            <span data-toggle="modal" data-target="#modalReport" style={{ padding: "8px", cursor: "pointer" }}>Report</span>
                                        </div>
                                        <h3><span id="user-name-st">{profileSingle.first_name}</span> <i style={{ cursor: "pointer" }} className="fa fa-ellipsis-v" onClick={showTab}></i></h3>
                                        <h4>{getAge(profileSingle.date_of_birth)} &bull; {profileSingle.city}</h4>
                                    </div>
                                </div>
                                <div className="col-md-8 no-pad">
                                    <div style={{ cursor: "pointer" }} className="user-image" data-toggle="modal" data-target="#myModal">
                                        {/* <img src="https://farm7.staticflickr.com/6163/6195546981_200e87ddaf_b.jpg"
                         className="img-responsive thumbnail"></img> */}
                                        <img className="img-responsive thumbnail" src={apiUrl+'/images/users_imgs/' + imgArr[0]} alt="img"/>
                                        <div style={{ textAlign: "center" }}>
                                            <i className="fa fa-circle pro-cir" aria-hidden="true"></i>
                                            <i className="fa fa-circle pro-cir" aria-hidden="true"></i>
                                            <i className="fa fa-circle pro-cir" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row overview">
                                <div style={{ margin: "auto", marginTop: "12px" }}>

                                    {/* <Link to={`${props.location.state.prevPath}`}> */}
                                    <button onClick={() => history.goBack()} className="btn-profile btn-pass" ><b><i style={{ padding: "3px" }} className="fa fa-arrow-left" aria-hidden="true"></i>Back</b></button>
                                    {/* </Link> */}
                                    {likeStatus === null ? null :
                                        <>
                                            {likeStatus === false ?
                                                <button className="btn-profile btn-like" onClick={onClickLikeUser}><b><i style={{ padding: "3px" }} className="fa fa-heart" aria-hidden="true"></i>Like</b></button>
                                                :
                                                <button className="btn-profile btn-like" onClick={onClickUnlike}><b><i style={{ padding: "3px" }} className="fa fa-thumbs-o-down" aria-hidden="true"></i>Unlike</b></button>
                                            }
                                        </>

                                    }
                                </div>

                            </div>
                            <div className="row overview" style={{ padding: "30px" }}>
                                <div>
                                    <div className="details-user-st about-pro-st"><b>My self-summary</b></div>
                                    <p className="p-pro-st">{profileSingle.about_me}</p>
                                    <div className="details-user-st about-pro-st"><b>My traits</b></div>
                                    <p className="p-pro-st">{profileSingle.my_traits}</p>
                                    <div className="details-user-st about-pro-st"><b>Hobbies</b></div>
                                    <p className="p-pro-st">{profileSingle.hobbies}</p>
                                </div>

                            </div>
                        </div>

                        <div className="col-md user-menu user-pad">
                            <div className="user-menu-content active">

                                <div>
                                    <div className="details-user-st"><i className="fa fa-flash fafa-pro-st"></i><div>{profileSingle.orientation !== "" ? profileSingle.orientation + "," : null} {profileSingle.gender} {profileSingle.relationship !== "" ? "," + profileSingle.relationship : null} {profileSingle.relationship_type !== "" ? "," + profileSingle.relationship_type : null}</div></div>
                                    <div className="details-user-st"><i className="fa fa-star fafa-pro-st"></i><div>{profileSingle.height !== "" ? profileSingle.height : null} {profileSingle.body_type !== "" ? "," + profileSingle.body_type : null}</div></div>
                                    <div className="details-user-st"><i className="fa fa-globe fafa-pro-st"></i><div>{profileSingle.speaks === undefined ? null : profileSingle.speaks.map(lan => <span key={lan}>{lan + ","}</span>)} {profileSingle.education !== "" ? profileSingle.education : null}</div></div>
                                    <div className="details-user-st"><i className="fa fa-glass fafa-pro-st" ></i><div>{profileSingle.smoking !== "" ? profileSingle.smoking : null} {profileSingle.drinking !== "" ? "," + profileSingle.drinking : null}{profileSingle.marijuana !== "" ? "," + profileSingle.marijuana : null}</div></div>
                                    <div className="details-user-st"><i className="fa fa-home fafa-pro-st"></i><div>{profileSingle.children !== "" ? profileSingle.children : null}{profileSingle.pets !== "" ? " ," + profileSingle.pets : null}</div></div>
                                    <div className="details-user-st"><i className="fa fa-eye fafa-pro-st"></i><div>{profileIdeal === null ? null : <>{profileIdeal.gender === "" && profileIdeal.from_age === "" ? null : <span>Looking for {profileIdeal.gender === "" ? null : profileIdeal.gender},{profileIdeal.from_age === "" ? null : <span> Ages {profileIdeal.from_age + " - " + profileIdeal.to_age}</span>}  </span>}</>}</div></div>
                                </div>

                            </div>
                            <div className="user-menu-content">
                                <h3>Your Inbox</h3>
                            </div>


                        </div>
                    </div>

                }

            </div>


        </div>

        <Footer/>

        </>




    )
}

export default UserSingle;


