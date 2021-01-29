import React from 'react';
import { useHistory } from 'react-router-dom';

function Profile() {
  const history = useHistory();
  const email = JSON.parse(localStorage.getItem('user'));

  const doneRecipes = () => {
    history.push('/receitas-feitas');
  };

  const handleFavoritRecipe = () => {
    history.push('/receitas-favoritas');
  };

  const handleOut = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      <div data-testid="profile-email">
        <span>{email.email}</span>
      </div>
      <button
        type="button"
        onClick={ doneRecipes }
        data-testid="profile-done-btn"
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
      >
        Sair
      </button>
    </div>
  );
}

export default Profile;
