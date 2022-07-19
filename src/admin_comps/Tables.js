import React from 'react';
import {getAge} from "./js/data"

function TablesAdmmin(props) {

    //חישוב כמות נשים וגברים באתר
    let FeMale = props.users_ar.filter(item => item.gender === "Woman" && item.block_status===false);
    let Male = props.users_ar.filter(item => item.gender === "Man" && item.block_status===false);

    //חישוב כמות נשים וגברים רגילים באתר
    let regularF = props.users_ar.filter(item => item.vip.vip === false && item.gender === "Woman" && item.block_status===false);
    let regularM = props.users_ar.filter(item => item.vip.vip === false && item.gender === "Man" && item.block_status===false);


    //חישוב ממוצע גילאים באתר כולל נשים וגברים בנפרד
    let avgAge = 0;
    let avgFeMale = 0;
    let countF = 0;
    let countM = 0;
    let avgMale = 0;

    for (let index = 0; index < props.users_ar.length; index++) {
        if (props.users_ar[index].date_of_birth !== undefined && props.users_ar[index].block_status===false) {
            avgAge += getAge(props.users_ar[index].date_of_birth)
        }

        if (props.users_ar[index].gender === "Woman" && props.users_ar[index].block_status===false) {
            avgFeMale += getAge(props.users_ar[index].date_of_birth);
            countF++;
        }
        else if (props.users_ar[index].gender === "Man" && props.users_ar[index].block_status===false) {
            avgMale += getAge(props.users_ar[index].date_of_birth);
            countM++;

        }
    }
    let allUser = props.users_ar.filter(item => item.block_status===false);
    avgAge = (allUser.length === 0 ? allUser.length : Math.round(avgAge / allUser.length));
    avgFeMale = (countF === 0 ? countF : Math.round(avgFeMale / countF));
    avgMale = (countM === 0 ? countM : Math.round(avgMale / countM));

    //חישוב ממוצע גילאים של אדמינים כולל נשים וגברים בנפרד
    let adminF = props.admins_ar.filter(item => item.gender === "Woman");
    let adminM = props.admins_ar.filter(item => item.gender === "Man");

    //חישוב ממוצע גילאים של ויי איי פי כולל נשים וגברים בנפרד
    let vipF = props.vip_ar.filter(item => item.gender === "Woman" && item.block_status===false);
    let vipM = props.vip_ar.filter(item => item.gender === "Man" && item.block_status===false);

    //כמות מודעות באתר כולל נשים וגברים בנפרד
    let adsFeMale = props.ads_ar.filter(item => item.user.gender === "Woman");
    let adsMale = props.ads_ar.filter(item => item.user.gender === "Man");

  
    // מחשב כמות אנשים לפי איזורים ולפי גבר או אישה
    let citesCount = allUser.map(item => {
        return { "area": item.city, "gender": item.gender }
        
    })
    let arrr = []
    for(let i=0 ; i<citesCount.length; i++){
        for(let j=0 ; j<props.cities_ar.length; j++){
           if (citesCount[i].area === props.cities_ar[j].city_name) { 
              arrr.push({ "area": props.cities_ar[j].area }) 
              break;
           }
        } 
    }
   
    let south = { count: 0, genderF: 0, genderM: 0 };
    let center = { count: 0, genderF: 0, genderM: 0 };
    let north = { count: 0, genderF: 0, genderM: 0 };

    for (let index = 0; index < arrr.length; index++) {
        if (arrr[index].area === "south") {
            south.count++;
            if (arrr[index].gender === "Woman") south.genderF++;
            else south.genderM++;
        }
        else if (arrr[index].area === "center") {
            center.count++;
            if (arrr[index].gender === "Woman") center.genderF++;
            else center.genderM++;
        }
        else if (arrr[index].area === "north") {
            north.count++;
            if (arrr[index].gender === "Woman") north.genderF++;
            else north.genderM++;
        }
    }

//משתמשים חסומים
let FemaleBlock = props.usersBlock_ar.filter(item => item.gender === "Woman")
let MaleBlock = props.usersBlock_ar.filter(item => item.gender === "Man")



    return (
        <div className="container">
            <h2>User quantity data divided into different categories </h2>

            <table id="h" className="table table-striped">
                <thead>
                    <tr>
                        <th className="align-middle"></th>
                        <th className="align-middle"><b>All Genders</b></th>
                        <th className="align-middle"><b>Woman</b></th>
                        <th className="align-middle"><b>Man</b></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className="align-middle"> Users count (exluding admins):</th>
                        <td className="align-middle">{FeMale.length + Male.length}</td>
                        <td className="align-middle">{FeMale.length}</td>
                        <td className="align-middle">{Male.length}</td>
                    </tr>
                    <tr>
                        <th className="align-middle">Regular Users count:</th>
                        <td className="align-middle">{regularF.length + regularM.length}</td>
                        <td className="align-middle">{regularF.length}</td>
                        <td className="align-middle">{regularM.length}</td>
                    </tr>
                    <tr>
                        <th className="align-middle">Vips count:</th>
                        <td className="align-middle">{vipF.length + vipM.length}</td>
                        <td className="align-middle">{vipF.length}</td>
                        <td className="align-middle">{vipM.length}</td>
                    </tr>
                    <tr>
                        <th className="align-middle">Admins count:</th>
                        <td className="align-middle">{adminF.length + adminM.length}</td>
                        <td className="align-middle">{adminF.length}</td>
                        <td className="align-middle">{adminM.length}</td>
                    </tr>
                    <tr>
                        <th className="align-middle">Blocked Users count:</th>
                        <td className="align-middle">{props.usersBlock_ar.length}</td>
                        <td className="align-middle">{FemaleBlock.length}</td>
                        <td className="align-middle">{MaleBlock.length}</td>
                    </tr>
                    <tr>
                        <th className="align-middle">Avg of users:</th>
                        <td className="align-middle">{avgAge}</td>
                        <td className="align-middle">{avgFeMale}</td>
                        <td className="align-middle">{avgMale}</td>
                    </tr>
                    <tr>
                        <th className="align-middle">Count of ads:</th>
                        <td className="align-middle">{props.ads_ar.length}</td>
                         <td className="align-middle">{adsFeMale.length}</td>
                        <td className="align-middle">{adsMale.length}</td>
                    </tr>
                    <tr>
                        <th className="align-middle">South area count:</th>
                        <td className="align-middle">{south.count}</td>
                        <td className="align-middle">{south.genderF}</td>
                        <td className="align-middle">{south.genderM}</td>
                    </tr>
                    <tr>
                        <th className="align-middle">Center area count:</th>
                        <td className="align-middle">{center.count}</td>
                        <td className="align-middle">{center.genderF}</td>
                        <td className="align-middle">{center.genderM}</td>
                    </tr>
                    <tr>
                        <th className="align-middle">North area count:</th>
                        <td className="align-middle">{north.count}</td>
                        <td className="align-middle">{north.genderF}</td>
                        <td className="align-middle">{north.genderM}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TablesAdmmin