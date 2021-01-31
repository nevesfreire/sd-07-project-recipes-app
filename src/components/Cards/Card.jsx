import React from 'react';
import { Link } from 'react-router-dom';
import '../components.css';
import PropTypes from 'prop-types';

export default function Card({
  title, img, testidImg, testidIndex, testidTitle, link, callback,
}) {
  return (
    <Link to={ link } onClick={ callback }>
      <div className="card" data-testid={ testidIndex }>
        <img src={ img } className="card-img-top" alt="foto" data-testid={ testidImg } />
        <div className="card-body">
          <h5 className="card-title" data-testid={ testidTitle }>{title}</h5>
        </div>
      </div>
    </Link>
  );
}

Card.defaultProps = {
  testidImg: '',
  testidIndex: '',
  testidTitle: '',
  link: '',
  callback: () => {},
};

Card.propTypes = {
  link: PropTypes.string,
  callback: PropTypes.func,
  testidImg: PropTypes.string,
  testidIndex: PropTypes.string,
  testidTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
