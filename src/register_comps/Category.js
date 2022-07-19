import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { apiUrl, doApiPostToken } from '../services/apiService';
import { useHistory } from "react-router-dom";

import '../style/css/register.css';
import NavRand from '../NavRand';




function Category() {

    let history = useHistory()

    let [userCatState, setUserCatState] = useState([]);



    let dispatch = useDispatch();

    useEffect(() => {
        document.getElementById("btn").disabled = true;
        document.getElementById("btn").style.backgroundColor = "grey";
    }, [])


    // שבוחרים קטגוריות 
    const checkCategoriesType = (event) => {



        let cat_arr = []
        let checkBox = document.getElementById("checkBox").children;

        if (checkBox[7].children[0].checked) {
            for (let j = 0; j < checkBox.length; j++) {
                checkBox[j].children[0].checked = true;
            }
        }


        for (let i = 0; i < checkBox.length; i++) {
            console.log(checkBox[i].children[0]);
            if (checkBox[i].children[0].checked) {
                cat_arr.push(checkBox[i].children[0].value)
            }
        }

        if (checkBox[7].children[0].checked) {
            cat_arr.splice(-1, 1)
        }


        console.log(cat_arr);


        let tempObj = {
            categories: cat_arr
        }

        if (cat_arr.length > 0) {
            document.getElementById("btn").disabled = false;
            document.getElementById("btn").style.backgroundColor = "dodgerblue";
        }
        else {
            document.getElementById("btn").disabled = true;
            document.getElementById("btn").style.backgroundColor = "grey";

        }

        setUserCatState(tempObj)


        console.log(cat_arr);
        console.log(userCatState);
    }



    // פונקציה שולחת מידע לשרת
    const sendCategoriesData = (event) => {
        console.log(userCatState);


        event.preventDefault();
        let url = apiUrl+'/users/update';
        doApiPostToken(url, userCatState)
            .then(data => {
                if (data.ok === 1) {
                    history.push('/about/a');
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
        <NavRand/>
        <div className="App register">
            <div className="container">
                <form onChange={checkCategoriesType} className="round-reg">

                    <h2 style={{ textAlign: "center" }}>Categories </h2>
                    {/* <h3>This show your...</h3> */}
                    <br></br>

                    <div style={{ display: "flex", flexDirection: "column", fontSize: "23px" }} id="checkBox">

                        <div className="cat-sty"> <input type="checkbox" defaultValue="Sport"></input> <span>Sport</span></div>
                        <div className="cat-sty">   <input type="checkbox" defaultValue="Local trip"></input> <span>Local trip</span></div>
                        <div className="cat-sty"> <input type="checkbox" defaultValue="Overseas trip"></input> <span>Overseas trip</span></div>
                        <div className="cat-sty">   <input type="checkbox" defaultValue="Food"></input> <span>Food</span></div>
                        <div className="cat-sty"><input type="checkbox" defaultValue="Fun"></input> <span>Fun</span></div>
                        <div className="cat-sty"><input type="checkbox" defaultValue="Assistance"></input> <span>Assistance</span></div>
                        <div className="cat-sty"> <input type="checkbox" defaultValue="General"></input> <span>General</span></div>
                        <div className="cat-sty"> <input type="checkbox" defaultValue="Select All"></input> <span>Select All</span></div>


                    </div>

                    <br></br>
                    <button className="btn-register" onClick={(e) => { sendCategoriesData(e); dispatch({ type: "addData", submitingType: "send" }) }} id="btn" type="submit" value="Next">Next</button>


                </form>

            </div>
        </div>
        </>
    );
}

export default Category;