import React from 'react';
import { Link } from 'react-router-dom';

import profileIcon from '../../../images/profileIcon.svg';

export default function ProfileIcon() {
  return (
    <Link to="/perfil">
      <input
        src={ profileIcon }
        type="image"
        alt="profile button"
        data-testid="profile-top-btn"
      />
    </Link>
  );
}
