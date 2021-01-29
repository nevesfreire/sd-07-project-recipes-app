import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { CustomCardSuggested } from '../components';
import {
  getFood,
  getDrink,
  getSuggestedFoods,
  getSuggestedDrinks,
  setStorage,
  getStorage,
} from '../services';

export default class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.fetchRecipe = this.fetchRecipe.bind(this);
    this.getTypeOfRecipe = this.getTypeOfRecipe.bind(this);
    this.getYoutubeEmbedUrl = this.getYoutubeEmbedUrl.bind(this);
    this.getIngredientsList = this.getIngredientsList.bind(this);
    this.getSuggestedRecipes = this.getSuggestedRecipes.bind(this);
    this.verifyRecipeInProgress = this.verifyRecipeInProgress.bind(this);
    this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
    this.verifyRecipeIsDone = this.verifyRecipeIsDone.bind(this);
    this.state = {
      recipeId: '',
      isLoading: true,
      recipe: {},
      suggestedRecipes: [],
      recipeType: '',
      ingredientsList: [],
      measureList: [],
      inProgress: false,
      isRedirect: false,
      isDone: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id }, path } } = this.props;
    this.fetchRecipe(id, path);
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

  getSuggestedRecipes() {
    const { suggestedRecipes, recipeType } = this.state;
    if (!suggestedRecipes) return <div> Sem Sugestões </div>;
    const sufixeRecipe = (recipeType === 'comidas') ? 'Drink' : 'Meal';
    const INITIAL_INDEX = 0;
    const MAX_INDEX = 6;
    return (
      <Carousel>
        {
          suggestedRecipes.slice(INITIAL_INDEX, MAX_INDEX)
            .map((recipe, index) => (
              <Carousel.Item key={ index }>
                <CustomCardSuggested
                  index={ index }
                  thumb={ recipe[`str${sufixeRecipe}Thumb`] }
                  title={ recipe[`str${sufixeRecipe}`] }
                />
              </Carousel.Item>))
        }
      </Carousel>
    );
  }

  getYoutubeEmbedUrl() {
    const { recipe: { strYoutube } } = this.state;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = strYoutube.match(regExp);
    if (!match) return '';
    return `https://www.youtube.com/embed/${match[2]}`;
  }

  getTypeOfRecipe(path) {
    const regExp = /(\w+)/;
    const match = path.match(regExp);
    return match[0];
  }

  getIngredientsList() {
    const { recipeType, recipe } = this.state;
    const INITIAL_INDEX = 1;
    const INDEX_FOOD = 20;
    const INDEX_DRINK = 15;
    const MAX_INDEX = (recipeType === 'comidas') ? INDEX_FOOD : INDEX_DRINK;
    const ingredientsList = [];
    const measureList = [];
    for (let index = INITIAL_INDEX; index < MAX_INDEX; index += 1) {
      ingredientsList
        .push(recipe[`strIngredient${index}`]);
      measureList
        .push(recipe[`strMeasure${index}`]);
    }
    this.setState({
      ingredientsList,
      measureList,
    });
  }

  localStorageSetUp() {
    if (!getStorage('inProgressRecipes')) {
      setStorage('inProgressRecipes', { cocktails: {}, meals: {} });
    }
  }

  verifyRecipeInProgress(id) {
    const { recipeType } = this.state;
    const inProgressRecipes = getStorage('inProgressRecipes');
    if (inProgressRecipes) {
      if (recipeType === 'comidas' && (inProgressRecipes.meals[id])) {
        this.setState({ inProgress: true });
      }
      if (recipeType === 'bebidas' && inProgressRecipes.cocktails[id]) {
        this.setState({ inProgress: true });
      }
    }
  }

  verifyRecipeIsDone(recipeId) {
    const doneRecipes = getStorage('doneRecipes');
    if (doneRecipes) {
      this.setState({
        isDone: doneRecipes.some(({ id }) => id === recipeId),
      });
    }
  }

  async fetchRecipe(id, path) {
    const recipeType = this.getTypeOfRecipe(path);
    this.setState({ isLoading: true });
    if (recipeType === 'comidas') {
      const { meals } = await getFood(id);
      const { drinks } = await getSuggestedDrinks();
      this.setState({
        recipeId: id,
        isLoading: false,
        recipe: meals[0],
        suggestedRecipes: drinks,
        recipeType,
      });
    }
    if (recipeType === 'bebidas') {
      const { drinks } = await getDrink(id);
      const { meals } = await getSuggestedFoods();
      this.setState({
        recipeId: id,
        isLoading: false,
        recipe: drinks[0],
        suggestedRecipes: meals,
        recipeType,
      });
    }
    this.getIngredientsList();
    this.verifyRecipeInProgress(id);
    this.verifyRecipeIsDone(id);
  }

  renderIngredientsList() {
    const { ingredientsList, measureList } = this.state;
    return (
      ingredientsList
        .filter((ingredient) => ingredient !== '' && ingredient !== null)
        .map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${(measureList[index]) ? (measureList[index]) : ''} ${ingredient}` }
          </li>
        ))
    );
  }

  render() {
    const {
      isLoading,
      recipe,
      recipeType,
      inProgress,
      recipeId,
      isRedirect,
      isDone,
    } = this.state;

    const { strInstructions } = recipe;
    if (isLoading) return <div> Loading... </div>;
    if (isRedirect) return <Redirect to={ `/${recipeType}/${recipeId}/in-progress` } />;
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
          { (!isLoading) && this.renderIngredientsList() }
        </ul>
        { (recipeType === 'comidas') && <iframe
          data-testid="video"
          src={ this.getYoutubeEmbedUrl() }
          frame-border="0"
          allow="autoplay; encrypted-media"
          allow-fullscreen
          title="video"
        /> }
        { (!isLoading) && this.getSuggestedRecipes() }
        { (!isDone)
          && (
            <button
              className="footer"
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => this.handleStartButtonClick(recipeId) }
            >
              { (inProgress) ? 'Continuar Receita' : 'Iniciar Receita' }
            </button>)}
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};
