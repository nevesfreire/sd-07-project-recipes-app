import React, { Component } from 'react';
import { getFood } from '../services';

export default class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.fetchRecipe = this.fetchRecipe.bind(this);
    this.state = {
      isLoading: true,
      recipe: {},
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    console.log(id);
    this.fetchRecipe(id);
  }

  getYoutubeEmbedUrl() {
    const { recipe: { strYoutube } } = this.state;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = strYoutube.match(regExp);
    return `https://www.youtube.com/embed/${match[2]}`;
  }

  async fetchRecipe(id) {
    this.setState({ isLoading: true });
    const { meals } = await getFood(id);
    this.setState({
      isLoading: false,
      recipe: meals[0],
    });
  }

  render() {
    const { isLoading, recipe } = this.state;
    const {
      strMealThumb,
      strMeal,
      strCategory,
      strInstructions,
    } = recipe;
    if (isLoading) return <div> Loading... </div>;
    return (
      <div>
        <img data-testid="recipe-photo" src={ strMealThumb } alt="" />
        <h2 data-testid="recipe-title">{ strMeal }</h2>
        <button type="button" data-testid="share-btn"> SHARE </button>
        <button type="button" data-testid="favorite-btn"> FAVORITE </button>
        <h3 data-testid="recipe-category">{ strCategory }</h3>
        <p data-testid="instructions">{ strInstructions }</p>
        <li>
          <ul data-testid="${index}-ingredient-name-and-measure"> INGREDIENT</ul>
        </li>
        <iframe
          data-testid="video"
          src={ this.getYoutubeEmbedUrl() }
          frame-border="0"
          allow="autoplay; encrypted-media"
          allow-fullscreen
          title="video"
        />
        <div data-testid="${index}-recomendation-card"> RECOMENDED RECIPES </div>
        <button type="button" data-testid="start-recipe-btn"> START RECIPE </button>
      </div>
    );
  }
}
