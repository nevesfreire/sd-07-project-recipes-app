import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function Profile(props) {
  const user = JSON.parse(localStorage.getItem('user'));
  const { history } = props;
  return (
    <div>
      <h1 data-testid="profile-email">{user.email}</h1>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Sair
      </button>
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.objectOf().isRequired,
};

export default withRouter(Profile);
