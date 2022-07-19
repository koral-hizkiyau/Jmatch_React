import React, { useRef } from 'react';
import { apiUrl, doApiPostToken } from '../../services/apiService';
import { useHistory } from "react-router-dom";


function AboutRelationship() {

    // refs
    let relationshipRef = useRef();
    let relationship_typeRef = useRef();
    let orientationRef = useRef();


    let history = useHistory()



    const nextData = () => {

        let relationshipTemp = relationshipRef.current.value
        let relationship_typeTemp = relationship_typeRef.current.value;
        let orientationTemp = orientationRef.current.value;

        if (relationshipTemp === "-select relationship-") {
            relationshipTemp = "";
        }
        if (relationship_typeTemp === "-select relationship type-") {
            relationship_typeTemp = "";
        }
        if (orientationTemp === "-select orientation-") {
            orientationTemp = "";
        }


        let tempObj = {
            relationship: relationshipTemp,
            relationship_type: relationship_typeTemp,
            orientation: orientationTemp
        }

        let url = apiUrl+'/users/update';
        doApiPostToken(url, tempObj)
            .then(data => {
                if (data.ok === 1) {
                    history.push('/about/body');
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



                        {/* מערכת יחסים */}
                        <div className="label-register"><div className="input-name-reg">Relationship</div><div className="msg-reg" id="msgRelationship"></div></div><br></br>
                        {/* <label>Relationship: </label> */}
                        <select className="input-register" ref={relationshipRef} id="relationship" name="relationship">
                            <option>-select relationship-</option>
                            <option defaultValue="Single">Single</option>
                            <option defaultValue="Married">Married</option>
                            <option defaultValue="divorce">divorce</option>
                            <option defaultValue="Open relationship">Open relationship</option>
                        </select>
                        <br></br>

                        {/* סוג מערכת יחסים  */}
                        <div className="label-register"><div className="input-name-reg">Relationship type</div><div className="msg-reg" id="msgRelationshipType"></div></div><br></br>

                        {/* <label>Relationship type: </label> */}
                        <select className="input-register" ref={relationship_typeRef} id="relationshipType" name="relationship_type">
                            <option>-select relationship type-</option>
                            <option defaultValue="Monogamous">Monogamous</option>
                            <option defaultValue="Non-monogamous">Non-monogamous</option>
                            <option defaultValue="Open to either">Open to either</option>
                        </select>
                        <br></br>

                        {/*  נטייה*/}
                        <div className="label-register"><div className="input-name-reg">Orientation</div><div className="msg-reg" id="msgOrientation"></div></div><br></br>

                        {/* <label htmlFor="orientation">Orientation: </label> */}
                        <select className="input-register" ref={orientationRef} id="orientation" name="orientation">
                            <option>-select orientation-</option>
                            <option defaultValue="Straight">Straight</option>
                            <option defaultValue="Gay">Gay</option>
                            <option defaultValue="Bisexual">Bisexual</option>
                            <option defaultValue="Lesbian">Lesbian</option>
                            <option defaultValue="Queer">Queer</option>
                            <option defaultValue="Pansexual">Pansexual</option>
                            <option defaultValue="Questioning">Questioning</option>
                        </select>
                        <br></br>




                        <button style={{ marginBottom: "240px", backgroundColor: "dodgerblue" }} className="btn-register" onClick={(e) => { nextData(e) }} type="submit" value="Next">Next</button>

                    </div>
                </div>


            </div>

        </div>
    );
}

export default AboutRelationship;