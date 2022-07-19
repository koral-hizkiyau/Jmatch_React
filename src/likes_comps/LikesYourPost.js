import React, { useEffect, useState } from 'react';
import { apiUrl, doApiGetToken } from '../services/apiService'
import '../App.css';
import '../style/css/likes.css'
import LikeSingle from '../likes_comps/LikeSingle';
import {Link} from 'react-router-dom'



function LikesYourPost() {

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
          alert("Problem");
        }
        else {
          console.log(data);
          alert("there is already user in this name")
        }
      })

  }, [])


  return (
    <div className="ad-s" id="review">
      <div className="container">
        <div className="portfolio" id="portfolio">
          <div className="container">
            <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">

            </div>
            <div className="row">
              <div className="col-12">
                <ul id="portfolio-filter">
                  <Link to='/youlike'><li data-filter="*" >You like</li></Link>
                  <li data-filter=".filter-1" className="filter-active" >Likes your post</li>
                  <li data-filter=".filter-2" >Likes you</li>
                  {/* <li data-filter=".filter-3">Game Dev</li> */}
                </ul>
              </div>
            </div>
            <div className="row portfolio-container">


              {/* <div className="col-lg-4 col-md-6 col-sm-12 portfolio-item filter-1" data-wow-delay="0.0s">
                <div className="portfolio-wrap">
                  <div className="portfolio-img">
                    <img src="https://scontent.fsdv1-2.fna.fbcdn.net/v/t1.0-9/78403091_10157928358602856_426460114707283968_o.jpg?_nc_cat=102&ccb=2&_nc_sid=8bfeb9&_nc_ohc=SUNj46P_04sAX_8HtYf&_nc_ht=scontent.fsdv1-2.fna&oh=f1c4569f58cf3eb718ba699dd7881f67&oe=5FD9019A" alt="Image"></img>
                  </div>
                  <div className="portfolio-text">
                    <h3>Regina, 31<br></br>Tel-Aviv</h3>

                    <a className="btn" href="img/portfolio-1.jpg" data-lightbox="portfolio"><i className="fa fa-id-card-o"></i></a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 portfolio-item filter-2 wow fadeInUp" data-wow-delay="0.2s">
                <div className="portfolio-wrap">
                  <div className="portfolio-img">
                    <img src={require('./images/me2.jpg')} />

                  </div>
                  <div className="portfolio-text">
                    <h3>Angelina, 27<br></br>Petah-Tikva</h3>
                    <a className="btn" href="img/portfolio-2.jpg" data-lightbox="portfolio"><i className="fa fa-id-card-o"></i></a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 portfolio-item filter-3 wow fadeInUp" data-wow-delay="0.4s">
                <div className="portfolio-wrap">
                  <div className="portfolio-img">
                    <img src={require('./images/koral2.jpg')} style={{ height: "220px" }} />   </div>
                  <div className="portfolio-text">
                    <h3>Koral, 27<br></br>Yehud</h3>
                    <a className="btn" href="img/portfolio-3.jpg" data-lightbox="portfolio"><i className="fa fa-id-card-o"></i></a>
                  </div>
                </div>
              </div> */}
              {userData === null ? null : userData.who_likes.map(post => {
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default LikesYourPost;