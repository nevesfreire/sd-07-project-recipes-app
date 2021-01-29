import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setStorage, getStorage } from '../services';

export default class CustomDetailsButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRedirect: false,
      inProgress: false,
    };
  }

  componentDidMount() {
    this.verifyRecipeInProgress();
  }

  handleStartButtonClick() {
    const { recipeType, recipeId } = this.props;
    const { ingredientsList } = this.state;
    this.getIngredientsList();
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

  getIngredientsList() {
    const { recipeType, recipe } = this.props;
    const INITIAL_INDEX = 1;
    const INDEX_FOOD = 20;
    const INDEX_DRINK = 15;
    const MAX_INDEX = (recipeType === 'comidas') ? INDEX_FOOD : INDEX_DRINK;
    const ingredientsList = [];
    for (let index = INITIAL_INDEX; index < MAX_INDEX; index += 1) {
      ingredientsList
        .push(recipe[`strIngredient${index}`]);
    }
    this.setState({
      ingredientsList,
    });
  }

  localStorageSetUp() {
    if (!getStorage('inProgressRecipes')) {
      setStorage('inProgressRecipes', { cocktails: {}, meals: {} });
    }
  }

  verifyRecipeInProgress() {
    const { recipeType, recipeId } = this.props;
    const inProgressRecipes = getStorage('inProgressRecipes');
    if (inProgressRecipes) {
      if (recipeType === 'comidas' && (inProgressRecipes.meals[recipeId])) {
        this.setState({ inProgress: true });
      }
      if (recipeType === 'bebidas' && inProgressRecipes.cocktails[recipeId]) {
        this.setState({ inProgress: true });
      }
    }
  }

  render() {
    const { recipeType, recipeId } = this.props;
    const { isRedirect, inProgress } = this.state;
    if (isRedirect) return <Redirect to={ `/${recipeType}/${recipeId}/in-progress` } />;
    return (
      <button
        className="footer"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => this.handleStartButtonClick() }
      >
        { (inProgress) ? 'Continuar Receita' : 'Iniciar Receita' }
      </button>
    );
  }
}

CustomDetailsButton.propTypes = {
  recipeType: PropTypes.string.isRequired,
  recipeId: PropTypes.number.isRequired,
  recipe: PropTypes.arrayOf(PropTypes.string).isRequired,
};
