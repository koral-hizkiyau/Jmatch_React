import React, { useEffect, useState } from 'react';
import { apiUrl, doApiGetToken } from '../services/apiService'
import '../App.css';
import '../style/css/likes.css'
import LikeSingle from '../likes_comps/LikeSingle';
import { Link } from 'react-router-dom'
import EmptyLikes from './EmptyLikes';
import Footer from '../Footer';



function YouLike() {

    let [userData, setUserData] = useState(null);

    useEffect(() => {
        let url = apiUrl+'/users/single';
        doApiGetToken(url)
            .then(data => {
                if (data.first_name) {
                    setUserData(data)
                    console.log(data);
                }
                else if (data.massage) {
                    console.log(data.massage);
                }
                else {
                    console.log(data);
                }
            })

    }, [])


    return (
        <>
        <div className="ad-s" id="review">
            <div className="container">
                <div className="portfolio" id="portfolio">
                    <div className="container">
                        <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">

                        </div>
                        <div className="row">
                            <div className="col-12">
                                <ul id="portfolio-filter">
                                    <Link to='/youlike'><li data-filter="*" className="filter-active">You like</li></Link>
                                    {/* <li data-filter=".filter-1">Likes your post</li> */}
                                    <Link to='/likesyou'> <li data-filter=".filter-2">Likes you</li></Link>
                                    {/* <li data-filter=".filter-3">Game Dev</li> */}
                                </ul>
                            </div>
                        </div>
                        <div className="row portfolio-container">

                            {userData === null ? null :
                                userData.who_user_like.length === 0 ? <EmptyLikes />
                                    :
                                    userData.who_user_like.map(post => {
                                        return (
                                            <LikeSingle
                                                key={post._id}
                                                city={post.city}
                                                image={post.image}
                                                date_of_birth={post.date_of_birth}
                                                first_name={post.first_name}
                                                id={post._id}
                                            ></LikeSingle>
                                        )
                                    })}


                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default YouLike;