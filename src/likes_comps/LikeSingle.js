import React from 'react';
import '../style/css/likes.css'
import { getAge } from '../style/js/help';
import { Link } from 'react-router-dom'
import { apiUrl } from '../services/apiService';




function LikeSingle(props) {

   


    return (
        <div className="col-lg-4 col-md-6 col-sm-12 portfolio-item filter-1 wow fadeInUp" data-wow-delay="0.6s">
            <Link to={'/profile/' + props.id}>

                <div className="portfolio-wrap">
                    <div className="portfolio-img">
                        <img style={{ height: "220px" }} className="img-responsive thumbnail" src={apiUrl+'/images/users_imgs/' + props.image[0]}alt="img" />

                        {/* <img src={require('../images/liat.jpg')} style={{ height: "220px" }} /> */}
                    </div>
                    <div className="portfolio-text">
                        <h3>{props.first_name}, {getAge(props.date_of_birth)}<br></br>{props.city}</h3>
                        <div className="btn" href="img/portfolio-4.jpg" data-lightbox="portfolio"><i style={{fontSize:"36px"}} className="fa fa-id-card-o"></i></div>
                    </div>
                </div>
            </Link>
        </div>

    );
}

export default LikeSingle;