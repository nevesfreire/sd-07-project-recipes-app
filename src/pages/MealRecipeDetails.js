import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    this.setState({
      meals: results,
      isLoading: false,
    });
  }

  render() {
    const { meals, isLoading, favorite } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const {
      strMealThumb,
      strMeal,
      strCategory,
      strIngredient1,
      strMeasure1,
      strIngredient2,
      strMeasure2,
      strIngredient3,
      strMeasure3,
      strIngredient4,
      strMeasure4,
      strIngredient5,
      strMeasure5,
      strIngredient6,
      strMeasure6,
      strIngredient7,
      strMeasure7,
      strIngredient8,
      strMeasure8,
      strInstructions,
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
              data-testid="favorite-btn"
              onClick={ this.handleFavoriteButton }
              className="action-button"
            >
              <img
                src={ (favorite) ? favIconEnabled : favIconDisabled }
                alt="favorite"
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
          <ul data-testid="0-ingredient-name-and-measure">
            <li>
              {`${strIngredient1} ${strMeasure1}`}
            </li>
            <li>
              {`${strIngredient2} ${strMeasure2}`}
            </li>
            <li>
              {`${strIngredient3} ${strMeasure3}`}
            </li>
            <li>
              {`${strIngredient4} ${strMeasure4}`}
            </li>
            <li>
              {`${strIngredient5} ${strMeasure5}`}
            </li>
            <li>
              {`${strIngredient6} ${strMeasure6}`}
            </li>
            <li>
              {`${strIngredient7} ${strMeasure7}`}
            </li>
            <li>
              {`${strIngredient8} ${strMeasure8}`}
            </li>
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
          <button
            type="submit"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
          >
            Iniciar receita
          </button>
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
