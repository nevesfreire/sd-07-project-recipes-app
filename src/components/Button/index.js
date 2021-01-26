import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function Button({ name, link, dataTestid }) {
  return (
    <Link to={ link } data-testid={ dataTestid } className="styledLink">{name}</Link>

  );
}
