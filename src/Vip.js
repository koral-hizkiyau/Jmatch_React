import React, { useEffect, useState } from 'react';
import './App.css';
import './style/css/vip.css';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { apiUrl, doApiPostToken ,doApiGetToken } from './services/apiService';
import moment from 'moment';
// import { PayPalButton } from "react-paypal-button-v2";
import $ from 'jquery';
import Footer from './Footer';
import EmptyVip from './EmptyVip';








function Vip() {

    let [vipStatus, setVipStatus] = useState(false);



    useEffect(() => {

        let url = apiUrl+'/users/single';
        doApiGetToken(url)
            .then(data => {
                if (data.first_name) {
                    console.log(data)
                    setVipStatus(data.vip.vip)
                }
                else if (data.message) {
                    console.log(data.message);
                }
                else {
                    console.log(data);
                }
            })
    }, [])

    const reloadPage = () => {
        document.location.href = "/home"
    }


    const onSuccess = (payment) => {
        // Congratulation, it came here means everything's fine!
        console.log("The payment was succeeded!", payment);
        // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        let tempObj = {
            vip: {
                vip: true,
                long_vip: 90,
                time: moment()
            }
        }

        let url = apiUrl+'/users/update';
        doApiPostToken(url, tempObj)
            .then(data => {
                if (data.ok === 1) {
                    $("#alertId").css("opacity", 1);

                    // צריך לפתוח מודל שמאשר את התשלום--- להעביר את הכפתור של וי איי פי למצב שאי אפשר ללחוץ 
                    // ולהעביר את היוזר לדף הלייקים
                }
                else if (data.message) {
                }
                else {
                    console.log(data)
                }

            })
    }

    const onCancel = (data) => {

        // User pressed "cancel" or close Paypal's popup!
        console.log('The payment was cancelled!', data);
        // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    }

    const onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        console.log("Error!", err);
        // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
        // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    }

    let env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'ILS'; // or you can set this value from your props or state
    let total = 0.01; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

    const client = {
        sandbox: 'Ab6XvEDfelPKmSZzSMy_yEN3jaUW4m80Z_Pp_2mmuHahFMXywgLSLCx05Yn6KtJUNKGAtooATqB23Jih',

        // production: 'YOUR-PRODUCTION-APP-ID',
    }


    return (
        <>


        <div style={{ backgroundColor: "#f3f5f9" }} className="ad-s" id="review">
            <div style={{ marginTop: "34px", padding: "41px", textAlign: "center", zIndex: "9" }} id="alertId" className="alert alert-success alert-dismissible fade in">
                <a onClick={reloadPage} href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                <strong>Congarts!</strong> Now you can see the full list of peaple who likes you!
                    </div>


            <div style={{ position: "relative", top: "-115px" }} className="container">

                {vipStatus === true ?
                <EmptyVip/>
                
                :

                    <>

                        <div style={{ marginTop: "34px", backgroundColor: "lavenderblush", paddingBottom: "20px", paddingTop: "10px" }} className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
                            <h2 id="h2-vip-text">Get VIP</h2>
                            <p style={{ fontSize: "23px", color: "#ff4dc4", fontWeight: "bold" }}><i className="fa fa-star-o"></i> Get the full list of people who like you! <i className="fa fa-star-o"></i></p>
                        </div>
                        <div style={{ border: "3px dashed white", padding: "30px", background: "linear-gradient(gainsboro, lightgrey, gainsboro)" }} className="row">
                            <div className="col-md-4 col-sm-6">
                                <div className="serviceBox blue">
                                    <div className="service-content">
                                        <div className="service-icon">
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                        </div>
                                        <h3 className="title">1 mounths</h3>
                                        <p style={{ fontSize: "32px" }} className="description"><small><i className="fa fa-shekel"></i></small>12<span>/ mounth</span></p>
                                        <a href="#" className="read-more">
                                            <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />  </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="serviceBox">
                                    <div className="service-content">
                                        <div className="service-icon">
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                        </div>
                                        <h3 className="title">6 mounths</h3>
                                        <p style={{ fontSize: "32px" }} className="description"><small><i className="fa fa-shekel"></i></small>5<span>/ mounth</span></p>
                                        <a href="#" className="read-more">
                                            <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} /> </a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 col-sm-6">
                                <div className="serviceBox blue">
                                    <div className="service-content">
                                        <div className="service-icon">
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                        </div>
                                        <h3 className="title">3 mounths</h3>
                                        <p style={{ fontSize: "32px" }} className="description"><small><i className="fa fa-shekel"></i></small>8<span>/ mounth</span></p>
                                        <a href="#" className="read-more">
                                            <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />  </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>



                }




            </div>



        </div >
        <Footer/>

        </>

    );
}

export default Vip;
