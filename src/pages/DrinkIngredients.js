import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setIngredient } from '../actions';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import '../css/recipe.css';

class DrinkIngredients extends Component {
  constructor() {
    super();
    this.fetchIngredients = this.fetchIngredients.bind(this);
    this.setIngredient = this.setIngredient.bind(this);
    this.state = {
      ingredients: {},
    };
  }

  componentDidMount() {
    this.fetchIngredients();
  }

  setIngredient(ingredient) {
    const { selectIngredient } = this.props;
    selectIngredient(ingredient);
  }

  async fetchIngredients() {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const response = await fetch(URL);
    const data = await response.json();
    this.setState({ ingredients: data });
  }

  render() {
    const { history } = this.props;
    const { ingredients } = this.state;

    if (ingredients.drinks) {
      const { ingredients: { drinks } } = this.state;
      const INGREDIENTS_LENGTH = 12;
      const array12Ingredients = drinks
        .filter((_ingredient, index) => index < INGREDIENTS_LENGTH);
      return (
        <div>
          <div className="main-recipes-categories">
            {array12Ingredients.map((ingredient, index) => (
              <div
                key={ ingredient.strIngredient1 }
                data-testid={ `${index}-ingredient-card` }
                className="recipes-categories"
              >
                <Link
                  to="/bebidas"
                  className="link-categories"
                  onClick={ () => this.setIngredient(ingredient.strIngredient1) }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png ` }
                    alt={ ingredient.strIngredient1 }
                  />
                  <h1 data-testid={ `${index}-card-name` }>
                    { ingredient.strIngredient1 }
                  </h1>
                </Link>
              </div>
            ))}
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

const mapDispatchToProps = (dispatch) => ({
  selectIngredient: (category) => dispatch(setIngredient(category)),
});

export default connect(null, mapDispatchToProps)(DrinkIngredients);

DrinkIngredients.propTypes = {
  selectIngredient: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
