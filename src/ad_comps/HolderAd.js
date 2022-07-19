import React, { useState, useEffect, useRef } from 'react';
import { apiUrl, doApiPostToken } from '../services/apiService';
//import axios from 'axios'
import { useSelector } from "react-redux"
import { doApiGetToken } from '../services/apiService';
import '../style/css/home.css';
import { useHistory } from 'react-router-dom';
import moment from 'moment'

import $ from "jquery"




function HolderAd(props) {

    let catRef = useRef();
    let comRef = useRef();
    let fromDateRef = useRef();
    let toDateRef = useRef();

    let history = useHistory();


    // סטייט מידע של המודעה- במידה והמשתמש לא העלה מודעה אתחל בנאל
    let [adDataState, setAdDataState] = useState(null);


    let [adStatus, setAdStatus] = useState(null);

    let [userName, setUserName] = useState(null);

    // let [tempObjAd, setTempObjRef] = useState(null);


    // מושך מהשרת את המידע של המודעה של השמתמש על פי איי די
    useEffect(() => {
        let url = apiUrl+'/users/single';
        doApiGetToken(url)
            .then(data => {
                if (data._id) {
                    setUserName(data.first_name)
                    // document.getElementsByClassName("ad-sugg-input").placeholder = "Type name here.."+ data.first_name;
                    {/* placeholder="What's on your mind?" */ }

                    document.getElementById("comment comment-st").placeholder = "What's on your mind, " + data.first_name + "?";

                    setAdStatus(data.ad_status)
                }
                else if (data.message) {
                    console.log(data.message);
                }
                else {
                    console.log(data);
                }
            })

    }, [])



    // בלחיצה על הכפתור הוספה מוסיפים מודעה חדשה
    const postNewAd = (event) => {
        event.preventDefault();

        let cat = true, from = true, to = true, com = true

        if (catRef.current.value === "-select category-") {
            document.getElementById("cat").style.border = "2px solid red";
            cat = false
        }
        if (fromDateRef.current.value === "") {
            document.getElementById("from_date").style.border = "2px solid red"
            from = false
        }
        if (toDateRef.current.value === "") {
            document.getElementById("till_date").style.border = "2px solid red";
            to = false
        }
        if (comRef.current.value === "") {
            document.getElementById("comment comment-st").style.border = "2px solid red";
            com = false
        }

        console.log(comRef.current.value);

        if (cat && to && from && com) {

            let fDate =  moment(toDateRef.current.value).format('L');

            // לעשות בדיקה שמתאריך לא יהיה אחרי העד תאריך

            let tempObjAd = {
                category: catRef.current.value,
                comment: comRef.current.value,
                from_date: fromDateRef.current.value,
                till_date: toDateRef.current.value,
                from_date_f: fDate
            }

            console.log(tempObjAd);

            let url = apiUrl+'/ads/add';
            doApiPostToken(url, tempObjAd)
                .then(data => {
                    if (data._id) {
                        setAdDataState(tempObjAd)
                        let adS = {
                            ad_status: true
                        }
                        let url = apiUrl+'/users/update';
                        doApiPostToken(url, adS)
                            .then(data => {
                                if (data.ok === 1) {
                                    props.onPostIn();
                                    $("body").removeClass("modal-open")
                                    $("div").removeClass("modal-backdrop")
                                    $('.modal-content').hide();
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
                    else if (data.message) {
                        console.log(data.message);
                    }
                    else {
                        console.log(data);
                    }
                })

        }




    }

    const onChangePostForm = () => {
        if (catRef.current.value !== "-select category-") {
            document.getElementById("cat").style.border = "none"
        }
        if (fromDateRef.current.value !== "") {
            document.getElementById("from_date").style.border = "none"

        }
        if (toDateRef.current.value !== "") {
            document.getElementById("till_date").style.border = "none"
        }
        if (comRef.current.value !== "") {
            document.getElementById("comment comment-st").style.border = "none"
        }

        let from;
        let to;

        let dateNow = new Date();

        let from1 = moment(fromDateRef.current.value).format('L');
        let dd = moment(dateNow).format('L');



        if (from1 < dd) {
            document.getElementById("from_date").style.border = "2px solid red";
            document.getElementById("dBtn").disabled = true;
        }
        else {
            document.getElementById("from_date").style.border = "none";
            document.getElementById("dBtn").disabled = false;

            if (fromDateRef.current.value !== "" && toDateRef.current.value) {
                from = new Date(fromDateRef.current.value);
                to = new Date(toDateRef.current.value);

                if (from > to) {
                    document.getElementById("from_date").style.border = "2px solid red";
                    document.getElementById("till_date").style.border = "2px solid red";
                    document.getElementById("dBtn").disabled = true;
                    $("#msgAd").show();

                }
                else {
                    document.getElementById("from_date").style.border = "none";
                    document.getElementById("till_date").style.border = "none";
                    document.getElementById("dBtn").disabled = false;
                    $("#msgAd").hide();
                }

            }
        }

    }


    return (
        <div className="App" style={{ textAlign: "center" }}>

   


            <form onChange={onChangePostForm}>

                <div style={{ fontSize: "30px", marginBottom: "16px", marginTop: "10px" }}>😀 🙄 😎</div>


                <select ref={catRef} style={{ border: "none", marginBottom: "10px", backgroundColor: "aliceblue", padding: "12px" }} className="ad-sugg-input" id="cat">
                    <option>-select category-</option>
                    <option defaultValue="Sport">Sport</option>
                    <option defaultValue="Local trip">Local trip</option>
                    <option defaultValue="Overseas trip">Overseas trip</option>
                    <option defaultValue="Food">Food</option>
                    <option defaultValue="Fun">Fun</option>
                    <option defaultValue="Assistance">Assistance</option>
                    <option defaultValue="General">General</option>

                </select>
                <br></br>


                <textarea ref={comRef} style={{ background: "aliceblue", border: "3px solid white", marginBottom: "10px", padding: "20px", width: "100%" }} name="comment" className="ad-sugg-input" id="comment comment-st" rows="5" cols="50" ></textarea>


                <div style={{ marginBottom: "10px" }}>
                    <span> Dates </span>
                    <input ref={fromDateRef} style={{ border: "none", backgroundColor: "aliceblue", padding: "12px" }} className="ad-sugg-input" id="from_date" type="date" min="2020-12-10"></input>

                    <span> - </span>
                    <input ref={toDateRef} style={{ border: "none", backgroundColor: "aliceblue", padding: "12px" }} className="ad-sugg-input" id="till_date" type="date"></input>
                    <span id="msgAd" style={{ fontSize: "11px", display: "none", color: "blue" }}>The end date cannot be before the start date</span>

                </div>

                <button id="dBtn" onClick={postNewAd} type="button" className="btn btn-warning" style={{ color: "white" }}><b>POST</b></button>



            </form>
        
        </div>

    );
}

export default HolderAd;