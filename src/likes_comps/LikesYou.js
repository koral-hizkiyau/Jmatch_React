import React, { useEffect, useState } from 'react';
import { apiUrl, doApiGetToken } from '../services/apiService'
import '../App.css';
import '../style/css/likes.css'
import LikeSingle from '../likes_comps/LikeSingle';
import { Link } from 'react-router-dom';
import GetVip from './GetVip';
import EmptyLikes from './EmptyLikes';
import Footer from '../Footer';



function LikesYou() {

  let [userData, setUserData] = useState(null);

  let [who_likesL, setWho_likesL] = useState(0)

  useEffect(() => {
    let url = apiUrl+'/users/single';
    doApiGetToken(url)
      .then(data => {
        if (data.first_name) {
          setUserData(data);
          setWho_likesL(data.who_likes.length);
          console.log(data.vip.vip);
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
            {/* style={{ zIndex: "10" }} */}
              <div style={{ zIndex: "1" }} className="col-12">
                <ul id="portfolio-filter">
                  <Link to='/youlike'><li data-filter="*" >You like</li></Link>
                  {/* <li data-filter=".filter-1" >Likes your post</li> */}
                  <li data-filter=".filter-2" className="filter-active">Likes you</li>
                  {/* <li data-filter=".filter-3">Game Dev</li> */}
                </ul>
              </div>
            </div>

            {userData === null ? null :

              userData.vip.vip === false ?
                <><GetVip /></>
                :
                <>

                  {who_likesL === 0 ? <EmptyLikes/>
                  
                  :
                    <div className="row portfolio-container">{
                      userData.who_likes.map(post => {
                        return (
                          <LikeSingle
                            key={post._id}
                            city={post.city}
                            image={post.image}
                            date_of_birth={post.date_of_birth}
                            first_name={post.first_name}
                          ></LikeSingle>
                        )
                      })}
                    </div>
                  }
                </>
            }

            {/* <div className="row portfolio-container">

              {userData === null ? null :

                userData.vip.vip === false ? <div>djkk</div>
                  :
                  userData.who_likes.map(post => {
                    return (
                      <LikeSingle
                        key={post._id}
                        city={post.city}
                        image={post.image}
                        date_of_birth={post.date_of_birth}
                        first_name={post.first_name}
                      ></LikeSingle>
                    )
                  })}

            </div> */}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default LikesYou;