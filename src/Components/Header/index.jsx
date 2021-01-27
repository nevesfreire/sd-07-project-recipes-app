import React from 'react'
import { Link } from 'react-router-dom';
import SearchIcon from '../../images/searchicon.svg'

const Header = (props) => {
    <div className="header">
        <div className="user" data-test-id="profile-top-btn">
            <Link to={{pathname="/perfil"}}>
          <img src={userAvatar} alt="avatar-user" className="user-avatar" />
          <p>{userName}</p>
          </Link>
        </div>
        <div className="title-header" data-test-id="page-title">
            <h1>{props.title}</h1>
        </div>
        <div className="search" data-test-id="search-top-btn">
         <img src={SearchIcon} />
        </div>
    </div>
}

export default Header;