import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl, doApiGet } from '../services/apiService';
import moment from 'moment';
import { delAds } from './js/ads';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import SelectAds from './select_search/SelectAds';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function AdsAdmin() {
  let [ads_ar, setAdsArr] = useState([]);
  let [counterApi, setCounterApi] = useState(0);
  let [flag, setFlag] = useState(true);
  let [temp_ar, setTempAr] = useState(ads_ar);

  const classes = useStyles();

  useEffect(() => {
    let url = apiUrl + '/ads';
    doApiGet(url)
      .then(data => {
        setAdsArr(data);
      })
  }, [counterApi])


  return (
      <div className="container"  style={{ paddingTop: "10rem" }}>
        <SelectAds ads_ar={ads_ar} setTempAr={setTempAr} setFlag={setFlag}/>
        <h2>Posts in the system:</h2>
        <table className="table table-striped" style={{marginTop:"15px"}}>
          <thead>
            <tr>
              <th className="align-middle"><b>Date</b></th>
              <th className="align-middle"><b>Email </b></th>
              <th className="align-middle"><b>First Name </b></th>
              <th className="align-middle"><b>category</b></th>
              <th className="align-middle"><b>Post</b></th>
              <th className="align-middle"><b>User Profile</b></th>
            </tr>
          </thead>
          <tbody>
            {(flag ? ads_ar : temp_ar).map((item, i) => {
              
              return (
                <tr key={item._id}>
                  <td className="align-middle">{moment(item.date).format('DD/MM/YYYY')}</td>
                  <td className="align-middle">{item.user.email}</td>
                  <td className="align-middle">{item.user.first_name}</td>
                  <td className="align-middle">{item.category}</td>
                  <td className="align-middle">{item.comment}</td>
                  <td className="align-middle"><Link to={`/admin/profileUsers/${item.user._id}`}>View Profile</Link></td>
                  <td className="align-middle">
                    <Button variant="contained" color="secondary" className={classes.button} startIcon={<DeleteIcon />} onClick={() => delAds(item._id, counterApi, setCounterApi)}>Delete</Button>
                  </td>
                </tr>
              )})}
          </tbody>
        </table>
      </div>
  )
}
export default AdsAdmin;