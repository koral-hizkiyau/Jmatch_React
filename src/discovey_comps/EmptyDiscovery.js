import React from 'react';
import '../style/css/likes.css'
import { getAge } from '../style/js/help';
import { Link } from 'react-router-dom'




function EmptyDiscovery(props) {


    return (
        <div id="round-empty-likes"  className="row">
            <img style={{width:"32%", margin:"auto", marginBottom:"0", marginTop:"0"}} src={require('../images/emptystack2.png')}  ></img>
            <h2 style={{fontSize:"33px", color:"blueviolet"}}>Your discovery list is empty</h2>

            <p style={{ fontSize: "18px" }}>For more options go to your <Link to="/my-profile" style={{ color: "hotpink" }}>profile</Link> and update</p>

        </div>
    );
}

export default EmptyDiscovery;