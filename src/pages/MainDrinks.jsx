import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Beverage from '../components/Beverage';
import Footer from '../components/Footer';
import Search from '../components/Search';
import RadioButtons from '../components/RadioButtons';
import FetchButton from '../components/FetchButton';
import PerfilAndSeach from '../components/PerfilAndSeach';

function MainProfile(props) {
  const textInput = useRef();
  const { history } = props;
  return (
    <div className="container">
      <Header pathName={ history } />
      <PerfilAndSeach pathName={ history } />
      <RadioButtons />
      <Search textInput={ textInput } />
      <div className="search-input">
        <div>
          <FetchButton textInput={ textInput } />
        </div>
      </div>
      <Beverage />
      <Footer />
    </div>
  );
}

MainProfile.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MainProfile;
