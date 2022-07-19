import React, { useState, useEffect } from 'react';
import { apiUrl, doApiGetToken } from '../services/apiService';
import UserListAdmin from './users_list_comps/UsersListAdmin';
import VipListAdmin from './users_list_comps/VipListAdmin';
import AdminList from './users_list_comps/AdminList';
import { Checking_table } from "./js/data";
import $ from "jquery";
import RegularUsersList from './users_list_comps/RegularUsersList';
import BlockUsers from './users_list_comps/BlockUsers';

function UsersAdmin(props) {
    let [users_ar, setUsersArr] = useState([]);
    let [counterApi, setCounterApi] = useState(0);
    let [admins_ar, setAdminsArr] = useState([]);
    let [usersBlock_ar, setUsersBlockArr] = useState([]);

    useEffect(() => {
        let urlUsers = apiUrl + "/users";
        let urlAdmin = apiUrl + "/admins";
        let urlBlock = apiUrl + "/blockeds";

        //  כל הכפתורים של הרדיו
        let radios = document.getElementsByName("RadioOptionsUsers");
        // הערך ששמור בלוקאל סטורז
        let val = localStorage.getItem('RadioOptionsUsers');
        //בודק מה שמור בלוקאל סטורז

        if (val !== null) {
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].value === val && val === "vip") {
                    $('#admins').hide();
                    $('#users').hide();
                    $('#regularUsers').hide();
                    $('#blockUsers').hide();
                    $('#vip').show();

                    doApiGetToken(urlUsers)
                        .then(data => {
                            setUsersArr(data)
                        })
                }
                else if (radios[i].value === val && val === "users") {
                    $('#admins').hide();
                    $('#vip').hide();
                    $('#regularUsers').hide();
                    $('#blockUsers').hide();
                    $('#users').show();

                    doApiGetToken(urlUsers)
                        .then(data => {
                            setUsersArr(data)
                        })
                }
                else if (radios[i].value === val && val === "regularUsers") {
                    $('#admins').hide();
                    $('#vip').hide();
                    $('#users').hide();
                    $('#blockUsers').hide();
                    $('#regularUsers').show();

                    doApiGetToken(urlUsers)
                        .then(data => {
                            setUsersArr(data)
                        })

                }
                else if (radios[i].value === val && val === "admins") {
                    $('#users').hide();
                    $('#vip').hide();
                    $('#regularUsers').hide();
                    $('#blockUsers').hide();
                    $('#admins').show();

                    doApiGetToken(urlAdmin)
                        .then(data => {

                            setAdminsArr(data);
                        })
                }
                else if (radios[i].value === val && val === "blockUsers") {
                    $('#users').hide();
                    $('#vip').hide();
                    $('#regularUsers').hide();
                    $('#blockUsers').show();
                    $('#admins').hide();


                    doApiGetToken(urlBlock)
                        .then(data => {
                            setUsersBlockArr(data)
                        })
                }
            }
        }
        //אם שום דבר לא שמור
        else {
            $("#vip").hide();
            $("#admins").hide();
            $('#regularUsers').hide();
            $('#blockUsers').hide();

            doApiGetToken(urlUsers)
                .then(data => {
                    let arr = data.filter(item => item.block_status === false);
                    
                    setUsersArr(arr)
                })

        }



    }, [counterApi])



    return (
        <>
            <div className="container" style={{ paddingTop: "8rem" }}>
                <div className="form-group py-3 d-flex justify-content-center">
                    <select id="selectUserList" className="custom-select-white mr-sm-3 bg-dark text-white" defaultValue={(localStorage.getItem('RadioOptionsUsers') ? localStorage.getItem('RadioOptionsUsers') : "users")} onChange={e => Checking_table(e, setUsersArr, setAdminsArr , setUsersBlockArr)}>
                        <option name="RadioOptionsUsers" value="users">All Users (excluding admins / blockeds)</option>
                        <option name="RadioOptionsUsers" value="regularUsers">Regular users</option>
                        <option name="RadioOptionsUsers" value="vip">Vip</option>
                        <option name="RadioOptionsUsers" value="admins">Admins</option>
                        <option name="RadioOptionsUsers" value="blockUsers">blocked Users</option>
                    </select>
                </div>


                <div id="users">
                    <UserListAdmin users_ar={users_ar} counterApi={counterApi} setCounterApi={setCounterApi} setUsersArr={setUsersArr} />
                </div>
                <div id="regularUsers">
                    <RegularUsersList users_ar={users_ar} counterApi={counterApi} setCounterApi={setCounterApi} setUsersArr={setUsersArr}/>
                </div>
                <div id="vip">
                    <VipListAdmin users_ar={users_ar} counterApi={counterApi} setCounterApi={setCounterApi} setUsersArr={setUsersArr}/>
                </div>

                <div id="admins">
                    <AdminList admins_ar={admins_ar} counterApi={counterApi} setCounterApi={setCounterApi} />
                </div>

                <div id="blockUsers">
                    <BlockUsers usersBlock_ar={usersBlock_ar} counterApi={counterApi} setCounterApi={setCounterApi} setUsersArr={setUsersArr}/>
                </div>

            </div >
        </>

    )
}

export default UsersAdmin