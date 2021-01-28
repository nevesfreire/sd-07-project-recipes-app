import React, { Component } from 'react';
import { getFood, getDrink } from '../services';

export default class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.fetchRecipe = this.fetchRecipe.bind(this);
    this.getTypeOfRecipe = this.getTypeOfRecipe.bind(this);
    this.getYoutubeEmbedUrl = this.getYoutubeEmbedUrl.bind(this);
    this.getIngredientsList = this.getIngredientsList.bind(this);
    this.state = {
      isLoading: true,
      recipe: {},
      recipeType: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id }, path } } = this.props;
    this.fetchRecipe(id, path);
  }

  getTypeOfRecipe(path) {
    const regExp = /(\w+)/;
    const match = path.match(regExp);
    return match[0];
  }

  getYoutubeEmbedUrl() {
    const { recipe: { strYoutube } } = this.state;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = strYoutube.match(regExp);
    this.getIngredientsList();
    return `https://www.youtube.com/embed/${match[2]}`;
  }

  getIngredientsList() {
    const { recipeType, recipe } = this.state;
    const INITIAL_INDEX = 1;
    const INDEX_FOOD = 20;
    const INDEX_DRINK = 15;
    const MAX_INDEX = (recipeType === 'comidas') ? INDEX_FOOD : INDEX_DRINK;
    const ingredientsAndMeasureList = [];
    for (let index = INITIAL_INDEX; index < MAX_INDEX; index += 1) {
      ingredientsAndMeasureList
        .push([recipe[`strIngredient${index}`], recipe[`strMeasure${index}`]]);
    }
    return (
      ingredientsAndMeasureList
        .filter((ingredient) => ingredient[0] !== '' && ingredient[0] !== null)
        .map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${(ingredient[1]) ? (ingredient[1]) : ''} ${ingredient[0]}` }
          </li>
        ))
    );
  }

  async fetchRecipe(id, path) {
    const recipeType = this.getTypeOfRecipe(path);
    this.setState({ isLoading: true });
    if (recipeType === 'comidas') {
      const { meals } = await getFood(id);
      this.setState({
        isLoading: false,
        recipe: meals[0],
        recipeType,
      });
    }
    if (recipeType === 'bebidas') {
      const { drinks } = await getDrink(id);
      this.setState({
        isLoading: false,
        recipe: drinks[0],
        recipeType,
      });
    }
  }

  render() {
    const { isLoading, recipe, recipeType } = this.state;
    const {
      strInstructions,
    } = recipe;
    if (isLoading) return <div> Loading... </div>;
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ (recipeType === 'comidas') ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt="recipe-exemple"
        />
        <h2
          data-testid="recipe-title"
        >
          { (recipeType === 'comidas') ? recipe.strMeal : recipe.strDrink }
        </h2>
        <button type="button" data-testid="share-btn"> SHARE </button>
        <button type="button" data-testid="favorite-btn"> FAVORITE </button>
        <h3 data-testid="recipe-category">
          { (recipeType === 'comidas') ? recipe.strCategory : recipe.strAlcoholic }
        </h3>
        <p data-testid="instructions">{ strInstructions }</p>
        <ul>
          { (!isLoading) && this.getIngredientsList() }
        </ul>
        { (recipeType === 'comidas') && <iframe
          data-testid="video"
          src={ this.getYoutubeEmbedUrl() }
          frame-border="0"
          allow="autoplay; encrypted-media"
          allow-fullscreen
          title="video"
        /> }
        <div data-testid="${index}-recomendation-card"> RECOMENDED RECIPES </div>
        <button type="button" data-testid="start-recipe-btn"> START RECIPE </button>
      </div>
    );
  }
}
