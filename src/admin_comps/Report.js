import React, { useState, useEffect } from 'react';
import { apiUrl, doApiGetToken } from "../services/apiService";
import { Link } from 'react-router-dom';
import moment from 'moment';
import { delReports } from './js/reports';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
//הסטייל של הכפתור
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

function ReportAdmin() {
    let [report_ar, setReportAr] = useState([]);
    let [counterApi, setCounterApi] = useState(0);
    const classes = useStyles();

    useEffect(() => {
        let url = apiUrl+'/reports';
        doApiGetToken(url)
            .then(data => {
                setReportAr(data);
            })
    }, [counterApi])

    return (
            <div className="container" style={{paddingTop: "10rem"}}>
                <h2>Reports List: </h2>
                <table id="h" className="table table-striped" style={{marginTop:"15px"}}>
                    <thead>
                <tr>
                    <th className="align-middle"><b>Date</b></th>
                    <th className="align-middle"><b>First Name </b></th>
                    <th className="align-middle"><b>Image</b></th>
                    <th className="align-middle"><b>Title</b></th>
                    <th className="align-middle"><b>Info</b></th>
                    <th className="align-middle"><b>User Profile</b></th>
                    <th className="align-middle"><b>Reported Profile</b></th>
                </tr>
                </thead>
                    <tbody>
                        {report_ar.reverse().map(item => {
                            console.log(item);
                            
                            return (
                                <tr key={item._id}  >
                                    <td className="align-middle">{moment(item.date).format('DD/MM/YYYY')}</td>
                                    <td className="align-middle">{item.name}</td>
                                    <td className="align-middle"><img src={apiUrl +"/images/users_imgs/" + item.image} height="50" width="80" alt='img'/></td>
                                    <td className="align-middle">{item.title}</td>
                                    <td className="align-middle">{item.info}</td>
                                    <td className="align-middle"><Link to={`/admin/profileUsers/${item.user_report_id}`}>View Profile</Link></td>
                                    <td className="align-middle"><Link to={`/admin/profileUsers/${item.reported_id}`}>View Profile </Link></td>
                                    <td className="align-middle">
                                    <Button variant="contained" color="secondary" className={classes.button} startIcon={<DeleteIcon /> } onClick={()=>delReports(item._id,counterApi, setCounterApi)}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
    )
}
export default ReportAdmin;