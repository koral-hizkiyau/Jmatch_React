import React, { useEffect, useState } from 'react';
import { apiUrl, doApiGetToken } from '../../services/apiService';
import {getAge} from "../js/data"
import "../css/profile.css"
import { useHistory } from 'react-router-dom';



function ProfileAdmins(props) {

    let [profileSingle, setProfileSingle] = useState([]);
    let history = useHistory();

    useEffect(() => {
        let urlAdmins = apiUrl + "/admins/profile/" + props.match.params.id;

        
              doApiGetToken(urlAdmins)
              .then(data => {
                setProfileSingle(data);
              })

        
            

    }, [])

console.log(profileSingle);

    return (
      
    
      <div style={{ backgroundColor: "#f3f5f9", padding: "120px" }}>

      <div className="container" key={profileSingle._id}>
          <div className="modal fade" id="myModal" role="dialog">
              <div className="modal-dialog">

                  <div className="modal-content">
                      <div className="modal-body">


                          <img className="img-responsive thumbnail" src={apiUrl+"/images/users_imgs/"+profileSingle.image} width="400" alt='img'/>


                      </div>
                  </div>
                  

              </div>
          </div>



          <div className="row user-menu-container square" >
              <div className="col-md-7 user-details">
                  <div className="row coralbg">
                      <div className="col-md-4 no-pad">
                          <div className="user-pad">
                              <h3><span id="user-name-st">{profileSingle.first_name}</span></h3>
                              <h4>{getAge(profileSingle.date_of_birth)} &bull; {profileSingle.city}</h4>



                          </div>
                      </div>
                      <div className="col-md-8 no-pad modal-body">
                          <div className="user-image modal-xl" data-toggle="modal" data-target="#myModal" style={{height: "100%", display:"flex", flexDirection:"row", alignItems:"center" }} id="gallery">                          
                              <img className="img-responsive thumbnail" src={apiUrl+"/images/users_imgs/"+profileSingle.image} alt="img"/>
                             
                             
                          </div>
                      </div>
                      
                  </div>             
                  <div className="row overview">
                            <div style={{ margin: "auto", marginTop: "12px" }}>                      
                                <button className="btn-profile btn-pass" onClick={()=>history.goBack()}><b><i style={{ padding: "3px" }} className="fa fa-arrow-left" aria-hidden="true"></i>Back</b></button>    
                            </div>

                        </div>
              </div>

              <div className="col-md user-menu user-pad">
                  <div className="user-menu-content active">

                      <div>
                          <div className="details-user-st"><i className="fa fa-flash fafa-pro-st"></i><div>{profileSingle.gender}</div></div>
                          <div className="details-user-st"><i className="fa fa-envelope fafa-pro-st"></i><div>{profileSingle.email}</div></div>
                          <div className="details-user-st"><i className="fa fa-star fafa-pro-st"></i><div>Owner: {(profileSingle.owner ? "Yes" : "No")}</div></div>
                         
                         

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

export default ProfileAdmins