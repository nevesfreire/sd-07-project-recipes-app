import React, { Component } from 'react';

export class CustomDetailsButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRedirect: true,
    };
  }

  handleStartButtonClick(recipeId) {
    const { ingredientsList, recipeType } = this.state;
    this.localStorageSetUp();
    if (recipeType === 'comidas') {
      setStorage('inProgressRecipes', {
        ...getStorage('inProgressRecipes'),
        meals: {
          ...getStorage('inProgressRecipes').meals,
          [recipeId]: ingredientsList,
        },
      });
    }
    if (recipeType === 'bebidas') {
      setStorage('inProgressRecipes', {
        ...getStorage('inProgressRecipes'),
        cocktails: {
          ...getStorage('inProgressRecipes').cocktails,
          [recipeId]: ingredientsList,
        },
      });
    }
    this.setState({ isRedirect: true });
  }

  render() {
    const { isRedirect } = this.state;
    if (isRedirect)
    return (
      <button
        className="footer"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => this.handleStartButtonClick(recipeId) }
      >
        { (inProgress) ? 'Continuar Receita' : 'Iniciar Receita' }
      </button>
    );
  }
}

export default CustomDetailsButton;
