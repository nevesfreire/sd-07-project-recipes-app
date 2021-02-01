import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import '../css/recipe.css';

class FoodArea extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        FoodArea
        <Footer history={ history } />
      </div>
    );
  }
}

export default FoodArea;

FoodArea.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
