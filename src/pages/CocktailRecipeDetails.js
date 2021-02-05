import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCocktailsDetailsById } from '../services/cocktailsAPI';
import { fetchRandomMeals } from '../actions/meals';
import MealCard from '../components/MealCard';
import shareIcon from '../images/shareIcon.svg';
import favIconEnabled from '../images/blackHeartIcon.svg';
import favIconDisabled from '../images/whiteHeartIcon.svg';
import '../styles/recipes.css';

class CocktailRecipeDetails extends Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
      cocktails: '',
      isLoading: true,
      ingredients: '',
      measures: [],
    };

    this.handleFavoriteButton = this.handleFavoriteButton.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);
    this.setStorage = this.setStorage.bind(this);
  }

  componentDidMount() {
    const { searchRandomMeals } = this.props;
    searchRandomMeals();
    this.fetchAPI();
  }

  handleFavoriteButton() {
    const { favorite } = this.state;
    if (!favorite) {
      this.setState({
        favorite: true,
      });
    } else {
      this.setState({
        favorite: false,
      });
    }
    this.setStorage();
  }

  setStorage() {
    const { cocktails, favorite } = this.state;
    console.log(this.state);
    const {
      idDrink,
      strAlcoholic,
      strCategory,
      strDrink,
      strDrinkThumb,
    } = cocktails.drinks[0];
    const cocktailFavorite = {
      id: idDrink,
      type: 'bebida',
      alcoholicOrNot: strAlcoholic,
      area: '',
      category: strCategory,
      name: strDrink,
      image: strDrinkThumb,
    };
    if (favorite) {
      localStorage.removeItem('favoriteRecipes');
    } else {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (storage) {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...storage, cocktailFavorite]),
        );
      } else {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([cocktailFavorite]),
        );
      }
    }
  }

  async fetchAPI() {
    const { match: { params: { id } } } = this.props;
    const results = await getCocktailsDetailsById(id);
    const total = 15;
    let arrayIngredients = [];
    let arrayMeasures = [];
    for (let i = 1; i <= total; i += 1) {
      arrayIngredients = [...arrayIngredients, results.drinks[0][`strIngredient${i}`]];
      arrayMeasures = [...arrayMeasures, results.drinks[0][`strMeasure${i}`]];
    }
    this.setState({
      ingredients: arrayIngredients,
      measures: arrayMeasures,
      cocktails: results,
      isLoading: false,
    });
  }

  render() {
    const { cocktails, isLoading, favorite, ingredients, measures } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const {
      idDrink,
      strDrink,
      strDrinkThumb,
      strAlcoholic,
      strInstructions,
    } = cocktails.drinks[0];

    const zero = 0;
    const maxLength = 6;
    const { meals } = this.props;
    const firstMeals = meals.slice(zero, maxLength);

    return (
      <div className="recipe-details">
        <img
          src={ strDrinkThumb }
          alt=""
          data-testid="recipe-photo"
          className="recipe-photo"
        />
        <div className="recipe-header">
          <h1
            data-testid="recipe-title"
            className="recipe-title"
          >
            {strDrink}
          </h1>
          <div className="actions">
            <button
              type="button"
              data-testid="share-btn"
              className="action-button"
            >
              <img
                src={ shareIcon }
                alt="share"
              />
            </button>
            <button
              type="button"
              onClick={ this.handleFavoriteButton }
              className="action-button"
            >
              <img
                src={ (favorite) ? favIconEnabled : favIconDisabled }
                alt="favorite"
                data-testid="favorite-btn"
                className="favorite-icon"
              />
            </button>
          </div>
        </div>
        <span
          data-testid="recipe-category"
          className="recipe-category"
        >
          { strAlcoholic }
        </span>
        <div>
          <h2>Ingredients</h2>
          <ul>
            {
              ingredients
                .filter((item) => item !== '' && item !== null)
                .map((item, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${item} - ${measures[index]}`}
                  </li>
                ))
            }
          </ul>
        </div>
        <div>
          <h2>Instructions</h2>
          <p data-testid="instructions">{strInstructions}</p>
        </div>
        <div>
          { firstMeals.map((meal, index) => (
            <MealCard
              key={ index }
              meals={ meal }
              index={ index }
              testid="recomendation-card"
            />
          ))}
        </div>
        <div className="start-btn">
          <Link
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            to={ `${idDrink}/in-progress` }
          >
            Iniciar receita
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ meals }) => ({
  meals: meals.meals,
});

const mapDispatchToProps = (dispatch) => ({
  searchRandomMeals: () => dispatch(fetchRandomMeals()),
});

CocktailRecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  searchRandomMeals: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CocktailRecipeDetails);
