import React, { useRef } from 'react';
import { useHistory } from "react-router-dom";
import { apiUrl, doApiPostToken } from '../../services/apiService';



function AboutSmoke() {
    let smokingRef = useRef();
    let drinkingRef = useRef();
    let marijuanaRef = useRef();

    let history = useHistory()

    const nextData = () => {

        let smokingTemp = smokingRef.current.value;
        let drinkingTemp = drinkingRef.current.value;
        let marijuanaTemp = marijuanaRef.current.value;

        if (smokingTemp === "-select smoking-") {
            smokingTemp = "";
        }
        if (drinkingTemp === "-select drinking-") {
            drinkingTemp = "";
        }
        if (marijuanaTemp === "-select marijuana-") {
            marijuanaTemp = "";
        }

        let tempObj = {
            smoking: smokingTemp,
            drinking: drinkingTemp,
            marijuana: marijuanaTemp
        }

        let url = apiUrl+'/users/update';
        doApiPostToken(url, tempObj)
            .then(data => {
                if (data.ok === 1) {
                    history.push('/about/speaks');
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


                        <div className="label-register"><div className="input-name-reg">Smoking</div></div><br></br>
                        <select className="input-register" ref={smokingRef} id="smoking" name="smoking">
                            <option> -select smoking- </option>
                            <option defaultValue="Never smoke cigarettes">Never smoke cigarettes</option>
                            <option defaultValue="Smokes cigarettes sometimes">Smokes cigarettes sometimes</option>
                            <option defaultValue="Smokes cigarettes often">Smokes cigarettes often</option>
                        </select>
                        <br></br>

                        <div className="label-register"><div className="input-name-reg">Drinking</div></div><br></br>
                        <select className="input-register" ref={drinkingRef} id="drinking" name="drinking">
                            <option> -select drinking- </option>
                            <option defaultValue="Never drink alcohol">Never drink alcohol</option>
                            <option defaultValue="Drinks alcohol sometimes">Drinks alcohol sometimes</option>
                            <option defaultValue="Drinks alcohol often">Drinks alcohol often</option>
                        </select>
                        <br></br>

                        <div className="label-register"><div className="input-name-reg">Marijuana</div></div><br></br>
                        <select className="input-register" ref={marijuanaRef} id="marijuana" name="marijuana">
                            <option> -select marijuana- </option>
                            <option defaultValue="Never smoke marijuana">Never smoke marijuana</option>
                            <option defaultValue="Smokes marijuana sometimes">Smokes marijuana sometimes</option>
                            <option defaultValue="Smokes marijuana often">Smokes marijuana often</option>
                        </select>
                        <br></br>

                        <button style={{ marginBottom: "239px", backgroundColor: "dodgerblue" }} className="btn-register" onClick={(e) => { nextData(e) }} type="submit" value="Next">Next</button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutSmoke;