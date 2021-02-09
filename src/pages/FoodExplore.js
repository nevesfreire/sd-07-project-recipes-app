import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../css/recipe.css';

class FoodExplore extends Component {
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
    const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const response = await fetch(URL);
    const data = await response.json();
    this.setState({ randomRecipe: data });
  }

  render() {
    const { history } = this.props;
    const { randomRecipe } = this.state;

    if (randomRecipe.meals) {
      const { randomRecipe: { meals } } = this.state;
      return (
        <div>
          <Header title="Explorar Comidas" history={ history } />
          <div className="button-container">
            <button
              className="btn btn-secondary btn-lg"
              type="button"
              data-testid="explore-by-ingredient"
              onClick={ () => history.push('/explorar/comidas/ingredientes') }
            >
              Por Ingredientes
            </button>
            <button
              className="btn btn-secondary btn-lg"
              type="button"
              data-testid="explore-by-area"
              onClick={ () => history.push('/explorar/comidas/area') }
            >
              Por Local de Origem
            </button>
            <button
              className="btn btn-secondary btn-lg"
              type="button"
              data-testid="explore-surprise"
              onClick={ () => history.push(`/comidas/${meals[0].idMeal}`) }
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

export default FoodExplore;

FoodExplore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
