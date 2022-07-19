import React from 'react';
import '../style/css/likes.css'
import { getAge } from '../style/js/help';
import { Link } from 'react-router-dom'




function EmptyLikes(props) {


    return (
        <div id="round-empty-likes"  className="row">
            <img style={{width:"32%", margin:"auto", marginBottom:"0", marginTop:"0"}} src={require('../images/emptystack2.png')}   alt="img"></img>
            <h2 style={{fontSize:"33px", color:"blueviolet"}}>Your likes list is empty</h2>

            <p style={{ fontSize: "18px" }}>For more options go back to the <Link to="/home" style={{ color: "hotpink" }}>"DoubleTake"</Link> and publish a post!</p>

        </div>
    );
}

export default EmptyLikes;