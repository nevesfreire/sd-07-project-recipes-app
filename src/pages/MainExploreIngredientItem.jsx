import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ExploreItemByIngredients from '../components/ExploreItemByIngredients';
import Footer from '../components/Footer';
import PerfilAndSeach from '../components/PerfilAndSeach';

function MainExploreIngredientItem(props) {
  const { history } = props;
  return (
    <div className="container">
      <Header pathName={ history } />
      <PerfilAndSeach pathName={ history } />
      <ExploreItemByIngredients />
      <Footer />
    </div>
  );
}

MainExploreIngredientItem.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MainExploreIngredientItem;
