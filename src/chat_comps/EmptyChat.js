import React, { useEffect } from 'react';
import '../style/css/chat.css';

import { Link } from 'react-router-dom';












function EmptyChat(props) {




    useEffect(() => {



    }, []);



    return (
        <div className="card" id="gg" >
            {/* <div className="card-header msg_head">
                <div className="d-flex bd-highlight">
                    <div>gvhvhvdss<br></br>hdfbsdjbkdsb</div>
                </div>

            </div> */}

            <div id="empty-chat" className="card-body msg_card_body" >
                <div className="d-flex mb-4" style={{ justifyContent: "center" }}>
                    {/* <div>💞</div> */}
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <h2 style={{fontSize:"33px", color:"blueviolet"}}>Chat Box</h2>
                        <p style={{fontSize:"18px"}}>For more options go back to the <Link to="/home" style={{color:"hotpink"}}>"DoubleTake"</Link> page and find more matches!</p>
                        <img src={require('../images/hearts.png')}  ></img>
                    </div>
                </div>
            </div>

        </div>

    )

}

export default EmptyChat;