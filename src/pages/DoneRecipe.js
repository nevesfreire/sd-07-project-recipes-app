import React, { Component } from 'react';
import shareIcon from '../images/shareIcon.svg';
import '../css/recipe.css';

class DoneRecipe extends Component {
  render() {
    const index = 0;
    const tagName = 'tagName';
    return (
      <div>
        <button type="button" data-testid="filter-by-all-btn">
          All
        </button>
        <button type="button" data-testid="filter-by-food-btn">
          Food
        </button>
        <button type="button" data-testid="filter-by-drink-btn">
          Drinks
        </button>


        <div data-testid={`${index}-horizontal-image`}>
          <img data-testid={`${index}-horizontal-image`} src={shareIcon} />
          <h2 data-testid={`${index}-horizontal-top-text`}>Categoria</h2>
          <p data-testid={`${index}-horizontal-done-date`}>Data da receita</p>
          <img data-testid={`${index}-horizontal-share-btn`} />
          <h1 data-testid={`${index}-horizontal-name`}>Nome da receita</h1>
          <tag data-testid={`${index}-${tagName}-horizontal-tag`}>tag</tag>
        </div>
        
      </div>
    );
  }
}

export default DoneRecipe;
