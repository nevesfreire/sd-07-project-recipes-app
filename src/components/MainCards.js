import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';

function MainCards({ thumb, title, key }) {
  return (
    <div key={ key }>
      <Link to="/perfil">
        <img
          src={ thumb }
          alt="Imagem do profile"
          data-testid="profile-top-btn"
        />
      </Link>
      <div
        className="div"
        data-testid="page-div"
      >
        <p>
          { title }
        </p>
      </div>
    </div>
  );
}

MainCards.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MainCards;
