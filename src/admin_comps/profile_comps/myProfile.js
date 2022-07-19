import React, { useEffect, useRef, useState } from 'react';
import { apiUrl, doApiGetToken } from '../../services/apiService';
import { getAge } from "../js/data"
import "../css/profile.css"
import {changeData,updateGender,updateDateCity,updateName, updateImage, closeUpdate} from "../js/myprofile";



function MyProfile(props) {
    let [profileSingle, setProfileSingle] = useState([]);
    let [counterApi, setCounterApi] = useState(0);
    let [valCity, setValCity] = useState([])

    let genderRef = useRef();
    let cityRef = useRef();
    let fnameRef = useRef();
    let imageRef = useRef();

    useEffect(() => {
        let urlAdmins = apiUrl + "/admins/profile/" + props.match.params.id;
        doApiGetToken(urlAdmins)
            .then(data => {                
                setProfileSingle(data);
            })
        let urlCities = apiUrl + "/cities";
        doApiGetToken(urlCities)
            .then(data => {
                setValCity(data);
            })
    }, [counterApi])


    return (
        <div style={{ backgroundColor: "#f3f5f9", padding: "120px" }}>

            <div className="container" key={profileSingle._id}>


                <div className="row user-menu-container square" >
                    <div className="col-md-7 user-details">
                        <div className="row coralbg">
                            <div className="col-md-6 no-pad">
                                <div className="user-pad">
                                    <div id="afterN" style={{ display: "none" }}>
                                        <div className="label-register"></div>
                                        <input className="input-register" id="id-name" ref={fnameRef} type="text" defaultValue={profileSingle.first_name} />
                                        <i style={{ color: "green", marginLeft: "10px" }} className="fa fa-check fafa-pro-st" aria-hidden="true" onClick={()=>updateName(profileSingle,fnameRef,counterApi,setCounterApi,setProfileSingle)}></i><i style={{ color: "red" }} className="fa fa-times fafa-pro-st" aria-hidden="true" onClick={() => closeUpdate("name",profileSingle.first_name)}></i></div>

                                    <h3 id="beforeN"><span id="user-name-st">{profileSingle.first_name}</span><i style={{ color: "rgb(5, 0, 190)", marginLeft: "10px" }} className="fa fa-pencil-square-o" aria-hidden="true" id="name" onClick={() => changeData("name")}></i></h3>



                                    <div id="afterC" style={{ display: "none" }}>
                                        <h4>{getAge(profileSingle.date_of_birth)} &bull;</h4>
                                        <select className="input-register" id="id_city"  defaultValue={profileSingle.city} selected ref={cityRef} >
                                            {valCity.map((city, i) => {
                                                return (
                                                    <option key={i}>{city.city_name}</option>
                                                )
                                            })}
                                        </select><i style={{ color: "green", marginLeft: "10px" }} className="fa fa-check fafa-pro-st" aria-hidden="true" onClick={()=>updateDateCity(profileSingle,cityRef,counterApi,setCounterApi,setProfileSingle)}></i><i style={{ color: "red" }} className="fa fa-times fafa-pro-st" aria-hidden="true" onClick={() => closeUpdate("city")}></i></div>
                                    <h4 id="beforeC">{getAge(profileSingle.date_of_birth)} &bull; {profileSingle.city}<i style={{ color: "rgb(5, 0, 190)", marginLeft: "10px" }} className="fa fa-pencil-square-o" aria-hidden="true" onClick={() => changeData("city")}></i>
                                    </h4>
                                    <i style={{ fontSize: "89px", color: "white" }} className="fa fa-gear"></i>

                                </div>
                            </div>
                            
                            <div className="col-md-8 no-pad">
                        
                                <div className="user-image" data-toggle="modal" data-target="#myModal">  
                                    <img className="img-responsive thumbnail" src={apiUrl + "/images/users_imgs/" + profileSingle.image} id="id-file" alt='img' />
                                   
                                     

                           

                                </div>
                                <div id="beforeI"><i style={{ color: "rgb(5, 0, 190)", marginLeft: "10px" }} className="fa fa-pencil-square-o" aria-hidden="true" onClick={() => changeData("image")}></i></div>

                                <div id="afterI" style={{ display: "none" }}><i style={{ color: "green", marginLeft: "10px" }} className="fa fa-check fafa-pro-st" aria-hidden="true" onClick={()=>updateImage(profileSingle,imageRef,counterApi,setCounterApi,setProfileSingle)}></i><i style={{ color: "red" }} className="fa fa-times fafa-pro-st" aria-hidden="true" onClick={() => closeUpdate("image")}></i>
                                <div style={{ width: "17%", marginTop: "10px" , marginLeft: "20px"}} className="custom-file">
                                 <input type="file" className="custom-file-input" id="customFile" ref={imageRef}></input>
                                 <label className="custom-file-label" htmlFor="customFile"></label>
                                </div>
                                    </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-md user-menu user-pad">
                        <div className="user-menu-content active">
                            <div style={{ fontSize: "24px", color: "#ff4dc4" }}><i style={{ marginRight: "10px" }} className="fa fa-gears"></i>More Settings</div>
                            <div>
                                <div className="details-user-st"><i className="fa fa-flash fafa-pro-st"></i>
                                    <div id="afterG" style={{ display: "none" }}><select  defaultValue={profileSingle.gender} id="id-gender" selected ref={genderRef} >
                                        <option value="Man">Man</option>
                                        <option value="Woman">Woman</option>
                                    </select> <i style={{ color: "green", marginLeft: "10px" }} className="fa fa-check fafa-pro-st" aria-hidden="true" onClick={()=>updateGender(profileSingle,genderRef,counterApi,setCounterApi,setProfileSingle)}></i><i style={{ color: "red" }} className="fa fa-times fafa-pro-st" aria-hidden="true" onClick={() => closeUpdate("gender")}></i>
                                    </div>
                                    <div id="beforeG">{profileSingle.gender}<i style={{ color: "rgb(5, 0, 190)", marginLeft: "10px" }} className="fa fa-pencil-square-o" aria-hidden="true" onClick={() => changeData("gender")}></i></div></div>

                                <div id="beforeE" className="details-user-st"><i className="fa fa-envelope fafa-pro-st"></i><div>{profileSingle.email}</div></div>


                                <div className="details-user-st"><i className="fa fa-star fafa-pro-st"></i><div>Owner: {(profileSingle.owner === true ? "Yes" : "No")}</div></div>



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

export default MyProfile