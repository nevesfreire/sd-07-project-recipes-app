import React, { Component } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCocktailsDetailsById } from '../services/cocktailsAPI';
import shareIcon from '../images/shareIcon.svg';
import favIconEnabled from '../images/blackHeartIcon.svg';
import favIconDisabled from '../images/whiteHeartIcon.svg';
import CarouselMeals from '../components/CarouselMeals';
import row from '../images/spacer.png';
import '../styles/recipes.css';

class CocktailRecipeDetails extends Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
      cocktails: '',
      isLoading: true,
      ingredients: '',
      measures: [],
    };

    this.handleFavoriteButton = this.handleFavoriteButton.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);
    this.setStorage = this.setStorage.bind(this);
    this.verifyFavorite = this.verifyFavorite.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
    this.verifyFavorite();
  }

  handleFavoriteButton() {
    const { favorite } = this.state;
    if (!favorite) {
      this.setState({
        favorite: true,
      });
    } else {
      this.setState({
        favorite: false,
      });
    }
    this.setStorage();
  }

  setStorage() {
    const { cocktails, favorite } = this.state;
    const {
      idDrink,
      strAlcoholic,
      strCategory,
      strDrink,
      strDrinkThumb,
    } = cocktails.drinks[0];
    const cocktailFavorite = {
      id: idDrink,
      type: 'bebida',
      alcoholicOrNot: strAlcoholic,
      area: '',
      category: strCategory,
      name: strDrink,
      image: strDrinkThumb,
    };
    if (favorite) {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const itemStorage = storage.filter((item) => item.id !== idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(itemStorage));
    } else {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      if (storage) {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...storage, cocktailFavorite]),
        );
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([cocktailFavorite]));
      }
    }
  }

  verifyFavorite() {
    const { match: { params: { id } } } = this.props;
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const fav = favorites.filter((item) => item.id === id);
    if (fav.length) {
      const { favorite } = this.state;
      if (!favorite) {
        this.setState({
          favorite: true,
        });
      } else {
        this.setState({
          favorite: false,
        });
      }
    }
  }

  async fetchAPI() {
    const { match: { params: { id } } } = this.props;
    const results = await getCocktailsDetailsById(id);
    const total = 15;
    let arrayIngredients = [];
    let arrayMeasures = [];
    for (let i = 1; i <= total; i += 1) {
      arrayIngredients = [...arrayIngredients, results.drinks[0][`strIngredient${i}`]];
      arrayMeasures = [...arrayMeasures, results.drinks[0][`strMeasure${i}`]];
    }
    this.setState({
      ingredients: arrayIngredients,
      measures: arrayMeasures,
      cocktails: results,
      isLoading: false,
    });
  }

  copyLink(id) {
    copy(`http://localhost:3000/bebidas/${id}`);
    document.getElementById('link').style = 'inline';
  }

  render() {
    const { cocktails, isLoading, favorite, ingredients, measures } = this.state;
    if (isLoading) return <p>Loading...</p>;
    const {
      idDrink,
      strDrink,
      strDrinkThumb,
      strAlcoholic,
      strInstructions,
    } = cocktails.drinks[0];

    return (
      <div className="recipe-details">
        <img
          src={ strDrinkThumb }
          alt="Cocktails Thumbnail"
          data-testid="recipe-photo"
          className="recipe-photo"
        />
        <div className="recipe-header box-content">
          <h1
            data-testid="recipe-title"
            className="recipe-title"
          >
            {strDrink}
          </h1>
          <div className="actions">
            <button
              type="button"
              data-testid="share-btn"
              className="action-button"
              onClick={ () => this.copyLink(idDrink) }
            >
              <img src={ shareIcon } alt="share" />
            </button>
            <p id="link" style={ { display: 'none' } }>Link copiado!</p>
            <button
              type="button"
              onClick={ this.handleFavoriteButton }
              className="action-button"
            >
              <img
                src={ (favorite) ? favIconEnabled : favIconDisabled }
                alt="favorite"
                data-testid="favorite-btn"
                className="favorite-icon"
              />
            </button>
          </div>
        </div>
        <span data-testid="recipe-category" className="recipe-category">
          { strAlcoholic }
        </span>
        <img src={ row } alt="row" className="spacer" />
        <div className="box-content">
          <h2>Ingredients</h2>
          <ul>
            {ingredients
              .filter((item) => item !== '' && item !== null)
              .map((item, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${item} - ${measures[index]}`}
                </li>
              ))}
          </ul>
        </div>
        <img src={ row } alt="row" className="spacer" />
        <div>
          <h2>Instructions</h2>
          <p data-testid="instructions">{strInstructions}</p>
        </div>
        <img src={ row } alt="row" className="spacer" />
        <div>
          <CarouselMeals />
        </div>
        <div className="start-btn">
          <Link
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            to={ `${idDrink}/in-progress` }
          >
            Iniciar receita
          </Link>
        </div>
      </div>
    );
  }
}

CocktailRecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CocktailRecipeDetails;
