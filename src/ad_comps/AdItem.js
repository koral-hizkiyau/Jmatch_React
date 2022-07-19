import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/css/home.css';
import { getAge } from '../style/js/help';
import moment from 'moment';
import { apiUrl } from '../services/apiService';




function AdItem(props) {





  return (


    <div className="ad-s-item">

      <div className="ad-s-img">
        <Link to={'/profile/' + props.id_post}>
          <img style={{ height: "183px" }} src={apiUrl+'/images/users_imgs/' + props.user.image[0]} alt="img" />
        </Link>
        <button className="btn-ad btn-pass" onClick={props.onClickPass} >
          <b><i style={{ padding: "3px" }} className="fa fa-times" aria-hidden="true"></i>
            Pass</b></button>
        <button className="btn-ad btn-like" onClick={props.onClickLike}><b><i style={{ padding: "3px" }} className="fa fa-heart" aria-hidden="true"></i>Like</b></button>



      </div>
      <div className="ad-s-text">
        <p>{props.category} &bull;  {moment(props.date).startOf('hour').fromNow()}</p>
        <p>{props.comment}</p>
        <div style={{display:"flex", flexDirection:"row", alignItems:"baseline", justifyContent:"flex-end", color:"gray"}}>Dates:  {moment(props.from_date).format('L')} - {moment(props.till_date).format('L')}<div style={{marginLeft:"19px"}}><span style={{ fontSize: "17px", padding: "3px" }}>{props.who_likes.length}</span><i style={{ fontSize: "22px" }} className="fa">&#xf087;</i></div></div>
        <hr></hr>

        <h4>{props.user.first_name} &bull; {getAge(props.user.date_of_birth)} &bull; {props.user.city} <span> &bull; <Link style={{fontSize:"19px"}} to={'/profile/' + props.id_post}>View Profile</Link></span></h4>

      </div>
    </div>

  )

}

export default AdItem;