import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../css/recipe.css';

class DrinkExplore extends Component {
  constructor() {
    super();
    this.fetchRecipesRamdom = this.fetchRecipesRamdom.bind(this);
    this.state = {
      randomRecipe: {},
    };
  }

  componentDidMount() {
    this.fetchRecipesRamdom();
  }

  async fetchRecipesRamdom() {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const response = await fetch(URL);
    const data = await response.json();
    this.setState({ randomRecipe: data });
  }

  render() {
    const { history } = this.props;
    const { randomRecipe } = this.state;

    if (randomRecipe.drinks) {
      const { randomRecipe: { drinks } } = this.state;
      return (
        <div>
          <Header title="Explorar Bebidas" history={ history } />
          <div>
            <button
              type="button"
              data-testid="explore-by-ingredient"
              onClick={ () => history.push('/explorar/bebidas/ingredientes') }
            >
              Por Ingredientes
            </button>
            <button
              type="button"
              data-testid="explore-surprise"
              onClick={ () => history.push(`/bebidas/${drinks[0].idDrink}`) }
            >
              Me Surpreenda!
            </button>
          </div>
          <Footer history={ history } />
        </div>
      );
    }
    return (
      <Loading />
    );
  }
}

export default DrinkExplore;

DrinkExplore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
