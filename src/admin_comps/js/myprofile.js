import { checkOnlyLetters } from '../../register_comps/js/checkData';
import $ from "jquery";
import { apiUrl, doApiPost, doApiPostToken, doPostImgs } from '../../services/apiService';

//משנה את המשתנים למצב עריכה
export const changeData = (val) => {
    if (val === "city") {
        $("#beforeC").hide();
        $("#afterC").show();
    }
    else if (val === "name") {
        $("#beforeN").hide();
        $("#afterN").show();
    }
    else if (val === "gender") {
        $("#beforeG").hide();
        $("#afterG").show();
    }  
    else if (val === "image") {
        $("#beforeI").hide();
        $("#afterI").show();
    }
}

//מעדכן את הגיל של המנהל
export const updateGender = (profileSingle, genderRef, counterApi, setCounterApi, setProfileSingle) => {
    $("#beforeG").show();
    $("#afterG").hide();

    profileSingle.gender = genderRef.current.value;
    updateAdmin(profileSingle, counterApi, setCounterApi, setProfileSingle);
}

//מעדכן את העיר של המנהל
export const updateDateCity = (profileSingle, cityRef, counterApi, setCounterApi, setProfileSingle) => {
    $("#beforeC").show();
    $("#afterC").hide();
    profileSingle.city = cityRef.current.value;
    updateAdmin(profileSingle, counterApi, setCounterApi, setProfileSingle);

}



//מעדכן את השם של המנהל
export const updateName = (profileSingle, fnameRef, counterApi, setCounterApi, setProfileSingle) => {
    if (checkOnlyLetters(fnameRef.current.value) === true) {
        $("#beforeN").show();
        $("#afterN").hide();
        profileSingle.first_name = fnameRef.current.value;
        updateAdmin(profileSingle, counterApi, setCounterApi, setProfileSingle);
        document.location.href = "/admin/myProfile/" + profileSingle._id;
    }
    else {
        alert("Invalid Name")
    }
}

//מעדכן את הנתונים עם הדאטה
export const updateAdmin = (profileSingle, counterApi, setCounterApi, setProfileSingle) => {
    let updateUrl = apiUrl + "admins/update";
    doApiPostToken(updateUrl, profileSingle)
        .then(data => {
            setProfileSingle(data)
            setCounterApi(counterApi + 1)
        })
}


//מעדכן את הגיל של המנהל
export const updateImage = (profileSingle, imageRef, counterApi, setCounterApi, setProfileSingle) => {
    $("#beforeG").show();
    $("#afterG").hide();
    
    let image = document.getElementById('customFile');
    
    let tempObj = {
        file: imageRef.current.files[0],
        file_name: imageRef.current.files[0].name
    };        
  

    profileSingle.image = imageRef.current.files[0].name;
    doPostImgs(tempObj.file)

    updateAdmin(profileSingle, counterApi, setCounterApi, setProfileSingle);
    document.location.href = "/admin/myProfile/" + profileSingle._id;

}


export const closeUpdate = (val,fname,city) => {

    if (val === "city") {
        $("#beforeC").show();
        $("#afterC").hide();
        // $('#id-city option[selected]').prop('defualt', true);
    }
    else if (val === "name") {
        $("#beforeN").show();
        $("#afterN").hide();
        $('#id-name').val(fname);
    }
    else if (val === "gender") {
        $("#beforeG").show();
        $("#afterG").hide();
        $('#id-gender option[selected]').prop('selected', true);
    }  
    else if (val === "image") {
        $("#beforeI").show();
        $("#afterI").hide();
    }
}





// //משנה את המשתנים למצב עריכה
// export const changeVip = (val, i) => {
//     $('#beforeV' + i).hide();
//     $('#afterV' + i).show();
// }




// //מעדכן את המנוי של המשתמשים
// export const updateVip = async (profileSingle, vipRef, counterApi, setCounterApi, setProfileSingle, i, users_ar, setUsersArr, vipMonthRef, setVipMonthRef) => {

//     if ((vipRef === "true") && (vipMonthRef === "select month" || vipMonthRef === null || vipMonthRef === "0")) return alert("must choose months");

//     profileSingle.vip.vip = (vipRef === "true" ? true : false);
//     if (vipRef === "true") {
//         profileSingle.vip.long_vip = vipMonthRef;
//     }
//     else {
//         profileSingle.vip.long_vip = null;
//     }

//     let updateUrl = apiUrl + "users/updateVip";
//     doApiPostToken(updateUrl, profileSingle)
//         .then(data => {
//             setProfileSingle(data)
//             setCounterApi(counterApi + 1)

//         })


//     $("#beforeV" + i).show();
//     $("#afterV" + i).hide();

//     let newTemp = users_ar.map(item => {
//         if (item._id === profileSingle._id) {
//             item = profileSingle;
//         }
//         return item;
//     })
//     console.log(newTemp);

//     setUsersArr(newTemp);

// }

