import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ExploreItemByArea from '../components/ExploreItemByArea';
import Footer from '../components/Footer';
import PerfilAndSeach from '../components/PerfilAndSeach';

function MainExploreArea(props) {
  const { history } = props;
  return (
    <div className="container">
      <Header pathName={ history } />
      <PerfilAndSeach pathName={ history } />
      <ExploreItemByArea />
      <Footer />
    </div>
  );
}

MainExploreArea.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MainExploreArea;
