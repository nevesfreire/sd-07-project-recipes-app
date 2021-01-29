import React, { Component } from 'react';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

class TelaDetalheBebida extends Component {
  render() {
    const { product } = this.props; // Props card will send this information
    return (
      <>
        <img data-testid="recipe-photo" alt="bebida" src="product-image-from-props" />
        <h3 data-testid="recipe-title">product-title-from-props</h3>
        <img data-testid="share-btn" alt="share-btn" src={ shareIcon } />
        <img data-testid="favorite-btn" alt="favorite-btn" src={ whiteHeartIcon } />
        <h4 data-testid="recipe-category">recipe-category-from-props</h3>
        <div>
          <h4>Ingredients</h4>
          <ul>
            {ingredients.map((ingredient) => {
              <li data-testid="${ingredient.index}-ingredient-name-and-measure">Ingredient name and measure from props</li>
            })}
          </ul>
        </div>
        <div>
          <h4>Instructions</h4>
          <p data-testid="instructions">recipe-instructions-from-props</p>
        </div>
      </>
    );
  }
}

export default TelaDetalheBebida;
