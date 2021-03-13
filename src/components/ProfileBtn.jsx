import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const profileEmail = ({ email }) => (
  <h3
    data-testid="profile-email"
    className=""
  >
    {`Usuário: ${email}`}
  </h3>
);

const profileDone = (history) => (
  <Button
    type="button"
    variant="contained"
    data-testid="profile-done-btn"
    onClick={ () => history.push('/receitas-feitas') }
  >
    Receitas Feitas
  </Button>
);

const profileFavorite = (history) => (
  <Button
    type="button"
    variant="contained"
    data-testid="profile-favorite-btn"
    onClick={ () => history.push('/receitas-favoritas') }
  >
    Receitas Favoritas
  </Button>
);

const logout = async (history) => {
  localStorage.clear();
  history.push('/');
};

const profileLogout = (history) => (
  <Button
    type="button"
    variant="contained"
    color="secondary"
    data-testid="profile-logout-btn"
    onClick={ () => logout(history) }
  >
    Sair
  </Button>
);

function ProfileBtns() {
  const user = JSON.parse(localStorage.getItem('user'));
  const email = user !== null ? user : '';
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
