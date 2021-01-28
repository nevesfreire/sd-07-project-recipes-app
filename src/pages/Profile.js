import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.getEmailFromStorage = this.getEmailFromStorage.bind(this);
  }

  getEmailFromStorage() {
    const { email } = JSON.parse(localStorage.getItem('user'));
    return email;
  }

  render() {
    return (
      <div>
        <p data-testid="profile-email">{ this.getEmailFromStorage() }</p>
        <Link
          to="/receitas-feitas"
        >
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link
          to="/receitas-favoritas"
        >
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link
          to="/"
        >
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
          >
            Sair
          </button>
        </Link>
      </div>
    );
  }
}

export default Profile;
