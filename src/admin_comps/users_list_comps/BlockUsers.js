import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SelectAdmin from '../select_search/SelectAdmin';
import moment from 'moment';
import { apiUrl } from '../../services/apiService';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import BlockIcon from '@material-ui/icons/Block';
import {UnblockUser} from "../js/data";
const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));
function BlockUsers(props) {
    let [temp_ar, setTempAr] = useState(props.usersBlock_ar);
    let [flag, setFlag] = useState(true); 
    let textFlag = "blockeds";
    const classes = useStyles();
    let [profileSingle, setProfileSingle] = useState([]);

    return (
        <div className="container">
            <h2>Blocked users List: </h2>
            <SelectAdmin  flag={flag} setTempAr={setTempAr} temp_ar={temp_ar} setFlag={setFlag} _ar={props.usersBlock_ar} textFlag={textFlag}/>


            <table id="h" className="table table-striped" style={{marginTop:"15px"}}>
            <thead>
            <tr>
                    <th className="align-middle"><b>Registration Date</b></th>
                    <th className="align-middle"><b>Email</b></th>
                    <th className="align-middle"><b>First Name </b></th>
                    <th className="align-middle"><b>Image</b></th>
                    <th className="align-middle"><b>gender</b></th>
                    <th className="align-middle"><b>City</b></th>
                    <th className="align-middle"><b>User Profile</b></th>
                </tr>
                </thead>
                <tbody>
                    {(flag ? props.usersBlock_ar : temp_ar).map((item, i) => {
                        return (
                            <tr key={item._id}  >
                                <td className="align-middle">{moment(item.registration_date).format('DD/MM/YYYY')}</td>
                                <td className="align-middle">{item.email}</td>
                                <td className="align-middle">{item.first_name}</td>
                                <td className="align-middle"><img src={apiUrl+"/images/users_imgs/"+item.image[0]} height="50" alt="userImg" /></td>
                                <td className="align-middle">{item.gender}</td>
                                <td className="align-middle">{item.city}</td>
                                <td className="align-middle"><Link to={`/admin/profileBlock/${item._id}`}>View Profile</Link></td>                               
                                <td className="align-middle">
                                    <Button variant="contained" color="secondary" className={classes.button} startIcon={<BlockIcon />} onClick={() => UnblockUser(item._id, item, props.counterApi, props.setCounterApi,setProfileSingle)}>Unblock</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default BlockUsers