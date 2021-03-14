import React from 'react';
import PropTypes from 'prop-types';
import FoodDetails from './FoodDetails';
import DrinkDetails from './DrinkDetails';

function MainDetail(history) {
  console.log('estou no MainDetails', history);
  const { location: { pathname } } = history;
  const path = pathname.split('/');
  const myPath = path[1];

  if (myPath === 'bebidas') {
    return (
      <div className="container">
        <DrinkDetails drinkPath={ history } />
      </div>
    );
  }

  if (myPath === 'comidas') {
    return (
      <div className="container">
        <FoodDetails foodPath={ history } />
      </div>
    );
  }
}

MainDetail.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MainDetail;
