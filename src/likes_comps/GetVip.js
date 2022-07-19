import React from 'react';
import '../style/css/likes.css';

import { Link } from 'react-router-dom';




function GetVip(props) {

    return (

        <div style={{ position: "relative", top: "-207px" }}>

            <div style={{ position: "relative", top: "276px", zIndex: "3", margin: "auto", width: "35%", backgroundColor: "white", padding: "25px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0, 0, 0, .3)" }}>
                <div style={{ fontSize: "39px", textAlign: "center", marginBottom: "15px" }}>❣️</div>
                <h2 style={{ textAlign: "center" }}>You're a total catch!</h2>
                <p style={{ fontSize: "16px" }}>See all the people who like you by joining <b style={{ color: "lightcoral" }}>VIP</b>.</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link to="/vip"> <button style={{ background: "linear-gradient(to right, pink , #fa50bc)", padding: "10px 17px 10px 17px", border: "none", borderRadius: "32px", fontWeight: "bold", color: "white" }}>JOIN VIP</button></Link>
                </div>
            </div>


            <div style={{ filter: "blur(9px)" }} className="row portfolio-container">
                <div className="col-lg-4 col-md-6 col-sm-12 portfolio-item filter-1 wow fadeInUp" data-wow-delay="0.6s">
                    <div className="portfolio-wrap">
                        <div className="portfolio-img">
                            <img style={{ height: "220px" }} className="img-responsive thumbnail" src={require('../images/likesyouvip.jpg')}  ></img>

                        </div>
                        <div className="portfolio-text">
                            <h3>Olga, 27<br></br>Maor</h3>
                            <a className="btn" ><i className="fa fa-id-card-o"></i></a>
                        </div>
                    </div>
                </div>


                <div className="col-lg-4 col-md-6 col-sm-12 portfolio-item filter-1 wow fadeInUp" data-wow-delay="0.6s">
                    <div className="portfolio-wrap">
                        <div className="portfolio-img">
                            <img style={{ height: "220px" }} className="img-responsive thumbnail" src={require('../images/likesyouvip3.jpg')}  ></img>

                        </div>
                        <div className="portfolio-text">
                            <h3>Regina, 31<br></br>Tel-Aviv</h3>
                            <a className="btn"><i className="fa fa-id-card-o"></i></a>
                        </div>
                    </div>
                </div>


                <div className="col-lg-4 col-md-6 col-sm-12 portfolio-item filter-1 wow fadeInUp" data-wow-delay="0.6s">
                    <div className="portfolio-wrap">
                        <div className="portfolio-img">
                            <img style={{ height: "220px" }} className="img-responsive thumbnail" src={require('../images/likesyouvip4.jpg')}  ></img>

                        </div>
                        <div className="portfolio-text">
                            <h3>Liat, 28<br></br>Petah-Tikva</h3>
                            <a className="btn"><i className="fa fa-id-card-o"></i></a>
                        </div>
                    </div>
                </div>


                <div className="col-lg-4 col-md-6 col-sm-12 portfolio-item filter-1 wow fadeInUp" data-wow-delay="0.6s">
                    <div className="portfolio-wrap">
                        <div className="portfolio-img">
                            <img style={{ height: "220px" }} className="img-responsive thumbnail" src={require('../images/me.jpg')}  ></img>

                        </div>
                        <div className="portfolio-text">
                            <h3>Angelina, 27<br></br>Petah-Tikva</h3>
                            <a className="btn"><i className="fa fa-id-card-o"></i></a>
                        </div>
                    </div>
                </div>


                <div className="col-lg-4 col-md-6 col-sm-12 portfolio-item filter-1 wow fadeInUp" data-wow-delay="0.6s">
                    <div className="portfolio-wrap">
                        <div className="portfolio-img">
                            <img style={{ height: "220px" }} className="img-responsive thumbnail" src={require('../images/koral3.jpg')}  ></img>

                        </div>
                        <div className="portfolio-text">
                            <h3>Koral, 27<br></br>Yehud</h3>
                            <a className="btn"><i className="fa fa-id-card-o"></i></a>
                        </div>
                    </div>
                </div>



            </div>

        </div>

    );
}

export default GetVip;