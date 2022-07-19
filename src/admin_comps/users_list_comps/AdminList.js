import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { delAdmin, parseJwt } from '../js/data';
import SelectAdmin from '../select_search/SelectAdmin';
import moment from 'moment';
import { apiUrl } from '../../services/apiService';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

function AdminList(props) {
    let [temp_ar, setTempAr] = useState(props.admins_ar);
    let [flag, setFlag] = useState(true);
    let [tok, setTok] = useState((parseJwt(localStorage[process.env.REACT_APP_LOCALHOST_KEY])));
    const classes = useStyles();
    let textFlag = "admins";


    return (
        <div className="container">
            <h2>Admins List:</h2>

            <SelectAdmin flag={flag} setTempAr={setTempAr} temp_ar={temp_ar} setFlag={setFlag} _ar={props.admins_ar} textFlag={textFlag}/>
            <table className="table table-striped" style={{marginTop:"15px"}}>
            <thead>
            <tr>
                    <th className="align-middle"><b>Registration Date</b></th>
                    <th className="align-middle"><b>Email</b></th>
                    <th className="align-middle"><b>First Name </b></th>
                    <th className="align-middle"><b>Image</b></th>
                    <th className="align-middle"><b>gender</b></th>
                    <th className="align-middle"><b>City</b></th>
                    <th className="align-middle"><b>Admin Profile</b></th>
                </tr>
                </thead>
                <tbody>
                    {(flag ? props.admins_ar : temp_ar).map(item =>{
                        return(
                            <tr key={item._id}>
                                <td className="align-middle">{moment(item.registration_date).format('DD/MM/YYYY')}</td>
                                <td className="align-middle">{item.email}</td>
                                <td className="align-middle">{item.first_name}</td>
                                <td className="align-middle"><img src={apiUrl + "/images/users_imgs/" + item.image} height="50" alt="adminImg"/></td>
                                <td className="align-middle">{item.gender}</td>
                                <td className="align-middle">{item.city}</td>
                                <td className="align-middle"><Link to={`/admin/profileAdmins/${item._id}`}>View Profile</Link></td>
                                {(item.owner || item._id===tok._id ? null : (<td className="align-middle">
                                <Button variant="contained" color="secondary" className={classes.button} startIcon={<DeleteIcon /> } onClick={() => delAdmin(item._id, item, props.counterApi, props.setCounterApi)}>Delete</Button>
                                </td>))}
                            </tr>
                        )
                    })}
                </tbody>
            </table></div>
    )
}

export default AdminList