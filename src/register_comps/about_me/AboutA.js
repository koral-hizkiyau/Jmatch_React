import React, { useRef } from 'react';
import { apiUrl, doApiPostToken } from '../../services/apiService'
import { useHistory } from "react-router-dom";

import '../../style/css/register.css';


function AboutA() {

    // כדי להעביר בין ראוטרים
    let history = useHistory()



    // refs
    let about_me = useRef();
    let hobbies = useRef();
    let my_traits = useRef();



    // פונקציה ששולחת את המידע לשרת
    const nextUserData = (event) => {
        event.preventDefault();

        let tempObj = {
            about_me: about_me.current.value,
            hobbies: hobbies.current.value,
            my_traits: my_traits.current.value
        };


        let url = apiUrl+'/users/update';
        doApiPostToken(url, tempObj)
            .then(data => {
                if (data.ok === 1) {
                    history.push('/about/relationship');
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
                        <form >

                            <h2 style={{ textAlign: "center" }}>Introduce yourself</h2>
                            <h3 style={{color:"red"}}>* Questions (optional)</h3>
                            <p style={{ color: "gray" }}><i style={{ marginRight: "5px", fontSize: "23px" }} className="fa fa-eye"></i>This info be visible to others</p>


                            <div className="label-register"><div className="input-name-reg">About me</div></div><br></br>
                            <textarea className="input-register" ref={about_me} id="about" name="about_me" rows="3" cols="50"></textarea>

                            <br></br>



                            <div className="label-register"><div className="input-name-reg">Hobbies</div></div><br></br>
                            <textarea className="input-register" ref={hobbies} id="hobbies" name="hobbies" rows="3" cols="50"></textarea>

                            <br></br>



                            <div className="label-register"><div className="input-name-reg">My traits</div></div><br></br>
                            <textarea className="input-register" ref={my_traits} id="myTraits" name="my_traits" rows="3" cols="50"></textarea>

                            <br></br>




                            <button style={{ backgroundColor: "dodgerblue" }} className="btn-register" onClick={(e) => { nextUserData(e) }} type="submit" value="Next">Next</button>
                            {/* <button onClick={(e) => { nextUserData(e)}} type="submit" value="Next">skip</button> */}


                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AboutA;