import React, { Component } from 'react';
import '../css/recipe.css';

class FoodInProgress extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <div className="main-container">
          <img
            src={ strMealThumb }
            alt={ strMeal }
            data-testid="recipe-photo"
            className="main-image"
          />
          <div className="title-container">
            <div className="title-subcontainer">
              <h1 data-testid="recipe-title">{strMeal }</h1>
              <h3 data-testid="recipe-category">{strCategory}</h3>
            </div>
            <div className="images-container">
              <button
                type="button"
                data-testid="share-btn"
                src={ shareIcon }
                alt="shareIcon"
              />
              <button
                type="button"
                data-testid="favorite-btn"
                onClick={ this.changeFavorite }
                src={ favorite ? blackHeartIcon : whiteHeartIcon }
                alt="whiteHeartIcon"
              />
            </div>
          </div>
          <div className="ingredients-container">
            <h1>Ingredientes</h1>
            <div className="form-check">
              {ingredients
                .map((ingredient, index) => (
                  <label
                    className="form-check-label"
                    key={ index }
                    htmlFor={ ingredient }
                  >
                    <input
                      className="form-check-input"
                      data-testid={ `${index}-ingredient-step` }
                      id={ ingredient }
                    />
                  </label>
                ))}
            </div>
          </div>
          <div className="instructions-container">
            <h1>Instruções</h1>
            <p data-testid="instructions">{strInstructions}</p>
          </div>
          <div className="finish-button-container">
            <button
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ () => history.push('/receitas-feitas') }
              className="finish-button-recipe"
            >
              Finalizar Receita
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FoodInProgress;

FoodInProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
