import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import "./css/profile.css"
import './css/navAdmin.css';
import { parseJwt } from "./js/data";
import { apiUrl, doApiGetToken } from '../services/apiService';
import NavDropdown from 'react-bootstrap/NavDropdown'

function NavAdmin() {
    let [tok, setTok] = useState(0);
    let [admins_ar, setAdminsArr] = useState([]);

    let linkArray = ["/admin","/admin/ads", "/admin/users", "/admin/announce", "/admin/reports", "/admin/faults", "/admin/addAdmin"];
    
    useEffect(() => {
       

        if (localStorage[process.env.REACT_APP_LOCALHOST_KEY]) {
            let urlAdmin = apiUrl + "/admins";

            doApiGetToken(urlAdmin)
                .then(data => {
                    let token = parseJwt(localStorage[process.env.REACT_APP_LOCALHOST_KEY])
                    setTok(token);
                    data.filter(item => {
                        if (item._id === token._id) {
                            setAdminsArr(item);
                        }
                    })
                    pageChange(window.location.pathname)

                })
        }



    }, [localStorage[process.env.REACT_APP_LOCALHOST_KEY]])

    const logoutAdmin = () => {
        localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
        document.location.href = "/"
    }


    const pageChange = (after) => {

        linkArray.map(item => {          
            if (item === after) {
                document.getElementById(after).classList.add("active-n");
                document.getElementById(after).style["color"] = "#ff4dc4";
            }
            else{
                document.getElementById(item).classList.remove("active-n");
                document.getElementById(item).removeAttribute("style");
            }

        })



    }



    return (
        <div id="sticky-nav" className="navbar navbar-expand-lg bg-light navbar-light nav-sticky">
            <div className="container-fluid">
                <Link to="/admin">
                    <img style={{ marginRight: "34px" }} src={require('../images/logo4.png')} width="169px" alt='img'/>
                </Link>
                <Link to={`/admin/myProfile/${tok._id}`} className="nav-item nav-link" >
                    <img style={{ borderRadius: "100px", width: "50px" }} src={apiUrl + "/images/users_imgs/" + admins_ar.image} width="169px" onClick={() => pageChange("")} alt="img"/>
                </Link>

                <NavDropdown title={<b>{admins_ar.first_name}</b>} id="basic-nav-dropdown" style={{ fontSize: "18px", marginLeft: "-11px" }}>
                    <NavDropdown.Item id="drop" className="nav-item nav-link" href={`/admin/myProfile/${tok._id}`} style={{ fontSize: "18px", color: "white" }} onClick={() => pageChange("")}>My Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item id="drop" className="nav-item nav-link" onClick={logoutAdmin} style={{ fontSize: "18px", color: "white" }}>Sign Out</NavDropdown.Item>
                </NavDropdown>






                <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse" >
                    <div className="navbar-nav ml-auto" style={{ color: "gray" }} >
                        <Link to='/admin' id="/admin" className="nav-item nav-link" onClick={() => pageChange("/admin")}>Home</Link>
                        <Link to='/admin/ads' id="/admin/ads" className="nav-item nav-link" onClick={() => pageChange("/admin/ads")}>Posts</Link>
                        <Link to='/admin/users' id="/admin/users" className="nav-item nav-link" onClick={() => pageChange("/admin/users")}>Users</Link>
                        <Link to='/admin/reports' id="/admin/reports" className="nav-item nav-link" onClick={() => pageChange("/admin/reports")}>Reports</Link>
                        <Link to='/admin/announce' id="/admin/announce" className="nav-item nav-link" onClick={() => pageChange("/admin/announce")}>Announce</Link>
                        <Link to='/admin/faults' id="/admin/faults" className="nav-item nav-link" onClick={() => pageChange( "/admin/faults")}>Faults</Link>
                        <Link to='/admin/addAdmin' id="/admin/addAdmin" className="nav-item nav-link" onClick={() => pageChange("/admin/addAdmin")}>Add Admin</Link>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default NavAdmin