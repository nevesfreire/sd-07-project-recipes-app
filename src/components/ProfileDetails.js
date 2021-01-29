import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileDetails extends Component {
  render() {
    const { history } = this.props;
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.email);
    return (
      <div className="profile-container">
        <div className="text-center profile-email" data-testid="profile-email">
          {user.email}
        </div>
        <div className="button-container">
          <button
            type="button"
            className="btn btn-secondary btn-lg"
            data-testid="profile-done-btn"
            onClick={ () => {
              history.push('/receitas-feitas');
            } }
          >
            Receitas Feitas
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-lg"
            data-testid="profile-favorite-btn"
            onClick={ () => {
              history.push('/receitas-favoritas');
            } }
          >
            Receitas Favoritas
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-lg"
            data-testid="profile-logout-btn"
            onClick={ () => {
              localStorage.clear();
              history.push('/');
            } }
          >
            Sair
          </button>
        </div>
      </div>
    );
  }
}

export default ProfileDetails;

ProfileDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
