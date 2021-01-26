import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ name, link }) {
  return (
    <div>
      <Link to={ link }>{name}</Link>
    </div>
  );
}
