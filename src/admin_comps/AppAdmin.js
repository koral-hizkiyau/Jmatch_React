import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Ads from './Ads';
import UsersList from './UsersList';
import Report from './Report';
import NavAdmin from './NavAdmin';
import { apiUrl, doApiGetToken } from '../services/apiService';
import AddAdmin from './AddAdmin';
import ProfileUsers from './profile_comps/ProfileUsers';
import ProfileAdmins from './profile_comps/profileAdmins';
import ProfileBlock from './profile_comps/profileBlock';
import { parseJwt } from './js/data';
import NoAccess from './NoAccess';
import Announce from './Announce';
import Faults from './Faults';
import MyProfile from './profile_comps/myProfile';
import Loader from "./loader";
import SystemReportsAdmin from './SystemReports';

function AppAdmin() {
  let [ownerFlag, setOwnerFlag] = useState(false);
  let [Flag, setFlag] = useState(false);

  useEffect(() => {

    let url = apiUrl + '/admins/checkToken';
    let url1 = apiUrl + '/admins';

    if (localStorage[process.env.REACT_APP_LOCALHOST_KEY]) {
     
      let token = parseJwt(localStorage[process.env.REACT_APP_LOCALHOST_KEY])
      if (token.email === "koralhana@gmail.com" || token.email === "angygy11@gmail.com") {
        setOwnerFlag(true);
      }
      //בודק אם האימייל הוא מנהל או משתמש רגיל
      doApiGetToken(url1)
        .then(data => {
          let count = 0;
          data.map(item => {
            if (item.email === token.email) {
              count++;
              setFlag(true)
            }
          })
          if (count === 0) document.location.href = "/home"
        })
      fetch(url, {
        headers: { 'x-auth-token': localStorage[process.env.REACT_APP_LOCALHOST_KEY] }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message != "ok") {
            //אם הטוקן לא תקין או שלא קיבלנו אישור
            document.location.href = "/"
          }
        })
    }
    else {
      // אם אין בכלל בלוקאל טוקן 
      document.location.href = "/"
    }
   
    //אם יש עדכון בלוקאל סטורג
  }, [localStorage[process.env.REACT_APP_LOCALHOST_KEY] || window.location.pathname==="/"])



  return (



    <div style={{ backgroundColor: "#f3f5f9",minHeight:"100vh"}}>
      <Router>
        <Switch>
          <Route exact path={["/admin/ads", "/admin/users","/admin/announce", "/admin/reports", "/admin/faults", "/admin/addAdmin", "/admin/profileUsers/:id", "/admin/profileAdmins/:id", "/admin/profileBlock/:id", "/admin/myProfile/:id"]} render={() => {
            return (
              Flag ?
                <React.Fragment>
                  <NavAdmin />
                </React.Fragment> : ''

            )
          }
          } />
          {Flag ? <Route path={"/admin"} component={SystemReportsAdmin} /> :
            <Route path={"/admin"} component={Loader} />}

        </Switch>
        {Flag ?
          <>
            <Route path={'/admin/ads'} component={Ads} />
            <Route path={'/admin/users'} component={UsersList} />
            <Route path={'/admin/reports'} component={Report} />
            <Route path={'/admin/announce'} component={Announce} />
            <Route path={'/admin/faults'} component={Faults} />
            {(ownerFlag ? <Route path={'/admin/addAdmin'} component={AddAdmin} />
          : <Route path={'/admin/addAdmin'} component={NoAccess} />)}


        <Route path={'/admin/profileUsers/:id'} component={ProfileUsers} />
        <Route path={'/admin/profileAdmins/:id'} component={ProfileAdmins} />
        <Route path={'/admin/profileBlock/:id'} component={ProfileBlock} />
        <Route path={'/admin/myProfile/:id'} component={MyProfile} />
          </>
          :
          <Route path={"/admin"} component={Loader} />}


       

      </Router>

    </div>

  )
}

export default AppAdmin