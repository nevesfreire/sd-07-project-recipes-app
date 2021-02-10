import React from 'react';
import { useHistory } from 'react-router-dom';
import { getItem } from '../services/localStorage';

const profileEmail = (email) => (
  <h3
    data-testid="profile-email"
    className=""
  >
    {`Usuário: ${email}`}
  </h3>
);

const profileDone = (history) => (
  <button
    type="button"
    className="btn btn-secondary"
    data-testid="profile-done-btn"
    onClick={ () => history.push('/receitas-feitas') }
  >
    Receitas Feitas
  </button>
);

const profileFavorite = (history) => (
  <button
    type="button"
    className="btn btn-secondary"
    data-testid="profile-favorite-btn"
    onClick={ () => history.push('/receitas-favoritas') }
  >
    Receitas Favoritas
  </button>
);

const logout = async (history) => {
  localStorage.clear();
  history.push('/');
};

const profileLogout = (history) => (
  <button
    type="button"
    className="btn btn-danger"
    data-testid="profile-logout-btn"
    onClick={ () => logout(history) }
  >
    Sair
  </button>
);

function ProfileBtns() {
  const { email } = getItem('user');
  const history = useHistory();
  return (
    <div>
      {profileEmail(email)}
      <div className="profile-button">
        {profileDone(history)}
        {profileFavorite(history)}
        {profileLogout(history)}
      </div>
    </div>
  );
}

export default ProfileBtns;
