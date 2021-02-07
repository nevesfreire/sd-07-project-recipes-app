import { Button } from 'bootstrap';
import React from 'react';
import { useHistory } from 'react-router-dom';

const email = () => {
  return (
    <h3
      data-testid="profile-email"
    >

    </h3>
  )
};

const profileDone = () => (
  <button
    data-testid="profile-done-btn"
  >
    Receitas Feitas
  </button>
);

const profileFavorite = () => (
  <button
    data-testid="profile-favorite-btn"
  >
    Receitas Favoritas
  </button>
);

const profileLogout = () => (
  <button
    data-testid="profile-logout-btn"
  >
    Sair
  </button>
);

const ProfileBtns = () => {
  return (
    <div>
      {email()}
      {profileDone()}
      {profileFavorite()}
      {profileLogout()}
    </div>
  );
}

export default ProfileBtns;
