import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '../../components';
import './MainFood.css';

export default function MainFood({ history }) {
  return (
    <div className="main-food-container">
      <Header history={ history } title="Comidas" />
    </div>
  );
}

MainFood.propTypes = {
  history: PropTypes.shape().isRequired,
};
