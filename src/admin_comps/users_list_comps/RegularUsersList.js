import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { delUser } from '../js/data';
import SelectAdmin from '../select_search/SelectAdmin';
import moment from 'moment';
import { apiUrl } from '../../services/apiService';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import BlockIcon from '@material-ui/icons/Block';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
function RegularUsersList(props) {
    //עושה מערך חדש של משתמשי וי איי פי
    const _ar = props.users_ar.filter(item => item.vip.vip !== true && item.block_status === false);

    let [temp_ar, setTempAr] = useState(_ar);
    let [flag, setFlag] = useState(true);
    const classes = useStyles();
    let textFlag = "regular";
    let [profileSingle, setProfileSingle] = useState([]);
    let [counterApi, setCounterApi] = useState(0);

    useEffect(() => {
        if (counterApi >= 0) {
           let arr =  props.users_ar.map(item => {
               if(item._id === profileSingle._id){
                   item = profileSingle;
               }          
           })
           props.setUsersArr(arr);
            
                        
        }
    }, [counterApi]);
    return (
        <div className="container">
            <h2>Regular Users List: </h2>

            <SelectAdmin flag={flag} setTempAr={setTempAr} temp_ar={temp_ar} setFlag={setFlag} _ar={_ar} textFlag={textFlag}/>

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
                    {(flag ? _ar : temp_ar).map((item, i) => {
                          if(item.block_status === false){
                        return (
                            <tr key={item._id}>
                                <td className="align-middle">{moment(item.registration_date).format('DD/MM/YYYY')}</td>
                                <td className="align-middle">{item.email}</td>
                                <td className="align-middle">{item.first_name}</td>
                                <td className="align-middle"><img src={apiUrl+"/images/users_imgs/"+item.image[0]} height="50" alt="userImg"/></td>
                                <td className="align-middle">{item.gender}</td>
                                <td className="align-middle">{item.city}</td>
                                <td className="align-middle"><Link to={`/admin/profileUsers/${item._id}`}>View Profile</Link></td>
                                <td className="align-middle">
                                    <Button variant="contained" color="secondary" className={classes.button} startIcon={<BlockIcon />} onClick={() => delUser(item._id, item, props.counterApi, props.setCounterApi,setProfileSingle)}>Block</Button>
                                </td>
                            </tr>
                        )
                          }
                    })}
                </tbody>
            </table>
        </div>

    )
}

export default RegularUsersList