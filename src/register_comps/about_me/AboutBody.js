import React, { useRef } from 'react';
import { apiUrl, doApiPostToken } from '../../services/apiService';
import { useHistory } from "react-router-dom";

import '../../style/css/register.css'

function AboutBody() {
    // refs
    let heightRef = useRef();
    let bodyTypeRef = useRef();

    let history = useHistory()


    const nextUserData = (event) => {

        let heightTemp = heightRef.current.value;
        let body_typeTemp = bodyTypeRef.current.value;

        if (body_typeTemp === "-select body type-"){
            body_typeTemp = ""
        }


    
        let tempObj = {
            height: heightTemp,
            body_type: body_typeTemp,
        }

        let url = apiUrl+'/users/update';
        doApiPostToken(url, tempObj)
            .then(data => {
                if (data.ok === 1) {
                    history.push('/about/having');
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
        <div className="App register">
            <div className="container">
                <div className="register-item">
                    <div className="round-reg">
                    <h3 style={{color:"red"}}>* Questions (optional)</h3>
                    <p style={{ color: "gray" }}><i style={{ marginRight: "5px", fontSize: "23px" }} className="fa fa-eye"></i>This info be visible to others</p>


                        {/* <label >Height: </label> */}

                        <div className="label-register"><div className="input-name-reg">Height</div><div className="msg-reg" id="msgHeight"></div></div><br></br>

                        <input className="input-register" ref={heightRef} type="number" id="height" name="height" min="130" max="300"></input>
                        <br></br>


                        {/* <label htmlFor="body_type">Body type: </label> */}
                        <div className="label-register"><div className="input-name-reg">Body type</div><div className="msg-reg" id="msgBodyType"></div></div><br></br>

                        <select className="input-register" ref={bodyTypeRef} id="bodyType" name="body_type">
                            <option>-select body type-</option>
                            <option defaultValue="Overweight">Overweight</option>
                            <option defaultValue="Average build">Average build</option>
                            <option defaultValue="Fit">Fit</option>
                            <option defaultValue="Jacked">Jacked</option>
                            <option defaultValue="A little extra">A little extra</option>
                            <option defaultValue="Curvy">Curvy</option>
                            <option defaultValue="Full figured">Full figured</option>
                        </select>
                        <br></br>



                        <button style={{marginBottom:"332px", backgroundColor:"dodgerblue"}} className="btn-register" onClick={(e) => { nextUserData(e) }} type="submit" value="Next">Next</button>


                    </div>
                </div>
            </div>

        </div>
    );
}

export default AboutBody;