import React, { useEffect, useState } from 'react';
import { apiUrl, doApiGetToken } from '../../services/apiService';
import {getAge} from "../js/data"
// import "../css/profile.css"
import { useHistory } from 'react-router-dom';
import $ from "jquery"
import "../../style/css/profile.css"

function ProfileUsers(props) {
  

    let [profileSingle, setProfileSingle] = useState([]);
    let history = useHistory();

    let [imgArr, setImgArr] = useState([]);

    let [imgIndex, setImgIndex] = useState(0);
  let userId = props.match.params.id;
    let userData;
    useEffect(() => {
        let urlUsers = apiUrl + "/users/profile/" + props.match.params.id;

        doApiGetToken(urlUsers)
            .then(data => {
          
                setImgArr(data.image);
              setProfileSingle(data);
            })
            

            
            

    }, [])
    const prev = () => {
        setImgIndex(imgIndex - 1)
    }

    const next = () => {
        setImgIndex(imgIndex + 1)
    }

    const showTab = () => {
        $("#showTab").show();


    }

    const closeTab = () => {
        $("#showTab").hide();
    }




    return (

        <div style={{ backgroundColor: "#f3f5f9", padding: "120px" }}>


          

            <div className="container" >
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog modal-xl">


                        <div className="modal-content">
                            <div style={{ height: "100%", display:"flex", flexDirection:"row", alignItems:"center" }} id="gallery" className="modal-body">
                                {imgArr.length === 1 ? null : <>{imgIndex === 0 ? null : <div style={{backgroundColor:"lightblue", color:"white", padding:"7px"}} className="prevnext-st" onClick={prev}>❮</div>}</>}

                                <div style={{ display: "flex", flexDirection: "row" }} id="gal-round1" >

                                    <div style={{ display: "flex" }} id="gal-round2" >
                                        <img className="img-responsive thumbnail" src={apiUrl+'/images/users_imgs/' + imgArr[imgIndex]} style={{ width: "90%", margin: "auto", padding: "40px" }} alt="img" />
                                    </div>

                                </div>
                                {imgArr.length === 1 ? null : <> {imgIndex === imgArr.length - 1 ? null : <div style={{backgroundColor:"lightblue", color:"white", padding:"7px"}} className="prevnext-st" onClick={next}>❯</div>} </>}


                            </div>
                        </div>

                    </div>
                </div>


                <div className="row user-menu-container square" >
                    <div className="col-md-7 user-details">
                        <div className="row coralbg white">
                            <div className="col-md-4 no-pad">
                                <div className="user-pad">                               
                                    <h3><span id="user-name-st">{profileSingle.first_name}</span></h3>
                                    <h4>{getAge(profileSingle.date_of_birth)} &bull; {profileSingle.city}</h4>
                                </div>
                            </div>
                            <div className="col-md-8 no-pad">
                                <div style={{ cursor: "pointer" }} className="user-image" data-toggle="modal" data-target="#myModal">
                                    <img className="img-responsive thumbnail" src={apiUrl+'/images/users_imgs/' + imgArr[0]} alt="img" />
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

                               
                                <button className="btn-profile btn-pass" onClick={()=>history.goBack()}><b><i style={{ padding: "3px" }} className="fa fa-arrow-left" aria-hidden="true"></i>Back</b></button>    
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
                            <div className="details-user-st"><i className="fa fa-envelope fafa-pro-st"></i><div>{profileSingle.email}</div></div>
                                <div className="details-user-st"><i className="fa fa-flash fafa-pro-st"></i><div>{profileSingle.orientation !== "" ? profileSingle.orientation + "," : null} {profileSingle.gender} {profileSingle.relationship !== "" ? "," + profileSingle.relationship : null} {profileSingle.relationship_type !== "" ? "," + profileSingle.relationship_type : null}</div></div>
                                <div className="details-user-st"><i className="fa fa-star fafa-pro-st"></i><div>{profileSingle.height !== "" ? profileSingle.height : null} {profileSingle.body_type !== "" ? "," + profileSingle.body_type : null}</div></div>
                                <div className="details-user-st"><i className="fa fa-globe fafa-pro-st"></i><div>{profileSingle.speaks === undefined ? null : profileSingle.speaks.map(lan => <span>{lan + ","}</span>)} {profileSingle.education !== "" ? profileSingle.education : null}</div></div>
                                <div className="details-user-st"><i className="fa fa-glass fafa-pro-st" ></i><div>{profileSingle.smoking !== "" ? profileSingle.smoking : null} {profileSingle.drinking !== "" ? "," + profileSingle.drinking : null}{profileSingle.marijuana !== "" ? "," + profileSingle.marijuana : null}</div></div>
                                <div className="details-user-st"><i className="fa fa-home fafa-pro-st"></i><div>{profileSingle.children !== "" ? profileSingle.children : null}{profileSingle.pets !== "" ? " ," + profileSingle.pets : null}</div></div>
                                <div className="details-user-st"><i className="fa fa-eye fafa-pro-st"></i><div>Looking for man for long-term-dating</div></div>
                            </div>

                        </div>
                        <div className="user-menu-content">
                            <h3>Your Inbox</h3>
                        </div>


                    </div>
                </div>
            </div>


        </div>




    )
 }

export default ProfileUsers