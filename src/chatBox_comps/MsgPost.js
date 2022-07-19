import React from 'react';
import '../style/css/chat.css'

function MsgPost(props) {

    return (
        <div id="msgAnimate" className="d-flex justify-content-start mb-4">
            <div className="msg_cotainer">
                {props.pmsg}
                            {/* <span className="msg_time">8:40 AM, Today</span> */}
            </div>
        </div>
    )

 

}

export default MsgPost;