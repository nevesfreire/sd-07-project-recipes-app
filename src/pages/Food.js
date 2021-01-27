import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../css/food.css';

class Food extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } />
      </div>
    );
  }
}

export default Food;

Food.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
