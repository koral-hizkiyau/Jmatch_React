import React, { useEffect, useState } from 'react';
import { doApiGet, apiUrl } from "../services/apiService";
import GraphAdmin from './graphs_comps/GraphAdmin';
import GraphCat from './graphs_comps/GraphCat';
import $ from "jquery";
import GraphBlocked from './graphs_comps/GraphBlocked';
import Tables from './Tables';
import NavAdmin from './NavAdmin';
import GraphAera from './graphs_comps/GraphAera';

function SystemReportsAdmin(props) {
    let [users_ar, setUsersAr] = useState([])
    let [admins_ar, setAdminsAr] = useState([])
    let [vip_ar, setVipAr] = useState([])
    let [ads_ar, setAdsAr] = useState([])
    let [cities_ar, setCitiesAr] = useState([])
    let [usersBlock_ar, setUsersBlockArr] = useState([]);


    useEffect(() => {

        //  כל הכפתורים של הרדיו
        let radios = document.getElementsByName("inlineRadioOptions");
        // הערך ששמור בלוקאל סטורז
        let val = localStorage.getItem('inlineRadioOptions');

        //בודק מה שמור בלוקאל סטורז
        if (val !== null) {
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].value === val && val === "tables") {
                    $('#diagrams').hide();
                    $('#tables').show();
                    radios[i].defaultChecked = true;
                }
                else if (radios[i].value === val && val === "diagrams") {
                    $('#tables').hide();
                    $('#diagrams').show();
                    radios[i].defaultChecked = true;
                }
                else {
                    radios[i].defaultChecked = false;
                }
            }
        }
        //אם שום דבר לא שמור
        else {
            $('#tables').hide();

        }



        let urlUsers = apiUrl + "/users";
        let urlAdmins = apiUrl + "/admins";
        let urlAds = apiUrl + "/ads";
        let urlCities = apiUrl + "/cities";
        let urlBlocked = apiUrl + "/blockeds";


        doApiGet(urlUsers)
            .then(data => {
                setUsersAr(data)
            })
        doApiGet(urlUsers)
            .then(data => {
                let da = data.filter(item => item.vip.vip === true && item.block_status === false)
                setVipAr(da)
            })
        doApiGet(urlAdmins)
            .then(data => {
                setAdminsAr(data)
            })
        doApiGet(urlAds)
            .then(data => {
                setAdsAr(data)
            })
        doApiGet(urlCities)
            .then(data => {
                setCitiesAr(data)
            })
        doApiGet(urlBlocked)
            .then(data => {
                setUsersBlockArr(data)
            })

    }, [])



    const radioClick = (e) => {
        //מעדכן את הלוקאל סטורז כל פעם מחדש לפי הערך
        localStorage.setItem('inlineRadioOptions', e.currentTarget.value);
        //רשימה של הכפתורים
        let radios = document.getElementsByName("inlineRadioOptions");
        //הערך של הלוקאל סטורז
        let val = localStorage.getItem('inlineRadioOptions');
        //לולאה שבודקת איזה כפתור לחוץ ולפי זה משנה דברים
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].value === val && e.currentTarget.value === "tables") {
                $("#diagrams").hide();
                $("#tables").show();
                radios[i].defaultChecked = true;
            }
            else if (radios[i].value === val && e.currentTarget.value === "diagrams") {
                $("#diagrams").show();
                $("#tables").hide();
                radios[i].defaultChecked = true;
            }
            else {
                radios[i].defaultChecked = false;
            }
        }
    }




    return (
        <>
            <NavAdmin />
            <div className="container"  style={{paddingTop: "10rem"}}>
                <div className="container d-flex align-items-center py-3" >
                    <div className="form-check form-check-inline ">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="diagram" value="diagrams" onClick={e => radioClick(e)} defaultChecked />
                        <label className="form-check-label" htmlFor="inlineRadio1" style={{ fontSize: "16px", fontWeight: "bold" }}>Diagrams</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="table" value="tables" onClick={e => radioClick(e)} />
                        <label className="form-check-label" htmlFor="inlineRadio2" style={{ fontSize: "16px", fontWeight: "bold" }}>Tables</label>
                    </div>
                </div>
                <div className="row py-3" id="diagrams">
                    <div className="container col-lg-6 py-3">
                        <GraphAdmin users_ar={users_ar} vip_ar={vip_ar} admins_ar={admins_ar} usersBlock_ar={usersBlock_ar} />
                    </div>
                    <div className="container col-lg-6 py-3">
                        <GraphCat />
                    </div>
                    <div className="container col-lg-6 py-3">
                        <GraphBlocked users_ar={users_ar} />
                    </div>
                    <div className="container col-lg-6 py-3">
                        <GraphAera users_ar={users_ar} />
                    </div>
                </div>
                <div className="row py-3" id="tables">
                    <Tables users_ar={users_ar} ads_ar={ads_ar} admins_ar={admins_ar} vip_ar={vip_ar} cities_ar={cities_ar} usersBlock_ar={usersBlock_ar}/>
                </div>
            </div>
        </>
    )
}

export default SystemReportsAdmin