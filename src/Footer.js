import React from 'react';
import './App.css';
import './style/css/footer.css'
import {Link} from 'react-router-dom'



function Footer() {


    return (
        <div className="footer">
            <div className="container-fluid">
                <div className="footer-info">
                    <div className="container">

                        <div className="row">
                            <div style={{ width: "50%" }} className="col-6">
                                <img style={{ width: "68%" }} src={require('./images/logo5.png')} alt="Image"></img>
                            </div>

                            <div className="footer-link col-6">
                                <Link className="footer-link" to='/about-us'>ABOUT</Link>
                                <Link className="footer-link" to='/support'>SUPPORT</Link>
                            </div>

                        </div>

                        <div className="row">
                            <div className="footer-copy-r col-6">
                                <p>&copy; <a style={{ color: "lightgrey" }} href="#">Jmatch 2020</a></p>
                            </div>
                            <div style={{ width: "50%" }} className="col-6"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
}

export default Footer;