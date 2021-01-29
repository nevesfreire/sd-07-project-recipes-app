import React from 'react';
import '../components.css';
import PropTypes from 'prop-types';

export default function Card({ title, img }) {
  return (
    <div>
      <div className="CardFood">
        <h3>{title}</h3>
        <img src={ img } alt="foto" />
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
