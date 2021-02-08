import React from 'react';
import { useHistory } from 'react-router-dom';

function Profile() {
  const history = useHistory();
  const email = JSON.parse(localStorage.getItem('user'));

  const doneRecipes = () => {
    history.push('/receitas-feitas');
  };

  const handleOut = () => {
    history.push('/');
    localStorage.clear();
  };

  const handleFavoritRecipe = () => {
    history.push('/receitas-favoritas');
  };

  return (
    <div>
      { email && (
        <h4 data-testid="profile-email" className="profile-email">
          {email.email}
        </h4>
      ) }
      <div className="explore-buttons">
        <button
          type="button"
          onClick={ doneRecipes }
          data-testid="profile-done-btn"
          className="first-food-explore"
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          onClick={ handleFavoritRecipe }
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          onClick={ handleOut }
          data-testid="profile-logout-btn"
          className="logout-food-explore"
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default Profile;
