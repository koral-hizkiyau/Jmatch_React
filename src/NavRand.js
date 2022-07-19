import React, {useEffect} from 'react';
import './App.css';
import './style/css/nav.css';
import { Link } from 'react-router-dom';




function NavRand() {

 
    return (

        <div id="didi" className="navbar navbar-expand-lg bg-light navbar-light nav-sticky">
            <div className="container-fluid">
                <Link to='/' ><img style={{ marginRight: "34px" }} src={require('./images/logo4.png')} width="169px" /></Link>


            </div>

        </div >

    );
}

export default NavRand;