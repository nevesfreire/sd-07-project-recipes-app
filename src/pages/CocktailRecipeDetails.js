import React, { Component } from 'react';
import shareIcon from '../images/shareIcon.svg';
import favIconEnabled from '../images/blackHeartIcon.svg';
import favIconDisabled from '../images/whiteHeartIcon.svg';
import '../styles/recipeDetails.css';

class CocktailRecipeDetails extends Component {
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
          src="https://cdn.pixabay.com/photo/2020/01/21/11/36/caipirinha-4782694_960_720.jpg"
          alt=""
          data-testid="recipe-photo"
          className="recipe-photo"
        />
        <div className="recipe-header">
          <h1
            data-testid="recipe-title"
            className="recipe-title"
          >
            Caipirinha
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
          Categoria
        </span>
        <div>
          <h2>Ingredients</h2>
          <ul data-testid="0-ingredient-name-and-measure">
            <li>1 limão</li>
            <li>100ml cachaça</li>
            <li>2 colheres de açúcar</li>
            <li>5 cubos de gelo</li>
          </ul>
        </div>
        <div>
          <h2>Instructions</h2>
          <p data-testid="instructions">Aprenda a fazer uma caipirinha</p>
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

export default CocktailRecipeDetails;
