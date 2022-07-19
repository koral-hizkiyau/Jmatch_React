import React, { useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from '../Home';
import ContactBox from './ContactBox';

import { useHistory } from 'react-router-dom';

import Footer from '../Footer'




import ChatBox from './ChatBox';


function AppChatBox() {
    let history = useHistory();

    useEffect(() => {


        // history.push("/chatbox")


        localStorage.setItem("count", 0);

        if (JSON.parse(localStorage.getItem("newMsgs"))>0 ){
            localStorage.setItem("newMsgs", 0);
            window.location.reload();
        }

    }, [])


    return (
        <>


        <div className="round-chat">

            <div style={{ paddingBottom: "64px" }} className="container-fluid h-100">
                <div style={{ width: "50%", margin: "auto", marginBottom: "19px" }} className="row h-100">
                    <h2><i style={{marginRight:"10px"}} className="fa fa-comments-o" aria-hidden="true"></i>Messages</h2>

                </div>



                <div className="row justify-content-center h-100">
                    <Router>
                        <div className="col-md-4 col-xl-3 chat">
                            <div className="card mb-sm-3 mb-md-0 contacts_card">
                                {/* side left */}
                                <ContactBox />
                                {/* <div className="card-footer"></div> */}
                            </div>
                        </div>

                        {/*side right*/}
                        <div className="col-md-8 col-xl-6 chat">
                            <Switch>
                                {/* <Route path={'/chatbox/:id'} component={ChatSingle}></Route> */}
                                <Route path={'/home'} component={Home}></Route>
                                <Route path={'/chatbox/:id'} component={ChatBox}></Route>
                            </Switch>

                        </div>
                    </Router>
                </div>


            </div>
        </div>

        <Footer/>

        </>


    );
}

export default AppChatBox;


