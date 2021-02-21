import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ExploreFoodOrDrink from '../components/ExploreFoodOrDrink';
import Footer from '../components/Footer';
import PerfilAndSeach from '../components/PerfilAndSeach';

function MainExploreItem(props) {
  const { history } = props;
  return (
    <div className="container">
      <Header pathName={ history } />
      <PerfilAndSeach pathName={ history } />
      <ExploreFoodOrDrink pathName={ history } />
      <Footer />
    </div>
  );
}

MainExploreItem.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MainExploreItem;
