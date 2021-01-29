import React from 'react';
import { Link } from 'react-router-dom';
import '../components.css';
import PropTypes from 'prop-types';

export default function Card({ title, img }) {
  return (
    <Link to={ `/comidas/${title}` }>
      <div className="CardFood">
        <h3>{title}</h3>
        <img src={ img } alt="foto" />
      </div>
    </Link>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
