import React from 'react';
import '../style/css/chat.css';
import { getAge } from '../style/js/help';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { apiUrl } from '../services/apiService';




function ContactSingle(props) {

    let history = useHistory();

    const loadFunc = () => {
        // window.location.reload();
        document.location.href = "/chatbox/"+props.idBox

        // history.push("/chatbox/"+props.idBox)
    }

    return (
        <Link onClick={loadFunc} to={'/chatbox/' + props.idBox}>
            <li style={{ cursor: "pointer",background: window.location.pathname === "/chatbox/"+props.idBox?"lightslategrey":"bottom" }}  >
                <div className="d-flex bd-highlight">
                    <div className="img_cont">
                    <img className="rounded-circle user_img" src={apiUrl+'/images/users_imgs/' + props.image} />

                   
                        <span style={{display:"none"}} className="online_icon"></span>
                    </div>
                    <div className="user_info">
                        <div><span>{props.first_name}</span>{props.id==="1"? null: <span>{", "+getAge(props.date_of_birth)}</span>}<span style={{fontSize:"11px", color:window.location.pathname === "/chatbox/"+props.idBox?"white":"gray", marginLeft:"6px"}}>{moment(props.lastMsg).calendar()}</span></div>
                    </div>
                </div>
            </li>
        </Link>

    )

}

export default ContactSingle;