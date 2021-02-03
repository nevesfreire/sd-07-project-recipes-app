import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getMealsDetailsById } from '../services/mealsAPI';
import shareIcon from '../images/shareIcon.svg';
import favIconEnabled from '../images/blackHeartIcon.svg';
import favIconDisabled from '../images/whiteHeartIcon.svg';
import '../styles/recipeDetails.css';

class MealRecipeDetails extends Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
      meals: '',
      isLoading: true,
      ingredients: '',
      measures: [],
    };

    this.handleFavoriteButton = this.handleFavoriteButton.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  handleFavoriteButton() {
    const { favorite } = this.state;
    if (!favorite) {
      return this.setState({
        favorite: true,
      });
    }
    return this.setState({
      favorite: false,
    });
  }

  async fetchAPI() {
    const { match: { params: { id } } } = this.props;
    const results = await getMealsDetailsById(id);
    const total = 20;
    let arrayIngredients = [];
    let arrayMeasures = [];
    for (let i = 1; i <= total; i += 1) {
      arrayIngredients = [...arrayIngredients, results.meals[0][`strIngredient${i}`]];
      arrayMeasures = [...arrayMeasures, results.meals[0][`strMeasure${i}`]];
    }
    this.setState({
      ingredients: arrayIngredients,
      measures: arrayMeasures,
      meals: results,
      isLoading: false,
    });
  }

  render() {
    const { meals, isLoading, favorite, ingredients, measures } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const {
      idMeal,
      strMealThumb,
      strMeal,
      strInstructions,
      strCategory,
      strYoutube,
    } = meals.meals[0];

    const youtubeId = strYoutube.substring(strYoutube.indexOf('=') + 1);

    return (
      <div className="recipe-details">
        <img
          src={ strMealThumb }
          alt=""
          data-testid="recipe-photo"
          className="recipe-photo"
        />
        <div className="recipe-header">
          <h1
            data-testid="recipe-title"
            className="recipe-title"
          >
            {strMeal}
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
          { strCategory }
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
          <h2>Video</h2>
          <iframe
            data-testid="video"
            title={ strMeal }
            width="360"
            height="202.5"
            src={ `https://www.youtube.com/embed/${youtubeId}` }
            frameBorder="0"
            allow="accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture"
            allowFullScreen
          />
        </div>
        <div>
          <h2
            data-testid="0-recomendation-card"
          >
            Receitas recomendadas
          </h2>
          <div
            data-testid="0-recomendation-card"
          >
            Receita 1
          </div>
          <div
            data-testid="0-recomendation-card"
          >
            Receita 2
          </div>
          <div
            data-testid="0-recomendation-card"
          >
            Receita 3
          </div>
          <div
            data-testid="0-recomendation-card"
          >
            Receita 4
          </div>
        </div>
        <div className="start-btn">
          <Link
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            to={ `${idMeal}/in-progress` }
          >
            Iniciar receita
          </Link>
        </div>
      </div>
    );
  }
}

MealRecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MealRecipeDetails;
