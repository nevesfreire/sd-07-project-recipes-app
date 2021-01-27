import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    <div className="header">
        <div className="user" data-test-id="profile-top-btn">
            <Link to={{pathname="/perfil"}}>
          <img src={userAvatar} alt="avatar-user" className="user-avatar" />
          <p>{userName}</p>
          </Link>
        </div>
        <div className="title-header">
            <h1>Food</h1>
        </div>
        <div className="search">
         <img src={serachIcon} />
        </div>
    </div>
}

export default Header;