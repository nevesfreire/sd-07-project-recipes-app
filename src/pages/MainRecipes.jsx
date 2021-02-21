import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../css/mainRecipes.css';
import Search from '../components/Search';
import RadioButtons from '../components/RadioButtons';
import FetchButton from '../components/FetchButton';
import PerfilAndSeach from '../components/PerfilAndSeach';
import Footer from '../components/Footer';
import Food from '../components/Food';

function MainRecipes(props) {
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
      <Food />
      <Footer />
    </div>
  );
}

MainRecipes.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MainRecipes;
