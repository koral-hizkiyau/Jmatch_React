import React, { useRef } from 'react';
import { apiUrl, doApiPostToken } from '../../services/apiService';
import { useHistory } from "react-router-dom";
import '../../style/css/register.css'

function AboutHaving() {

    let history = useHistory()

    let petsRef = useRef();
    let childrenRef = useRef();

    const nextUserData = () => {

        let childrenTemp = childrenRef.current.value;
        let petsTemp = petsRef.current.value;

        if (childrenTemp === "-select kids-") {
            childrenTemp = "";
        }
        if (petsTemp === "-select pets-") {
            petsTemp = "";
        }


        let tempObj = {
            children: childrenTemp,
            pets: petsTemp,
        }
        let url = apiUrl+'/users/update';
        doApiPostToken(url, tempObj)
            .then(data => {
                if (data.ok === 1) {
                    history.push('/about/smoke');
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
                        <h3 style={{ color: "red" }}>* Questions (optional)</h3>
                        <p style={{ color: "gray" }}><i style={{ marginRight: "5px", fontSize: "23px" }} className="fa fa-eye"></i>This info be visible to others</p>



                        <div className="label-register"><div className="input-name-reg">Pets</div></div><br></br>
                        <select className="input-register" ref={petsRef} id="pets" name="pets">
                            <option> -select pets- </option>
                            <option defaultValue="Doesn't have pet(s)">Doesn't have pet(s)</option>
                            <option defaultValue="Has other pet(s)">Has other pet(s)</option>
                            <option defaultValue="Has cat(s)">Has cat(s)</option>
                            <option defaultValue="Has dog(s)">Has dog(s)</option>
                        </select>
                        <br></br>


                        <div className="label-register"><div className="input-name-reg">Kids</div></div><br></br>
                        <select className="input-register" ref={childrenRef} id="children" name="children">
                            <option> -select kids- </option>
                            <option defaultValue="Doesn't have kid(s)">Doesn't have kid(s)</option>
                            <option defaultValue="Has kids(s)">Has kid(s)</option>
                        </select>
                        <br></br>


                        <button style={{ marginBottom: "373px", backgroundColor: "dodgerblue" }} className="btn-register" onClick={(e) => { nextUserData(e) }} type="submit" value="Next">Next</button>

                    </div>
                </div>

            </div>

        </div>
    );
}

export default AboutHaving;