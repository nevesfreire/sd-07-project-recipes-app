import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../../Context/RecipeContext';
import '../../App.css';

const UserProfile = () => {
  const data = useContext(RecipeContext);
  const value = useState(data);
  const user = value[0].state;
  return (
    <div className="container-int-body">
      <p className="email-user" data-testid="profile-email">
        {user.user.userEmail}
      </p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          className="btn-default"
          data-testid="profile-done-btn"
        >
          Receitas feitas
        </button>
      </Link>
      <Link to="/receitas-feitas">
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
