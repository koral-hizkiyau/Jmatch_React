import React, { useState, useEffect } from 'react';
import './App.css';
import './style/css/likes.css';
import { apiUrl, doApiGetToken } from './services/apiService'
import DiscoverySingle from './discovey_comps/DiscoverySingle';
import EmptyDiscovery from './discovey_comps/EmptyDiscovery';
import Footer from './Footer';






function Discovery() {


    let [genderArr, setGenderArr] = useState([]);

    let [petsArr, setPetsArr] = useState([]);

    let [smokeArr, setSmokeArr] = useState([]);

    let [userDataIdeal, setUserDataIdeal] = useState(null);

    let [userPets, setUserPets] = useState([]);

    let [userSmoke, setUserSmoke] = useState([]);


    // let [filterByGender, setFilterByGender] = useState(null);


    useEffect(() => {


        let urlUser = apiUrl+'/users/single';
        doApiGetToken(urlUser)
            .then(dataUser => {
                if (dataUser.first_name) {
                    setUserDataIdeal(dataUser.my_ideal_person);
                    setUserPets(dataUser.pets);
                    setUserSmoke(dataUser.smoking);

                    let urlAllUsers = apiUrl+'/users';
                    doApiGetToken(urlAllUsers)
                        .then(dataAllUsers => {
                            if (dataAllUsers[0]._id) {

                                // סינון אם חסמתי משתמש

                                for (let i = 0; i < dataUser.block_users.length; i++) {
                                    for (let j = 0; j < dataAllUsers.length; j++) {
                                        if (dataUser.block_users[i].id === dataAllUsers[j]._id) {
                                            dataAllUsers.splice(j, 1);
                                        }
                                    }
                                }
                                // console.log(dataAllUsers);

                                // סינון אם משתמש חסם אותי
                                for (let i = 0; i < dataAllUsers.length; i++) {
                                    if (dataUser.who_block.includes(dataAllUsers[i]._id)) {
                                        dataAllUsers.splice(i, 1);
                                    }
                                }
                                // console.log(dataAllUsers);

                                // סינון אם המשתמש חסום בכללי במערכת
                                for (let i = 0; i < dataAllUsers.length; i++) {
                                    if (dataAllUsers[i].block_status === true) {
                                        dataAllUsers.splice(i, 1);
                                    }
                                }

                                // סינון שאני לא אראה את המודעה של עצמי
                                for (let i = 0; i < dataAllUsers.length; i++) {
                                    if (dataAllUsers[i]._id === dataUser._id) {
                                        dataAllUsers.splice(i, 1);
                                    }
                                }

                                // console.log(dataAllUsers)


                                // איתחול מערך על פי מין וגיל
                                let gender;
                                if (dataUser.my_ideal_person.gender === "") {
                                    setGenderArr(null)
                                }
                                else {
                                    gender = dataAllUsers.filter(post => post.gender === dataUser.my_ideal_person.gender);
                                    let rand;
                                    let randArrGen = [];
                                    let randGenderArr = [];

                                    if (gender.length > 6) {
                                        for (let i = 0; i < 6; i++) {
                                            rand = Math.floor(Math.random() * gender.length);
                                            if (randArrGen.includes(rand)) {
                                                i--;
                                                continue;
                                            }
                                            else {
                                                randArrGen.push(rand);
                                                randGenderArr.push(gender[rand]);
                                            }
                                        }
                                        // console.log(gender)
                                        setGenderArr(randGenderArr)
                                    }
                                    else {
                                        setGenderArr(gender)
                                    }
                                }

                                // איתחול מערך על פי בעלי חיים
                                let pets;
                                let randP;
                                let randArrPets = [];
                                let randPetsArr = [];
                                if (dataUser.pets === "") {
                                    setPetsArr(null)
                                }
                                else if (dataUser.pets === "Doesn't have pet(s)") {
                                    pets = dataAllUsers.filter(post => post.pets === "Doesn't have pet(s)");
                                    console.log(pets);
                                    if (pets.length > 6) {
                                        for (let i = 0; i < 6; i++) {
                                            randP = Math.floor(Math.random() * pets.length);
                                            if (randArrPets.includes(randP)) {
                                                i--;
                                                continue;
                                            }
                                            else {
                                                randArrPets.push(randP);
                                                randPetsArr.push(pets[randP]);
                                            }
                                        }
                                        setPetsArr(randPetsArr)
                                    }
                                    else {
                                        setGenderArr(pets)
                                    }
                                    // setPetsArr(pets)
                                }
                                else {
                                    pets = dataAllUsers.filter(post => post.pets === "Has other pet(s)" || "Has cat(s)" || "Has dog(s)");
                                    console.log(pets);
                                    if (pets.length > 6) {
                                        for (let i = 0; i < 6; i++) {
                                            randP = Math.floor(Math.random() * pets.length);
                                            if (randArrPets.includes(randP)) {
                                                i--;
                                                continue;
                                            }
                                            else {
                                                randArrPets.push(randP);
                                                randPetsArr.push(pets[randP]);
                                            }
                                        }
                                        // console.log(randPetsArr)
                                        setPetsArr(randPetsArr)
                                    }
                                    else {
                                        setPetsArr(pets)
                                    }
                                    // setPetsArr(pets)
                                }

                                // איתחול מערך על פי עישון
                                let smoke;
                                let randS;
                                let randArrSmoke = [];
                                let randSmokeArr = [];


                                if (dataUser.smoking === "") {
                                    setSmokeArr(null)
                                }
                                else if (dataUser.smoking === "Never smoke cigarette") {
                                    smoke = dataAllUsers.filter(post => post.smoking === "Never smoke cigarette");
                                    console.log(smoke);
                                    if (smoke.length > 6) {
                                        for (let i = 0; i < 6; i++) {
                                            randS = Math.floor(Math.random() * smoke.length);
                                            if (randArrSmoke.includes(randS)) {
                                                i--;
                                                continue;
                                            }
                                            else {
                                                randArrSmoke.push(randS);
                                                randSmokeArr.push(smoke[randS]);
                                            }
                                        }
                                        setSmokeArr(randSmokeArr)
                                    }
                                    else {
                                        setSmokeArr(smoke)
                                    }
                                }
                                else {
                                    smoke = dataAllUsers.filter(post => post.smoke === "Smokes cigarettes sometimes" || "Smokes cigarettes often");
                                    if (smoke.length > 6) {
                                        for (let i = 0; i < 6; i++) {
                                            randS = Math.floor(Math.random() * smoke.length);
                                            if (randArrSmoke.includes(randS)) {
                                                i--;
                                                continue;
                                            }
                                            else {
                                                randArrSmoke.push(randS);
                                                randSmokeArr.push(smoke[randS]);
                                            }
                                        }
                                        // console.log(randSmokeArr)
                                        setSmokeArr(randSmokeArr)
                                    }
                                    else {
                                        setSmokeArr(smoke)
                                    }
                                    // setPetsArr(pets)
                                }

                            }
                            else if (dataAllUsers.message) {
                                console.log(dataAllUsers.message);
                            }
                            else {
                                console.log(dataAllUsers);
                            }
                        })
                }
                else if (dataUser.message) {
                    console.log(dataUser.message);
                }
                else {
                    console.log(dataUser);
                }
            })

    }, [])


    return (
        <>
        <div className="ad-s" id="review">
            <div className="container" >

                <>
                    {userDataIdeal === null ? <div style={{ marginTop: "116px", marginBottom: "245px" }}><div className="loader-blue"></div></div> :

                        <>{genderArr === null && petsArr === null && smokeArr === null ? <EmptyDiscovery/> :
                            <>
                                <div className="portfolio" id="portfolio">


                                    {genderArr === null ? null :
                                        <>
                                            <h2>{userDataIdeal.gender}</h2>
                                            <hr></hr>
                                            <div className="row portfolio-container"> {genderArr.map(post => {
                                                return (
                                                    <DiscoverySingle
                                                        key={post._id}
                                                        city={post.city}
                                                        image={post.image}
                                                        date_of_birth={post.date_of_birth}
                                                        first_name={post.first_name}
                                                        id={post._id}
                                                    ></DiscoverySingle>
                                                )
                                            })}
                                            </div>
                                        </>
                                    }
                                </div>

                                <div className="portfolio" id="portfolio">
                                    {petsArr === null ? null :
                                        <>
                                            {userPets === "Doesn't have pet(s)" ? <h2>They also doesn't have pets</h2> :
                                                <h2>They also have pets</h2>
                                            }
                                            <hr></hr>
                                            <div className="row portfolio-container"> {petsArr.map(post => {
                                                return (
                                                    <DiscoverySingle
                                                        key={post._id}
                                                        city={post.city}
                                                        image={post.image}
                                                        date_of_birth={post.date_of_birth}
                                                        first_name={post.first_name}
                                                        id={post._id}
                                                    ></DiscoverySingle>
                                                )
                                            })}
                                            </div>
                                        </>}
                                </div>


                                <div className="portfolio" id="portfolio">
                                    {smokeArr === null ? null :
                                        <>
                                            {userSmoke === "Never smoke cigarettes" ? <h2>They also doesn't smoke cigarettes</h2> :
                                                <h2>They also smoke cigarettes</h2>}
                                            <hr></hr>
                                            <div className="row portfolio-container"> {smokeArr.map(post => {
                                                return (
                                                    <DiscoverySingle
                                                        key={post._id}
                                                        city={post.city}
                                                        image={post.image}
                                                        date_of_birth={post.date_of_birth}
                                                        first_name={post.first_name}
                                                        id={post._id}
                                                    ></DiscoverySingle>
                                                )
                                            })}
                                            </div>
                                        </>}
                                </div>
                            </>


                        }</>


                    }





                </>





            </div>
        </div>
        <Footer/>

        </>
    );
}

export default Discovery;