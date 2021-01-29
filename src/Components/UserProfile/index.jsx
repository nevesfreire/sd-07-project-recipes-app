import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const UserProfile = () => {
  const user = localStorage.getItem('user');
  const emailUser = JSON.parse(user);
  return (
    <div className="container-int-body">
      <p className="email-user" data-testid="profile-email">
        {emailUser.email}
      </p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          className="btn-default"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          type="button"
          className="btn-default"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
    </div>
  );
};

export default UserProfile;
