import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/recipe.css';

class FoodExplore extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header title="Explorar Comidas" history={ history } />
        <div>
          <button
            type="button"
            data-testid="explore-by-ingredient"
            onClick={ () => history.push('/explorar/comidas/ingredientes') }
          >
            Por Ingredientes
          </button>
          <button
            type="button"
            data-testid="explore-by-area"
            onClick={ () => history.push('/explorar/comidas/area') }
          >
            Por Local de Origem
          </button>
          <button
            type="button"
            data-testid="explore-surprise"
            onClick={ () => history.push('/comidas/52771') }
          >
            Me Surpreenda!
          </button>
        </div>
        <Footer history={ history } />
      </div>
    );
  }
}

export default FoodExplore;

FoodExplore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
