import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { doPostImgs } from "../services/apiService";
import '../style/css/register.css';





function UploadImg() {

    let dispatch = useDispatch()

    let img_array = [];
    let img_array_names = [];
    let img_obj_names = {};
    let [imgCount, setImgCount] = useState(0);

    // useEffect(() => {
    //     document.getElementById("btn").disabled = true;
    //     document.getElementById("btn").style.backgroundColor = "grey";

    //     // if (imgCount > 0) {
    //     //     document.getElementById("btn").disabled = false;
    //     //     document.getElementById("btn").style.color = "white";
    //     //     document.getElementById("btn").style.backgroundColor = "dodgerblue";
    //     // }

    // }, [])


    // לאחר העלאת תמונה היא מוצגת על המסך ונשמרת למערך של התמונות
    const uploadingImgs = (event) => {
        // sessionStorage.setItem('img_arr', );
        let src1;
        src1 = URL.createObjectURL(event.target.files[0])
        console.log(src1)
        // לכתוב קוד שישנה את השמות של התמונות ויפתח תיקייה
        if (event.target.id === "id-file customFile") {
            document.getElementById("id-img").style.backgroundImage = 'url(' + src1 + ')';
            // setImgCount(imgCount + 1);
            // document.getElementById("btn").disabled = false;
            // document.getElementById("btn").style.color = "white";
            // document.getElementById("btn").style.backgroundColor = "dodgerblue";
            let tempObj = {
                file: event.target.files[0],
                file_name: event.target.files[0].name
            };
            img_array.push(tempObj);
            img_array_names.push(event.target.files[0].name);
        }
        else if (event.target.id === "id-file2 customFile") {
            document.getElementById("id-img2").style.backgroundImage = 'url(' + src1 + ')';
            // setImgCount(imgCount+1)
            let tempObj = {
                file: event.target.files[0],
                name: event.target.files[0].name
            }
            img_array.push(tempObj);
            img_array_names.push(event.target.files[0].name);
        }
        else if (event.target.id === "id-file3 customFile") {
            // let image3 = document.getElementById('id-img3');
            // image3.src = URL.createObjectURL(event.target.files[0]);
            document.getElementById("id-img3").style.backgroundImage = 'url(' + src1 + ')';
            // setImgCount(imgCount+1)
            let tempObj = {
                file: event.target.files[0],
                name: event.target.files[0].name
            }
            img_array.push(tempObj);
            img_array_names.push(event.target.files[0].name);
        }
        else if (event.target.id === "id-file4 customFile") {
            document.getElementById("id-img4").style.backgroundImage = 'url(' + src1 + ')';
            // setImgCount(imgCount+1)
            let tempObj = {
                file: event.target.files[0],
                name: event.target.files[0].name
            }
            img_array.push(tempObj)
            img_array_names.push(event.target.files[0].name);
        }
        else if (event.target.id === "id-file5 customFile") {
            document.getElementById("id-img5").style.backgroundImage = 'url(' + src1 + ')';
            // setImgCount(imgCount+1)
            let tempObj = {
                file: event.target.files[0],
                name: event.target.files[0].name
            }
            img_array.push(tempObj)
            img_array_names.push(event.target.files[0].name);
        }
        else if (event.target.id === "id-file6 customFile") {
            document.getElementById("id-img6").style.backgroundImage = 'url(' + src1 + ')';
            // setImgCount(imgCount+1)
            let tempObj = {
                file: event.target.files[0],
                name: event.target.files[0].name
            }
            img_array.push(tempObj)
            img_array_names.push(event.target.files[0].name);
        }
        img_obj_names['image'] = img_array_names;
        console.log(img_array);
        console.log(img_array_names);
        console.log(imgCount);

    }


    // בכפתור שליחה התמונה נשמרת בשרת והתצוגה עוברת לדף הבא
    const sendImgsToServer = () => {
        for (let i = 0; i < img_array.length; i++) {
            doPostImgs(img_array[i].file)
        }
    }

    return (
        <div className="container">
            <div className="register-item">
                <div onChange={e => uploadingImgs(e)} className="App" >
                    <h2>Add Photos of you</h2>

                    <div className="container" style={{ width: "62%", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>


                        <div style={{ width: "30%", margin: "3px" }} className="round-img">
                            <div className="img-sty" id="id-img">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="id-file customFile"></input>
                                    <label className="custom-file-label" htmlFor="customFile"></label>
                                </div>
                                <i className="fa fa-camera icon-sty"></i>
                            </div>
                        </div>

                        <div style={{ width: "30%", margin: "3px" }} className="round-img" >
                            <div className="img-sty" id="id-img2">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="id-file2 customFile"></input>
                                    <label className="custom-file-label" htmlFor="customFile"></label>
                                </div>
                                <i className="fa fa-camera icon-sty"></i>
                            </div>
                        </div>

                        <div style={{ width: "30%", margin: "3px" }} className="round-img"  >
                            <div className="img-sty" id="id-img3">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="id-file3 customFile"></input>
                                    <label className="custom-file-label" htmlFor="customFile"></label>
                                </div>
                                <i className="fa fa-camera icon-sty"></i>
                            </div>
                        </div>


                        <div style={{ width: "30%", margin: "3px" }} className="round-img"  >
                            <div className="img-sty" id="id-img4">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="id-file4 customFile"></input>
                                    <label className="custom-file-label" htmlFor="customFile"></label>
                                </div>
                                <i className="fa fa-camera icon-sty"></i>
                            </div>
                        </div>

                        <div style={{ width: "30%", margin: "3px" }} className="round-img"  >
                            <div className="img-sty" id="id-img5">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="id-file5 customFile"></input>
                                    <label className="custom-file-label" htmlFor="customFile"></label>
                                </div>
                                <i className="fa fa-camera icon-sty"></i>
                            </div>
                        </div>

                        <div style={{ width: "30%", margin: "3px" }} className="round-img"  >
                            <div className="img-sty" id="id-img6">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="id-file6 customFile"></input>
                                    <label className="custom-file-label" htmlFor="customFile"></label>
                                </div>
                                <i className="fa fa-camera icon-sty"></i>
                            </div>

                        </div>
                    </div>


                    <div className="container" style={{ width: "62%", display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
                        <h2 style={{ textAlign: "center", paddingTop: "32px" }}>Photo rules</h2>
                        <div style={{ display: "flex" }}>
                            <div style={{ padding: "20px" }}>
                                <p>Porn</p>
                                <img style={{ width: "186px" }} src={require('../images/butt.jpg')} alt="Image"></img>
                            </div>
                            <div style={{ padding: "20px" }}>
                                <p>Fake uploads</p>
                                <img style={{ width: "186px" }} src={require('../images/mask.jpg')} alt="Image"></img>
                            </div>
                            <div style={{ padding: "20px" }}>
                                <p>Pets, children alone</p>
                                <img style={{ width: "186px" }} src={require('../images/dog.jpg')} alt="Image"></img>
                            </div>
                        </div>
                    </div>

                    {/* {imgCount == 0 ? <button className="btn-register" style={{ backgroundColor: "grey", width: "50%" }} disabled>Next</button> :
                        <button id="btn" style={{ width: "50%", backgroundColor: "dodgerblue" }} className="btn-register" onClick={() => { sendImgsToServer(); dispatch({ type: "addData", userData: img_obj_names, submitingType: "send" }) }} type="submit" value="Next">Next</button>
                    } */}

                    <button id="btn" style={{ width: "50%", backgroundColor: "dodgerblue" }} className="btn-register" onClick={() => { sendImgsToServer(); dispatch({ type: "addData", userData: img_obj_names, submitingType: "send" }) }} type="submit" value="Next">Next</button>

                </div>
            </div>
        </div>
    );
}

export default UploadImg;