import React, { useEffect, useState } from 'react';
import './App.css';
import HolderAd from './ad_comps/HolderAd';
import AdList from './ad_comps/AdList';
// import { useDispatch } from "react-redux";
//import Axios from 'axios';
import { apiUrl, doApiGetToken, doApiPostToken } from "./services/apiService";
import './style/css/home.css';

import Button from 'react-bootstrap/Button';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import Popover from 'react-bootstrap/Popover';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom'




import $ from "jquery";
import Footer from './Footer';







function Home() {

    // let [ad_list, setAd_list] = useState(null);

    let [adStatusBtn, setAdStatusBtn] = useState(null);

    let [userData, setUserData] = useState(null);

    let [userAd, setUserAd] = useState(null);

    let [btnStatus, setBtnStatus] = useState(false);

    let history = useHistory()




    useEffect(() => {

        let dateNow = new Date();
        let format = moment(dateNow).format('L');
        let last = moment(format).utc().format('MM/DD/YYYY')
        let objEx = {
            date: last
        }

        let urlEx = apiUrl+'/ads/delexpired';
        doApiPostToken(urlEx, objEx)
            .then(data => {
                if (data.message) {
                    console.log(data)

                }
                else {
                    console.log(data);
                }
            })


        let url = apiUrl+'/users/single';

        doApiGetToken(url)
            .then(data => {
                setUserData(data)
                setAdStatusBtn(data.ad_status)
            })


        let urlAd = apiUrl+'/ads/single';
        doApiGetToken(urlAd)
            .then(data => {
                if (data === null) {
                    setAdStatusBtn(false);
                    let objUp = {
                        ad_status: false
                    }
                    let urlUserUp = apiUrl+'/users/update';
                    doApiPostToken(urlUserUp, objUp)
                        .then(data => {
                            if (data.ok === 1) {
                                console.log("user update ad status")
                            }
                            else if (data.message) {
                                console.log(data.message);
                            }
                            else {
                                console.log(data);
                            }
                        })

                }
                else {
                    setUserAd(data)
                    setAdStatusBtn(true);

                }
            })
    }, [])


    // מעדכן את הכפתור של פרסום פוסט

    const onPostIn = () => {
        setAdStatusBtn(true)
    }

    const closeMatchModal = () => {
        $(".ad-s").css({ "filter": "blur(0px)" });
        $("#modalPush").css("opacity", 0);
        $("#modalPush").hide();
    }

    const onSure = () => {
        setBtnStatus(true)
    }

    const setStatusBtn = () => {
        setBtnStatus(false)
        // history.push("/home")
    }

    const delPost = () => {
        let url = apiUrl+'/ads/deluserad';
        doApiPostToken(url)
            .then(data => {
                if (data.message) {
                    alert("Post deleted")
                }
                else {
                    console.log(data);
                }
            })

        let obj = {
            ad_status: false
        }
        let urlUser = apiUrl+'/users/update';
        doApiPostToken(urlUser, obj)
            .then(data => {
                if (data.ok === 1) {
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


    return (
        <>

        <div className="App" style={{ textAlign: "center" }}>
            {/* MATRCH MODAL */}
            <div className="modal fade" id="modalPush" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div style={{ width: "384px" }} className="modal-dialog modal-notify modal-info" role="document">
                    <div className="modal-content text-center" style={{ marginTop: "146px" }}>

                        <div style={{ background: "linear-gradient(#FF3187,#F2244A)", boxShadow: "0 2px 5px rgba(0, 0, 0, .3)" }} className="modal-header d-flex justify-content-center">
                            <h2 style={{ fontFamily: " 'Lobster', cursive", fontSize: "43px", color: "white" }}>It's a match!</h2>
                        </div>

                        <div className="modal-body">
                            <i style={{ color: "rgb(242, 36, 74)" }} className="fa fa-bell fa-4x animated rotateIn mb-4"></i>
                            <Link to="/chatbox"><p>Click to chat</p></Link>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <div className="img-match" id="ownerImg"></div>
                                <div className="img-match" id="secImg"></div>
                            </div>
                        </div>

                        <button onClick={closeMatchModal} type="button" className="btn btn-dark">Close</button>

                    </div>
                </div>
            </div>
            {/* END MATCH MODAL */}



            <div className="ad-s" id="review">
                <div className="modal fade" id="modalPostAd" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div style={{ backgroundColor: "lavender" }} className="modal-body">
                                <HolderAd onPostIn={onPostIn} />
                            </div>
                            <div style={{ backgroundColor: "lightblue" }} className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container" style={{ maxWidth: "474px", margin: "auto" }}>
                    {adStatusBtn === false ?
                        <>
                            <button style={{ marginTop: "37px", marginBottom: "20px" }} type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#modalPostAd">Publish a post</button>
                            {/* <div id="demo" className="collapse">
                                <HolderAd />
                            </div> */}
                        </>
                        :
                        <>
                            {/* <button style={{ marginTop: "37px", marginBottom: "20px" }} type="button" className="btn btn-dark btn-lg" data-toggle="modal" data-target="#modalViewAd">View invitation</button> */}
                            <>
                                {['bottom'].map((placement) => (
                                    <OverlayTrigger
                                        trigger="click"
                                        key={placement}
                                        placement={placement}
                                        overlay={
                                            <Popover id={`popover-positioned-${placement}`}>
                                                <Popover.Title as="h3">{userAd === null ? null : moment(userAd.date).calendar()}</Popover.Title>
                                                <Popover.Content>
                                                    <div style={{ display: "flex", flexDirection: "column", fontSize: "18px" }}>
                                                        <div style={{ color: "gray", textAlign: "center" }}>{userAd === null ? null : userAd.category}</div>
                                                        <div>{userAd === null ? null : <div style={{ marginBottom: "16px", marginTop: "6px", textAlign: "center" }}>{userAd.comment}</div>}</div>
                                                        {userAd === null ? null :
                                                            <strong style={{ fontSize: "14px" }}>Dates: {moment(userAd.from_date).format('L')}-{moment(userAd.till_date).format('L')}</strong>}
                                                        <div style={{ color: "gray", display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>{userAd === null ? null : userAd.who_likes.length}<i style={{ fontSize: "22px" }} className="fa">&#xf087;</i></div>
                                                        <div style={{ color: "blue" }} id="delAd" className="collapse">
                                                            Are you sure?
                                                        </div>
                                                        {btnStatus === false ?
                                                            <button onClick={onSure} style={{ color: "white", backgroundColor: "cornflowerblue", border: "none", marginTop: "16px" }} data-toggle="collapse" data-target="#delAd">Delete post</button>
                                                            :
                                                            <div>
                                                                <button onClick={delPost} style={{ color: "white", backgroundColor: "cornflowerblue", border: "none", marginTop: "16px", width: "50%" }} >Yes, delete</button>
                                                                <button onClick={setStatusBtn} style={{ color: "white", backgroundColor: "lightgray", border: "none", marginTop: "16px", width: "50%" }} data-toggle="collapse" data-target="#delAd">Cancel</button>

                                                            </div>

                                                        }
                                                    </div>
                                                </Popover.Content>
                                            </Popover>
                                        }
                                    >
                                        <Button onClick={setStatusBtn} style={{ marginTop: "37px", marginBottom: "20px" }} variant="secondary">View Post</Button>
                                    </OverlayTrigger>
                                ))}
                            </>
                        </>
                    }
                </div>
                <div className="container">

                    <div className="ad-s-icon">
                        <i className="fa fa-quote-left"></i>
                    </div>

                    <AdList />

                </div>
            </div>



        </div>

        <Footer/>

        </>


    );
}

export default Home;