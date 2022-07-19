import React, { useRef } from 'react';
import { useHistory } from "react-router-dom";
import { apiUrl, doApiPostToken } from '../../services/apiService';


function AboutSpeaks() {
    let educationRef = useRef();



    let history = useHistory()

    const nextData = () => {
        let speaks_arr = []
        let checkBox = document.getElementById("checkBox").children;

        console.log(checkBox)

        for (let i = 0; i < checkBox.length; i++) {
            if (checkBox[i].checked) {
                speaks_arr.push(checkBox[i].value)
            }
        }

        let tempObj = {}

        if (educationRef.current.value === "-select education-") {
            tempObj = {
                speaks: speaks_arr,
                education: '',
                finish_registration: true
            }
        }
        else {
            tempObj = {
                speaks: speaks_arr,
                education: educationRef.current.value,
            }

        }



        let url = apiUrl+'/users/update';
        doApiPostToken(url, tempObj)
            .then(data => {
                if (data.ok === 1) {
                    history.push('/about/looking');
                }
                else if (data.message) {
                }
                else {
                    console.log(data);
                }
            })
    }




    return (
        <div className="App register">
            <div className="container">
                <div className="register-item">
                    <div className="round-reg">
                        {/* <h2>About you</h2> */}

                        <h3 style={{ color: "red" }}>* Questions (optional)</h3>
                        <p style={{ color: "gray" }}><i style={{marginRight:"5px", fontSize:"23px"}} className="fa fa-eye"></i>This info be visible to others</p>




                        <div className="label-register"><div className="input-name-reg">Speaks</div></div><br></br>
                        <div id="checkBox">

                            <input type="checkbox" id="hebrew" name="hebrew" value="Hebrew"></input> <span style={{ paddingRight: "10px", paddingLeft: "4px" }}>Hebrew</span>

                            <input type="checkbox" id="english" name="english" value="English"></input> <span style={{ paddingRight: "10px", paddingLeft: "4px" }}>English</span>

                            <input type="checkbox" id="russian" name="russian" value="Russian"></input> <span style={{ paddingRight: "10px", paddingLeft: "4px" }}>Russian</span>

                            <input type="checkbox" id="arabic" name="arabic" value="Arabic"></input> <span style={{ paddingRight: "10px", paddingLeft: "4px" }}>Arabic</span>
                        </div>
                        <br></br>



                        <div className="label-register"><div className="input-name-reg">Education</div></div><br></br>
                        <select className="input-register" ref={educationRef} id="education" name="education">
                            <option> -select education- </option>
                            <option defaultValue="High school">High school</option>
                            <option defaultValue="Trade/tech school">Trade/tech school</option>
                            <option defaultValue="In college">In college</option>
                            <option defaultValue="Undergraduate degree">Undergraduate degree</option>
                            <option defaultValue="In grad school">In grad school</option>
                            <option defaultValue="Graduate degree">Graduate degree</option>
                        </select>
                        <br></br>



                        <button style={{ backgroundColor: "dodgerblue", marginBottom: "336px" }} className="btn-register" onClick={(e) => { nextData(e) }} type="submit" value="Next">Next</button>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default AboutSpeaks;