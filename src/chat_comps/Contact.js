import React from 'react';
import '../style/css/chat.css';
import { getAge } from '../style/js/help';



function Contact(props) {
    // className="active"





    return (
            <li style={{ cursor: "pointer" }} onClick={ props.ss,() => props.selectConvers(props.id)}  >
                <div className="d-flex bd-highlight">
                    <div className="img_cont">
                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                            className="rounded-circle user_img"></img>
                        <span className="online_icon"></span>
                    </div>
                    <div className="user_info">
                        <span>{props.first_name}, {getAge(props.date_of_birth)}, {props.msg}</span>
                    </div>
                </div>
            </li>

    )

}

export default Contact;