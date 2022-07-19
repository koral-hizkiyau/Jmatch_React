import React from 'react';
import './App.css';
import './style/css/about.css';
import { Link } from 'react-router-dom';
import NavRand from './NavRand'
import Nav from './Nav';
import Footer from './Footer';



function AboutUs() {



    return (
        <div>
            {localStorage[process.env.REACT_APP_LOCALHOST_KEY] ? <Nav /> : <NavRand />
            }
            <header className="header-area">
                <div id="home img-home" className="header-hero bg_cover" >
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-8 col-lg-10">
                                <div className="header-content text-center">
                                    <h3 style={{ fontSize: "63px", fontWeight: "bold", color: "blueviolet" }} className="header-title">DATING DESERVES BETTER</h3>
                                    <p className="text">Social networking &#10084; Dating site, Meet new people anytime, anywhere!</p>
                                    <ul className="header-btn">
                                        <li>
                                            <Link to='./register' className="main-btn btn-one btn-about-st" >JOIN Jmatch</Link>

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="header-shape">
                        <img src={require('./images/header-shape.svg')}  ></img>
                    </div>
                </div>
            </header>

            <div className="container">
                <div className="row">
                    <div className="col"> <img src={require('./images/about111.jpeg')}  ></img></div>
                    <div className="col"> <img src={require('./images/about22.png')}  ></img></div>
                    <div className="col"> <img src={require('./images/about33.jpeg')}  ></img></div>
                </div>
            </div>

            {/* <div class="container">
                <div class="row">
                    <div class="col-md-3 col-sm-6">
                        <div class="serviceBox">
                            <div class="service-content">
                                <div class="service-icon">
                                    <span><i class="fa fa-globe"></i></span>
                                </div>
                                <h3 class="title">Web Design</h3>
                                <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quaerat fugit quas veniam perferendis repudiandae sequi, dolore quisquam illum.</p>
                                <a href="#" class="read-more">read more</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6">
                        <div class="serviceBox blue">
                            <div class="service-content">
                                <div class="service-icon">
                                    <span><i class="fa fa-rocket"></i></span>
                                </div>
                                <h3 class="title">Web Development</h3>
                                <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quaerat fugit quas veniam perferendis repudiandae sequi, dolore quisquam illum.</p>
                                <a href="#" class="read-more">read more</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="container">
                <h1 style={{ textAlign: "center", fontSize: "50px", marginBottom: "30px" }}>OUR TEAM</h1>
                <div className="row">
                    <div style={{ display: "flex", justifyContent: "center" }} className="col-6">
                        <img style={{ borderRadius: "50%", filter: "grayscale(100%)", width: "65%" }} src={require('./images/koral3.jpg')}  ></img>

                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }} className="col-6">
                        <img style={{ borderRadius: "50%", filter: "grayscale(100%)", width: "65%" }} src={require('./images/me.jpg')}  ></img>
                    </div>
                </div>

                <div style={{ textAlign: "center", fontSize: "25px", padding: "20px" }} className="row">
                    <div className="col-6">
                        <div>Koral</div>
                    </div>
                    <div className="col-6">
                        <div>Angelina</div>

                    </div>
                </div>


            </div>

            <Footer/>




        </div>





    );
}

export default AboutUs;
