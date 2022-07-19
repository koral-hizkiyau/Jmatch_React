import React from 'react';
import './style/css/likes.css'
import { Link } from 'react-router-dom'




function EmptyVip(props) {


    return (
        <div style={{ marginTop: "83px" }} id="round-empty-likes" className="row">
            <Link to="/likesyou">  <h2 style={{ fontSize: "33px", color: "white", backgroundColor: "cornflowerblue", padding: "20px " }}>Click here to see who likes you</h2></Link>
            <img style={{ width: "32%", margin: "auto", marginBottom: "0", marginTop: "0" }} src={require('./images/emptystack2.png')} alt="img" ></img>



        </div>
    );
}

export default EmptyVip;