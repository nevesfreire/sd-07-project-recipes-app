import React, { Component } from 'react';
import shareIcon from '../images/shareIcon.svg';
import favIconEnabled from '../images/blackHeartIcon.svg';
import favIconDisabled from '../images/whiteHeartIcon.svg';
import '../styles/recipeDetails.css';

class MealRecipeDetails extends Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
    };

    this.handleFavoriteButton = this.handleFavoriteButton.bind(this);
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

  render() {
    const { favorite } = this.state;
    return (
      <div className="recipe-details">
        <img
          src="https://cdn.pixabay.com/photo/2014/04/22/02/55/pasta-329522__340.jpg"
          alt=""
          data-testid="recipe-photo"
          className="recipe-photo"
        />
        <div className="recipe-header">
          <h1
            data-testid="recipe-title"
            className="recipe-title"
          >
            Miojão top!
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
              />
            </button>
          </div>
        </div>
        <span
          data-testid="recipe-category"
          className="recipe-category"
        >
          Categoria
        </span>
        <div>
          <h2>Ingredients</h2>
          <ul data-testid="0-ingredient-name-and-measure">
            <li>1 pacote de miojo</li>
            <li>1 sache molho de tomate</li>
            <li>50g parmesão ralado</li>
            <li>Sal a gosto</li>
          </ul>
        </div>
        <div>
          <h2>Instructions</h2>
          <p data-testid="instructions">Aprenda a fazer um miojão top!</p>
        </div>
        <div data-testid="video">
          <iframe
            title="Miojão"
            width="100%"
            height="350px"
            src="https://www.youtube.com/embed/CBK3WYUb4ng"
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

export default MealRecipeDetails;
