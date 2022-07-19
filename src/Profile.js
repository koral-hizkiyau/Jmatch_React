import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { doApiGetToken, doApiPostToken, doPostImgs, doApiGet, apiUrl } from './services/apiService';
import { useSelector } from "react-redux";
import { getAge } from './style/js/help';
import Axios from 'axios';
import { useHistory } from 'react-router-dom'
import { InputLabel } from '@material-ui/core';
import Footer from './Footer';



function Profile() {

    // Refs
    let cityRef = useRef();
    let oriRef = useRef();
    let genderRef = useRef();
    let relationshipRef = useRef();
    let relationshipTypeRef = useRef();
    let heightRef = useRef();
    let bodyTypeRef = useRef();
    let eduRef = useRef();
    let speaksRef = useRef();
    let smokingRef = useRef();
    let drinkingRef = useRef();
    let marijuanaRef = useRef();
    let kidsRef = useRef();
    let petsRef = useRef();
    let idealAgeFromRef = useRef();
    let idealAgeToRef = useRef();
    let idealGenRef = useRef();

    let aboutmeRef = useRef();
    let mytraitsRef = useRef();
    let hobbiesRef = useRef();


    let [userData, setUserData] = useState({});

    let [cities_ar, setCities_ar1] = useState([]);

    let [userKids, setUserKids] = useState(null);

    let [userOrien, setUserOrien] = useState(null);

    let [userGen, setUserGen] = useState(null);

    let [userRel, setUserRel] = useState(null);

    let [userRelT, setUserRelT] = useState(null);

    let [userHeight, setUserHeight] = useState(null);

    let [userBodyT, setUserBodyT] = useState(null);

    let [userSpeaks, setUserSpeaks] = useState(null);

    let [userEdu, setUserEdu] = useState(null);

    let [userSmoke, setUserSmoke] = useState(null);

    let [userDrinking, setUserDrinking] = useState(null);

    let [userMari, setUserMari] = useState(null);

    let [userPets, setUserPets] = useState(null);

    let [userAbout, setUserAbout] = useState(null);

    let [userTraits, setUserTraits] = useState(null);

    let [userHob, setUserHob] = useState(null);

    let [userCity, setUserCity] = useState(null);

    let [userIdGen, setUserIdGen] = useState(null);

    let [userIdFrom, setUserIdFrom] = useState(null);

    let [userIdTo, setUserIdTo] = useState(null);

    let [userImgArr, setImgArr] = useState(null);

    let [imgUpStatus, setImgUpStatus] = useState(0)




    // let userData1 = useSelector((myStore) => myStore);

    let history = useHistory();



    useEffect(() => {


        let urlCity = apiUrl+'/cities';
        Axios.get(urlCity)
            .then(res => {
                setCities_ar1(res.data)
            });


        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            let url = apiUrl+'/users/single';
            doApiGetToken(url)
                .then(data => {
                    if (data.first_name) {
                        if (data.my_ideal_person !== undefined) {
                            setUserIdFrom(data.my_ideal_person.from_age)
                            setUserIdTo(data.my_ideal_person.to_age)
                        }
                        else {
                            setUserIdFrom("")
                            setUserIdTo("")
                        }
                        if (data.my_ideal_person !== undefined) {
                            setUserIdGen(data.my_ideal_person.gender)
                        }
                        else {
                            setUserIdGen("")
                        }
                        setImgArr(data.image)
                        setUserCity(data.city)
                        setUserHob(data.hobbies)
                        setUserTraits(data.my_traits)
                        setUserAbout(data.about_me)
                        setUserPets(data.pets)
                        setUserMari(data.marijuana)
                        setUserDrinking(data.drinking)
                        setUserSmoke(data.smoking)
                        setUserEdu(data.education)
                        setUserSpeaks(data.speaks)
                        setUserBodyT(data.body_type)
                        setUserHeight(data.height)
                        setUserRelT(data.relationship_type)
                        setUserRel(data.relationship)
                        setUserGen(data.gender)
                        setUserOrien(data.orientation)
                        setUserKids(data.children)
                        setUserData(data);

                    }
                    else if (data.message) {
                        console.log(data.message);
                    }
                    else {
                        console.log(data);
                    }
                })

        }

    }, [])


    const updateFunc = (obj) => {

        let url = apiUrl+'/users/update';
        doApiPostToken(url, obj)
            .then(data => {
                if (data.ok === 1) {
                    console.log("user update");
                    // window.location.reload();
                    // history.push("/my-profile")

                }
                else if (data.message) {
                    console.log(data.message);
                }
                else {
                    console.log(data);
                }
            })
    }

    const upCity = () => {
        let cityTemp = cityRef.current.value;
        if (cityTemp === "-select city-") {
            cityTemp = ""
        }
        let obj = {
            city: cityTemp
        }
        setUserCity(cityTemp)
        updateFunc(obj)
    }

    const upOrientation = () => {
        let ori = oriRef.current.value;
        if (ori === "-select orientation") {
            ori = ""
        }
        let obj = {
            orientation: ori
        }
        setUserOrien(ori)
        updateFunc(obj)
    }

    const upGender = () => {
        let gen = genderRef.current.value;
        if (gen === "-select gender-") {
            gen = ""
        }
        let obj = {
            gender: gen
        }
        setUserGen(gen)
        updateFunc(obj)
    }

    const upRelationship = () => {
        let rel = relationshipRef.current.value;
        if (rel === "-select relationship-") {
            rel = ""
        }
        let obj = {
            relationship: rel
        }
        setUserRel(rel)
        updateFunc(obj)
    }

    const upRelationshipType = () => {
        let relT = relationshipTypeRef.current.value;
        if (relT === "-select relationship type-") {
            relT = ""
        }
        let obj = {
            relationship_type: relT
        }
        setUserRelT(relT)
        updateFunc(obj)
    }

    const upHeight = () => {
        let heightT = heightRef.current.value;
        let obj = {
            height: heightT
        }
        setUserHeight(heightT)
        updateFunc(obj)
    }

    const upBodyType = () => {
        let bodyT = bodyTypeRef.current.value;
        if (bodyT === "-select body type-") {
            bodyT = ""
        }
        let obj = {
            body_type: bodyT
        }
        setUserBodyT(bodyT)
        updateFunc(obj)
    }

    const upEdu = () => {
        let eduT = eduRef.current.value;
        if (eduT === "-select education-") {
            eduT = ""
        }
        let obj = {
            education: eduT
        }
        setUserEdu(eduT)
        updateFunc(obj)
    }

    const upSpeaks = () => {
        let speaks = document.getElementById("checkBox").children;
        let sp_arr = []
        for (let i = 0; i < speaks.length; i++) {
            console.log(speaks[i].tagName);
            if (speaks[i].tagName === "INPUT") {
                if (speaks[i].checked) {
                    sp_arr.push(speaks[i].value)
                }
            }
        }
        let obj = {
            speaks: sp_arr
        }
        setUserSpeaks(sp_arr)
        updateFunc(obj)
    }

    const upDrink = () => {
        let drink = drinkingRef.current.value;
        if (drink === "-select drinking-") {
            drink = ""
        }
        let obj = {
            drinking: drink
        }
        setUserDrinking(drink)
        updateFunc(obj)
    }

    const upSmoke = () => {
        let smoke = smokingRef.current.value;
        if (smoke === "-select smoking-") {
            smoke = ""
        }
        let obj = {
            smoking: smoke
        }
        setUserSmoke(smoke)
        updateFunc(obj)
    }

    const upMari = () => {
        let mari = marijuanaRef.current.value;
        if (mari === "-select marijuana-") {
            mari = ""
        }
        let obj = {
            marijuana: mari
        }
        setUserMari(mari)
        updateFunc(obj)
    }

    const upKids = () => {
        let kids = kidsRef.current.value;
        if (kids === "-select kids-") {
            kids = ""
        }
        let obj = {
            children: kids
        }
        setUserKids(kids)
        updateFunc(obj)
    }

    const upPets = () => {
        let petsT = petsRef.current.value;
        if (petsT === "-select pets-") {
            petsT = ""
        }
        let obj = {
            pets: petsT
        }
        setUserPets(petsT)
        updateFunc(obj)
    }

    const upAboutme = () => {
        let about = aboutmeRef.current.value;
        let obj = {
            about_me: about
        }
        setUserAbout(about)
        updateFunc(obj)
    }

    const upMytraits = () => {
        let traits = mytraitsRef.current.value;
        let obj = {
            my_traits: traits
        }
        setUserTraits(traits)
        updateFunc(obj)
    }

    const upHobbies = () => {
        let hob = hobbiesRef.current.value;
        let obj = {
            hobbies: hob
        }
        setUserHob(hob)
        updateFunc(obj)
    }


    const upCat = () => {
        let checkbox = document.getElementById("checkboxR").children;
        let newCatArr = [];
        for (let i = 0; i < checkbox.length; i++) {
            if (checkbox[i].tagName === "INPUT") {
                if (checkbox[i].checked) {
                    newCatArr.push(checkbox[i].value)
                }
            }
        }
        let obj = {
            categories: newCatArr
        }
        updateFunc(obj)
    }


    // כדי להציג ליוזר את הקטגוריות שהוא בחר
    const checkBoxSelected = () => {
        let checkbox = document.getElementById("checkboxR").children;
        let userCat = userData.categories;

        for (let i = 0; i < checkbox.length; i++) {
            if (checkbox[i].tagName === "INPUT") {
                if (userCat.includes(checkbox[i].value)) {
                    checkbox[i].checked = true;
                }
            }
        }

    }

    // לערוך בדיקה שאם המשתמש יקיש רק גיל אחד תציג שגיאה
    const upIdealAge = () => {
        let fromAge = idealAgeFromRef.current.value;
        let toAge = idealAgeToRef.current.value;
        let obj = {
            my_ideal_person: {
                from_age: fromAge,
                to_age: toAge,
                gender: userIdGen
            }
        }
        setUserIdFrom(fromAge)
        setUserIdTo(toAge)
        updateFunc(obj)

    }

    const upIdealGen = () => {
        let gen = idealGenRef.current.value;
        if (gen === "-select gender-") {
            gen = ""
        }
        let obj = {
            my_ideal_person: {
                gender: gen,
                from_age: userIdFrom,
                to_age: userIdTo
            }
        }
        setUserIdGen(gen)
        updateFunc(obj)
    }

    // מחיקת תמונה ממערך
    const delImg = (e) => {
        console.log(e.target);
        let pEle = e.target.parentElement;
        pEle.remove();
        // מכין מערך חדש של תמונות
        let imgName = pEle.style.backgroundImage.slice(45, -2);
        console.log(imgName);
        let arr = userImgArr;
        let index = arr.indexOf(imgName);
        arr.splice(index, 1);
        setImgArr(arr);

        // לעדכן את היוזר בשרת
        let tempObj = {
            image: arr
        }
        let url = apiUrl+'/users/update';
        doApiPostToken(url, tempObj)
            .then(data => {
                if (data.ok === 1) {
                    history.push("/my-profile")


                }
                else if (data.message) {
                    console.log(data.message);
                }
                else {
                    console.log(data);
                }
            })

    }

    const editImg = () => {
        console.log(userImgArr.length);
        // eElement.insertBefore(newFirstElement, eElement.firstChild);

        if (imgUpStatus === 0) {
            setImgUpStatus(1)
            let div;
            let btn;

            for (let i = 0; i < userImgArr.length; i++) {
                div = document.createElement("DIV");
                div.id = "borderF"
                btn = document.createElement("BUTTON");
                btn.classList.add("btnImgDel")
                btn.innerHTML = "&#10008;";
                div.appendChild(btn);
                btn.addEventListener("click", delImg);
                document.getElementById("imgDelUp").appendChild(div);
                div.classList.add("imgStyle");
                div.style.backgroundImage = 'url('+apiUrl+'/images/users_imgs/' + userImgArr[i] + ')';

            }

            // let divUp;
            // let label;
            // let input;

            // // יצירת אינפוט לעלות תמונה
            // divUp = document.createElement("DIV");
            // divUp.classList.add("custom-file");

            // input = document.createElement("INPUT");
            // input.id = "customFile";
            // input.classList.add("custom-file-input")
            // input.type = "file";
            // label = document.createElement("LABEL");
            // label.classList.add("custom-file-label");
            // label.htmlFor = "customFile"

            // divUp.appendChild(input);
            // divUp.appendChild(label);

            // document.getElementById("gal-round1").appendChild(divUp);


        }

    }

    const addNewImg = (e) => {

        // דוחף את התמונה לתצוגה של היוזר
        let src1 = URL.createObjectURL(e.target.files[0])
        console.log(src1);

        let div;
        let btn;
        div = document.createElement("DIV");
        btn = document.createElement("BUTTON");
        btn.classList.add("btnImgDel")
        btn.innerHTML = "&#10008;";
        div.appendChild(btn);
        btn.addEventListener("click", delImg);
        document.getElementById("imgDelUp").appendChild(div);
        div.classList.add("imgStyle");
        div.style.backgroundImage = 'url(' + src1 + ')';

        // מעלה את התמונה לשרת
        doPostImgs(e.target.files[0])

        // מעלה את התמונה לשרת ומעדכן את המערך של היוזר

        // מכין מערך חדש של תמונות
        let imgName = e.target.files[0].name
        console.log(imgName);
        let arr = userImgArr;
        arr.push(imgName);
        console.log(arr)
        setImgArr(arr);

        // לעדכן את היוזר בשרת
        let tempObj = {
            image: arr
        }
        let url = apiUrl+'/users/update';
        doApiPostToken(url, tempObj)
            .then(data => {
                if (data.ok === 1) {
                    history.push("/my-profile")

                }
                else if (data.message) {
                    console.log(data.message);
                }
                else {
                    console.log(data);
                }
            })

    }


    // const onClickUpdate = () => {
    //     let orien = document.getElementById("orientation");
    //     console.log(orien);
    // }

    const onDelAccount = () => {

        let urlA = apiUrl+'/msgs/deluserad';
        doApiPostToken(urlA)
            .then(data => {
                console.log(data)
                if (data.message) {
                }
                else {
                    console.log(data);
                }
            })

        let urlB = apiUrl+'/msgs/deluseradb';
        doApiPostToken(urlB)
            .then(data => {
                console.log(data)
                if (data.message) {
                }
                else {
                    console.log(data);
                }
            })

        let urlPost = apiUrl+'/ads/deluserad';
        doApiPostToken(urlPost)
            .then(data => {
                console.log(data)
                if (data.message) {
                }
                else {
                    console.log(data);
                }
            })

        let urlUser = apiUrl+'/users/deluser';
        doApiPostToken(urlUser)
            .then(data => {
                console.log(data)
                if (data.message) {
                    localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
                    document.location.href = "/"
                }
                else {
                    console.log(data);
                }
            })

    }

    const changeAgeFunc = () => {
        if (idealAgeFromRef.current.value !== "" && idealAgeToRef.current.value === "") {
            document.getElementById("ageToId").style.border = "1px solid red";
            document.getElementById("ageBtnId").disabled = true;
            document.getElementById("ageBtnId").style.color = "red";
        }
        else {
            document.getElementById("ageToId").style.border = "none";
        }
        if (idealAgeFromRef.current.value === "" && idealAgeToRef.current.value !== "") {
            document.getElementById("ageFromId").style.border = "1px solid red";
            document.getElementById("ageBtnId").disabled = true;
            document.getElementById("ageBtnId").style.color = "red";
        }
        else {
            document.getElementById("ageFromId").style.border = "none"
        }
        if (idealAgeFromRef.current.value !== "" && idealAgeToRef.current.value !== "") {
            if (idealAgeFromRef.current.value > idealAgeToRef.current.value) {
                document.getElementById("ageBtnId").disabled = true;
                document.getElementById("ageBtnId").style.color = "red";

            }
            else {
                document.getElementById("ageBtnId").disabled = false;
                document.getElementById("ageBtnId").style.color = "lightseagreen";
            }
        }
        if (idealAgeFromRef.current.value === "" && idealAgeToRef.current.value === "") {
            document.getElementById("ageBtnId").disabled = false;
            document.getElementById("ageBtnId").style.color = "lightseagreen";
        }
    }

    const cancelBlock = (e) => {
        let pEle = e.target.parentElement;
        let tempBlockUsers = userData.block_users;
        let index;
        console.log(pEle.children[0].textContent);
        console.log(userData.block_users);
        let blockUserId = pEle.children[0].textContent;
        for (let i = 0; i < userData.block_users.length; i++) {
            if (userData.block_users.id === blockUserId) {
                index = i;
                break;
            }
        }
        tempBlockUsers.splice(index, 1);
        console.log(tempBlockUsers)
        let upObj = {
            block_users: tempBlockUsers
        }

        let url = apiUrl+'/users/update';
        doApiPostToken(url, upObj)
            .then(data => {
                if (data.ok === 1) {
                    console.log("update")
                }
                else if (data.message) {
                    console.log(data.message);
                }
                else {
                    console.log(data);
                    alert("there is already user in this name")
                }
            })

        let url2 = apiUrl+'/users/profile/' + blockUserId;
        doApiGet(url2)
            .then(data => {
                if (data._id) {
                    let tIndex;
                    let tempAnother = data.who_block;
                    console.log(data)
                    for (let i = 0; i < tempAnother.length; i++) {
                        if (tempAnother[i] === userData._id) {
                            tIndex = i;
                            break;
                        }
                    }
                    tempAnother.splice(tIndex, 1);
                    console.log(tempAnother);
                    let tUpObj = {
                        id: data._id,
                        who_block: tempAnother
                    }

                    let url3 = apiUrl+'/users/updateanother';
                    doApiPostToken(url3, tUpObj)
                        .then(data => {
                            if (data.ok === 1) {
                                console.log("up")
                            }
                            else if (data.message) {
                                console.log(data.message);
                            }
                            else {
                                console.log(data);
                            }
                        })

                    window.location.reload();

                }
                else if (data.message) {
                    console.log(data.message);
                }
                else {
                    console.log(data);
                }
            })
    }




    return (
        <>
        <div style={{ backgroundColor: "#f3f5f9", padding: "120px" }}>
            <div className="container">

                <>{userData.first_name === undefined ? <div style={{ marginTop: "116px", marginBottom: "245px" }}><div className="loader-blue"></div></div> :
                    <>
                        <div className="modal fade" id="modalMoreSet" tabIndex="-1" role="dialog" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div style={{ backgroundColor: "lavender" }} className="modal-header">
                                        <h5 style={{ fontSize: "22px" }} className="modal-title" id="exampleModalLabel">More settings</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <p style={{ fontWeight: "bolder" }}>Update categories</p>
                                        <div style={{ display: "flex", flexWrap: "wrap" }} id="checkboxR">
                                            <input type="checkbox" defaultValue="Sport"></input> <span style={{ marginRight: "10px" }}>Sport</span>
                                            <input type="checkbox" defaultValue="Local trip"></input> <span style={{ marginRight: "10px" }}>Local trip</span>
                                            <input type="checkbox" defaultValue="Overseas trip"></input> <span style={{ marginRight: "10px" }}>Overseas trip</span>
                                            <input type="checkbox" defaultValue="Food"></input> <span style={{ marginRight: "10px" }}>Food</span>
                                            <input type="checkbox" defaultValue="Fun"></input> <span style={{ marginRight: "10px" }}>Fun</span>
                                            <input type="checkbox" defaultValue="Assistance"></input> <span style={{ marginRight: "10px" }}>Assistance</span>
                                            <input type="checkbox" defaultValue="General"></input> <span style={{ marginRight: "10px" }}>General</span>
                                            {/* <input type="checkbox" defaultValue="Select All"></input> <span>Select All</span> */}
                                        </div>
                                        <button style={{ fontSize: "24px" }} onClick={upCat} className="updateBtn">&#10004;</button>
                                        <hr></hr>
                                        <p style={{ fontWeight: "bolder" }}>Blocked profiles</p>
                                        <div>
                                            {userData.block_users.length === 0 ? "-" :
                                                <div>
                                                    {userData.block_users.map((user, i) => {
                                                        return (
                                                            <div style={{ marginBottom: "6px" }}>
                                                                <span style={{ display: "none" }}>{user.id}</span>
                                                                <img style={{ width: "34px", borderRadius: "50%", marginRight: "6px" }} src={apiUrl+'/images/users_imgs/' + user.image} />
                                                                <span style={{ marginRight: "10px" }}>{user.name}, {getAge(user.date_of_birth)}</span><button onClick={(e) => cancelBlock(e)} style={{ border: "none", background: "none", color: "blue" }}>Unblock</button></div>
                                                            // <option key={i}>{city.city_name}</option>
                                                        )
                                                    })}

                                                </div>
                                            }
                                        </div>
                                        <hr></hr>
                                        <p style={{ fontWeight: "bolder" }}>Need a break?<span style={{ color: "blue", cursor: "pointer" }} data-toggle="collapse" data-target="#delAccount"> Click here</span> to delete your account.</p>
                                        <div style={{ textAlign: "center" }} id="delAccount" className="collapse">
                                            <h3>We're sorry to see you go! 💔</h3>
                                            <p>Are you sure? </p><button onClick={onDelAccount} style={{ fontSize: "36px", marginRight: "10px", border: "none", background: "none", color: "darkturquoise" }}>&#10004;</button><button data-toggle="collapse" data-target="#delAccount" style={{ fontSize: "36px", marginLeft: "10px", border: "none", background: "none", color: "blue" }}>&#10008;</button>
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>





                        <div className="modal fade" id="myModal" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div id="gallery" className="modal-body">
                                        <div style={{ display: "flex", justifyContent: "space-between" }}> <h2>Edit your pictures</h2> <span style={{ fontSize: "18px", cursor: "pointer" }} data-dismiss="modal">X</span>  </div>
                                        <hr></hr>
                                        <div id="gal-roundUp" >
                                            <div style={{ display: "flex", flexWrap: "wrap" }} id="imgDelUp"></div>

                                            {userImgArr.length === 6 ? null :
                                                <>
                                                    <button style={{ fontSize: "30px", border: "none", color: "white", borderRadius: "50%", paddingRight: "10px", paddingLeft: "10px", backgroundColor: "lightblue", marginTop: "10px" }} data-toggle="collapse" data-target="#imgColl">+</button>
                                                    <div id="imgColl" className="collapse">
                                                        <div style={{ width: "17%", marginTop: "10px" }} className="custom-file">
                                                            <input onChange={(e) => addNewImg(e)} type="file" className="custom-file-input" id="customFile"></input>
                                                            <label className="custom-file-label" htmlFor="customFile"></label>
                                                        </div>
                                                    </div>
                                                </>

                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>



                        <div className="row user-menu-container square" >
                            <div className="col-md-7 user-details">
                                <div className="row coralbg white">
                                    <div className="col-md-4 no-pad">
                                        <div className="user-pad">
                                            <h3><span id="user-name-st">{userData.first_name}</span> <i style={{ display: "none" }} className="fa fa-ellipsis-v"></i></h3>
                                            <h4 >{getAge(userData.date_of_birth)} &bull; {userCity}

                                                <i data-toggle="collapse" data-target="#cityUp" style={{ color: "rgb(5, 0, 190)", marginLeft: "10px", cursor: "pointer" }} className="fa fa-pencil" aria-hidden="true"></i>
                                                <div id="cityUp" className="collapse">
                                                    <strong>City</strong>
                                                    <select ref={cityRef} style={{ border: "none", width: "100%" }} selected defaultValue>
                                                        <option> -select city- </option>
                                                        {cities_ar.map((city, i) => {
                                                            return (
                                                                <option key={i}>{city.city_name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    <button onClick={upCity} className="updateBtn">&#10004;</button>
                                                </div>
                                            </h4>

                                            <i style={{ fontSize: "89px" }} className="fa fa-gear"></i>

                                        </div>
                                    </div>
                                    <div className="col-md-8 no-pad">
                                        <div style={{ cursor: "pointer", border: "4px dotted rgb(5, 0, 190)" }} className="user-image" data-toggle="modal" data-target="#myModal" onClick={editImg}>
                                            {userData.image === undefined ? null :
                                                <img className="img-responsive thumbnail" src={apiUrl+'/images/users_imgs/' + userImgArr[0]} />

                                            }

                                            <div style={{ textAlign: "center" }}>
                                                <i className="fa fa-circle pro-cir" aria-hidden="true"></i>
                                                <i className="fa fa-circle pro-cir" aria-hidden="true"></i>
                                                <i className="fa fa-circle pro-cir" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row overview">
                                    <div style={{ margin: "auto", marginTop: "12px", display: "none" }}>
                                        <button className="btn-profile btn-pass"  ><b>X Pass</b></button>
                                        <button className="btn-profile btn-like" ><b>Like 3</b></button>
                                    </div>

                                </div>
                                <div className="row overview" style={{ padding: "30px" }}>
                                    <div>
                                        <div>
                                            <div className="details-user-st about-pro-st"><b>My self-summary</b>
                                                <div style={{ color: "#0500be", marginLeft: "20px", cursor: "pointer" }} data-toggle="collapse" data-target="#aboutmeUp"><i className="fa fa-pencil" aria-hidden="true"  ></i><b>WRITE</b></div></div>
                                            <p className="p-pro-st">{userAbout}</p>
                                            <div id="aboutmeUp" className="collapse">
                                                <textarea ref={aboutmeRef} style={{ border: "none" }} id="about" name="about_me" rows="3" cols="40" defaultValue={userData.about_me}></textarea>
                                                <button onClick={upAboutme} className="updateBtn">&#10004;</button>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="details-user-st about-pro-st"><b>My traits</b>
                                                <div style={{ color: "#0500be", marginLeft: "20px", cursor: "pointer" }} data-toggle="collapse" data-target="#mytraitsUp"><i className="fa fa-pencil" aria-hidden="true"  ></i><b>WRITE</b></div></div>
                                            <p className="p-pro-st">{userTraits}</p>
                                            <div id="mytraitsUp" className="collapse">
                                                <textarea ref={mytraitsRef} style={{ border: "none" }} id="mytraits" rows="3" cols="40" defaultValue={userData.my_traits}></textarea>
                                                <button onClick={upMytraits} className="updateBtn">&#10004;</button>
                                            </div>
                                        </div>

                                        <div className="details-user-st about-pro-st"><b>Hobbies</b>
                                            <div style={{ color: "#0500be", marginLeft: "20px", cursor: "pointer" }} data-toggle="collapse" data-target="#hobbiesUp"><i className="fa fa-pencil" aria-hidden="true"  ></i><b>WRITE</b></div></div>
                                        <p className="p-pro-st">{userHob}</p>
                                        <div id="hobbiesUp" className="collapse">
                                            <textarea ref={hobbiesRef} style={{ border: "none" }} id="hobbies" rows="3" cols="40" defaultValue={userData.hobbies}></textarea>
                                            <button onClick={upHobbies} className="updateBtn">&#10004;</button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-md user-menu user-pad">
                                <div className="user-menu-content active">

                                    <div>
                                        <div style={{ fontSize: "24px", color: "#ff4dc4" }}><i style={{ marginRight: "10px" }} className="fa fa-gears"></i>More Settings <i style={{ color: "rgb(5, 0, 190)", marginLeft: "10px", cursor: "pointer" }} onClick={checkBoxSelected} className="fa fa-pencil" data-toggle="modal" data-target="#modalMoreSet"></i></div>
                                        <div className="details-user-st"><i className="fa fa-flash fafa-pro-st"></i><div>{userOrien !== "" ? userOrien + "," : null} {userGen} {userRel !== "" ? "," + userRel : null} {userRelT !== "" ? "," + userRelT : null} <i style={{ color: "rgb(5, 0, 190)", marginLeft: "10px", cursor: "pointer" }} className="fa fa-pencil" aria-hidden="true" data-toggle="collapse" data-target="#self"></i></div></div>
                                        <div id="self" className="collapse">
                                            <strong>Orientation </strong>
                                            <div style={{ marginBottom: "10px" }}>
                                                <select ref={oriRef} style={{ border: "none" }} id="orientation" name="orientation">
                                                    <option>-select orientation-</option>
                                                    <option defaultValue="Straight">Straight</option>
                                                    <option defaultValue="Gay">Gay</option>
                                                    <option defaultValue="Bisexual">Bisexual</option>
                                                    <option defaultValue="Lesbian">Lesbian</option>
                                                    <option defaultValue="Queer">Queer</option>
                                                    <option defaultValue="Pansexual">Pansexual</option>
                                                    <option defaultValue="Questioning">Questioning</option>
                                                </select>
                                                <button onClick={upOrientation} className="updateBtn">&#10004;</button>
                                            </div>

                                            <strong>Gender </strong>
                                            <div style={{ marginBottom: "10px" }}>
                                                <select ref={genderRef} style={{ border: "none" }} selected defaultValue >
                                                    <option > -select gender- </option>
                                                    <option defaultValue="Man">Man</option>
                                                    <option defaultValue="Woman">Woman</option>
                                                </select>
                                                <button onClick={upGender} className="updateBtn">&#10004;</button>
                                            </div>

                                            <strong>Relationship </strong>
                                            <div style={{ marginBottom: "10px" }}>
                                                <select ref={relationshipRef} style={{ border: "none" }} id="relationship" name="relationship">
                                                    <option>-select relationship-</option>
                                                    <option defaultValue="Single">Single</option>
                                                    <option defaultValue="Married">Married</option>
                                                    <option defaultValue="divorce">divorce</option>
                                                    <option defaultValue="Open relationship">Open relationship</option>
                                                </select>
                                                <button onClick={upRelationship} className="updateBtn">&#10004;</button>
                                            </div>

                                            <strong>Relationship type </strong>
                                            <div style={{ marginBottom: "10px" }}>
                                                <select ref={relationshipTypeRef} style={{ border: "none" }} id="relationshipType" name="relationship_type">
                                                    <option>-select relationship type-</option>
                                                    <option defaultValue="Monogamous">Monogamous</option>
                                                    <option defaultValue="Non-monogamous">Non-monogamous</option>
                                                    <option defaultValue="Open to either">Open to either</option>
                                                </select>
                                                <button onClick={upRelationshipType} className="updateBtn">&#10004;</button>
                                            </div>

                                        </div>

                                        <div className="details-user-st"><i className="fa fa-star fafa-pro-st"></i><div>{userHeight !== "" ? userHeight : null} {userBodyT !== "" ? "," + userBodyT : null} <i style={{ color: "rgb(5, 0, 190)", marginLeft: "10px", cursor: "pointer" }} className="fa fa-pencil" aria-hidden="true" data-toggle="collapse" data-target="#bodyt"></i></div></div>
                                        <div id="bodyt" className="collapse">
                                            <strong>Height </strong>
                                            <div style={{ marginBottom: "10px" }}>
                                                <input ref={heightRef} style={{ border: "none" }} type="number" id="height" name="height" min="130" max="300"></input>
                                                <button onClick={upHeight} className="updateBtn">&#10004;</button>
                                            </div>

                                            <div style={{ marginBottom: "10px" }}>
                                                <strong>Body type </strong>
                                                <div>
                                                    <select ref={bodyTypeRef} style={{ border: "none" }} id="bodyType" name="body_type">
                                                        <option>-select body type-</option>
                                                        <option defaultValue="Overweight">Overweight</option>
                                                        <option defaultValue="Average build">Average build</option>
                                                        <option defaultValue="Fit">Fit</option>
                                                        <option defaultValue="Jacked">Jacked</option>
                                                        <option defaultValue="A little extra">A little extra</option>
                                                        <option defaultValue="Curvy">Curvy</option>
                                                        <option defaultValue="Full figured">Full figured</option>
                                                    </select>
                                                    <button onClick={upBodyType} className="updateBtn">&#10004;</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="details-user-st"><i className="fa fa-globe fafa-pro-st"></i><div>{userSpeaks === undefined ? null : userSpeaks.map(lan => <span>{lan + ","}</span>)} {userEdu !== "" ? userEdu : null} <i style={{ color: "rgb(5, 0, 190)", marginLeft: "10px", cursor: "pointer" }} className="fa fa-pencil" aria-hidden="true" data-toggle="collapse" data-target="#edu"></i></div></div>
                                        <div id="edu" className="collapse">
                                            <strong>Speaks </strong>
                                            <div ref={speaksRef} style={{ display: "flex", flexDirection: "column-reverse" }} id="checkBox">

                                                <input type="checkbox" id="hebrew" name="hebrew" value="Hebrew"></input> <span style={{ paddingRight: "10px", paddingLeft: "4px" }}>Hebrew</span>

                                                <input type="checkbox" id="english" name="english" value="English"></input> <span style={{ paddingRight: "10px", paddingLeft: "4px" }}>English</span>

                                                <input type="checkbox" id="russian" name="russian" value="Russian"></input> <span style={{ paddingRight: "10px", paddingLeft: "4px" }}>Russian</span>

                                                <input type="checkbox" id="arabic" name="arabic" value="Arabic"></input> <span style={{ paddingRight: "10px", paddingLeft: "4px" }}>Arabic</span>
                                            </div>
                                            <button onClick={upSpeaks} className="updateBtn">&#10004;</button><br></br>

                                            <strong>Education </strong>
                                            <div>
                                                <select ref={eduRef} style={{ border: "none" }} id="education" name="education">
                                                    <option> -select education- </option>
                                                    <option defaultValue="High school">High school</option>
                                                    <option defaultValue="Trade/tech school">Trade/tech school</option>
                                                    <option defaultValue="In college">In college</option>
                                                    <option defaultValue="Undergraduate degree">Undergraduate degree</option>
                                                    <option defaultValue="In grad school">In grad school</option>
                                                    <option defaultValue="Graduate degree">Graduate degree</option>
                                                </select>
                                                <button onClick={upEdu} className="updateBtn">&#10004;</button>
                                            </div>

                                        </div>
                                        <div className="details-user-st"><i className="fa fa-glass fafa-pro-st" ></i><div>{userSmoke !== "" ? userSmoke : null} {userDrinking !== "" ? "," + userDrinking : null}{userMari !== "" ? "," + userMari : null} <i style={{ color: "rgb(5, 0, 190)", marginLeft: "10px", cursor: "pointer" }} className="fa fa-pencil" aria-hidden="true" data-toggle="collapse" data-target="#smo"></i></div></div>
                                        <div id="smo" className="collapse">
                                            <strong>Smoking </strong>
                                            <div style={{ marginBottom: "10px" }}>
                                                <select ref={smokingRef} style={{ border: "none" }} id="smoking" name="smoking">
                                                    <option> -select smoking- </option>
                                                    <option defaultValue="Never smoking cigarettes">Never smoking cigarettes</option>
                                                    <option defaultValue="Smokes sometimes">Smokes sometimes</option>
                                                    <option defaultValue="Smokes often">Smokes often</option>
                                                </select>
                                                <button onClick={upSmoke} className="updateBtn">&#10004;</button>
                                            </div>

                                            <strong>Drinking </strong>
                                            <div style={{ marginBottom: "10px" }}>
                                                <select ref={drinkingRef} style={{ border: "none" }} id="drinking" name="drinking">
                                                    <option> -select drinking- </option>
                                                    <option defaultValue="Never drinking alcohol">Never drinking alcohol</option>
                                                    <option defaultValue="Drinks sometimes">Drinks sometimes</option>
                                                    <option defaultValue="Drinks often">Drinks often</option>
                                                </select>
                                                <button onClick={upDrink} className="updateBtn">&#10004;</button>
                                            </div>

                                            <strong>marijuana </strong>
                                            <div style={{ marginBottom: "10px" }}>
                                                <select ref={marijuanaRef} style={{ border: "none" }} id="marijuana" name="marijuana">
                                                    <option> -select marijuana- </option>
                                                    <option defaultValue="Never smoking marijuana">Never smoking marijuana</option>
                                                    <option defaultValue="Smokes sometimes">Smokes sometimes</option>
                                                    <option defaultValue="Smokes often">Smokes often</option>
                                                </select>
                                                <button onClick={upMari} className="updateBtn">&#10004;</button>
                                            </div>

                                        </div>
                                        <div className="details-user-st"><i className="fa fa-home fafa-pro-st"></i><div> {userKids !== "" ? userKids : null}{userPets !== "" ? "," + userPets : null} <i style={{ color: "rgb(5, 0, 190)", marginLeft: "10px", cursor: "pointer" }} className="fa fa-pencil" aria-hidden="true" data-toggle="collapse" data-target="#kids"></i></div></div>
                                        <div id="kids" className="collapse">
                                            <strong>Children </strong>
                                            <div style={{ marginBottom: "10px" }}>
                                                <select ref={kidsRef} style={{ border: "none" }} id="children" name="children">
                                                    <option> -select kids- </option>
                                                    <option defaultValue="Doesn't have kid(s)">Doesn't have kid(s)</option>
                                                    <option defaultValue="Has kids(s)">Has kid(s)</option>
                                                </select>
                                                <button onClick={upKids} className="updateBtn">&#10004;</button>
                                            </div>

                                            <strong>Pets </strong>
                                            <div style={{ marginBottom: "10px" }}>
                                                <select ref={petsRef} style={{ border: "none" }} id="pets" name="pets">
                                                    <option> -select pets- </option>
                                                    <option defaultValue="Doesn't have pet(s)">Doesn't have pet(s)</option>
                                                    <option defaultValue="Has other pet(s)">Has other pet(s)</option>
                                                    <option defaultValue="Has cat(s)">Has cat(s)</option>
                                                    <option defaultValue="Has dog(s)">Has dog(s)</option>
                                                </select>
                                                <button onClick={upPets} className="updateBtn">&#10004;</button>
                                            </div>
                                        </div>

                                        <div className="details-user-st"><i className="fa fa-eye fafa-pro-st"></i><div>{userIdGen === "" && userIdFrom === "" ? null : <span>Looking for {userIdGen === "" ? null : userIdGen},{userIdFrom === "" ? null : <span> Ages {userIdFrom + " - " + userIdTo}</span>}  </span>} <i style={{ color: "rgb(5, 0, 190)", marginLeft: "10px", cursor: "pointer" }} className="fa fa-pencil" aria-hidden="true" data-toggle="collapse" data-target="#looking"></i></div></div>
                                        <div onChange={changeAgeFunc} id="looking" className="collapse">

                                            <strong>From age </strong>
                                            <input id="ageFromId" ref={idealAgeFromRef} style={{ border: "none" }} type="number" min="18" max="120"></input><br></br>
                                            <strong>To age </strong>
                                            <input id="ageToId" ref={idealAgeToRef} style={{ border: "none" }} type="number" min="18" max="120"></input>
                                            <button id="ageBtnId" onClick={upIdealAge} className="updateBtn">&#10004;</button><br></br>

                                            <strong>Gender </strong>
                                            <select ref={idealGenRef} style={{ border: "none" }} selected defaultValue  >
                                                <option > -select gender- </option>
                                                <option defaultValue="Man">Man</option>
                                                <option defaultValue="Woman">Woman</option>
                                            </select>
                                            <button onClick={upIdealGen} className="updateBtn">&#10004;</button>

                                            <br></br>


                                        </div>
                                    </div>

                                </div>
                                <div className="user-menu-content">
                                    <h3>Your Inbox</h3>
                                </div>


                            </div>
                        </div>
                    </>


                }</>

            </div>


        </div>

        <Footer/>

        </>

    );
}

export default Profile;
