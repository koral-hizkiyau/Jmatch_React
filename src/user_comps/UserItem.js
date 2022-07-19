import React from 'react';
import {Link} from 'react-router-dom'

function UserItem(props) {

  let item = props.item;
  return (
    <div>
        <span>Angelina</span>
        <span>27</span>
        <span>View Profile</span>
        <span>img</span>
        <Link to={'/profile/'+item._id}></Link>
    </div>
  )

}

export default UserItem;