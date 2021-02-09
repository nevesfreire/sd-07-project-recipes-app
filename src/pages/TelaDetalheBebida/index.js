import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import clipboard from 'clipboard-copy';
import getStorage from '../../services/localStorageAPI/getStorage';
import setStorage from '../../services/localStorageAPI/setStorage';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { RecomendationCardDrink } from '../../components';
import {
  getSpecificDrinkById,
} from '../../store/ducks/getDetailedDrink/actions';
import { getRecommendatedMeals } from '../../store/ducks/getDetailedMeal/actions';

class TelaDetalheBebida extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      isFavorite: false,
    };
    this.handleShareClick = this.handleShareClick.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id } },
    } = this.props;
    const { getDetailedDrinkDispatch, getRecommendationMeals } = this.props;
    await getRecommendationMeals();
    await getDetailedDrinkDispatch(id);
  }

  componentDidUpdate() {
    const favoritesFromStorage = getStorage('favoriteRecipes');
    const { isFavorite } = this.state;
    const { drinkDetailStore } = this.props;
    if (drinkDetailStore) {
      if (!favoritesFromStorage) {
        setStorage('favoriteRecipes', []);
      } else if (!isFavorite) { this.handleFavoriteStart(drinkDetailStore); }
    }
  }

  componentWillUnmount() {
    this.setState({ isFavorite: false });
  }

  handleShareClick() {
    this.setState({ isClicked: true });
    clipboard(`${document.URL}`);
  }

  handleIngredients(drink) {
    const drinkArray = Object.entries(drink[0]);
    const ingredientsArray = drinkArray.filter(
      (element) => element[0].startsWith('strIngredient') && element[1],
    );
    return ingredientsArray;
  }

  handleMeasure(drink) {
    const drinkArray = Object.entries(drink[0]);
    const measuresArray = drinkArray.filter(
      (element) => element[0].startsWith('strMeasure') && element[1],
    );
    return measuresArray;
  }

  handleFavoriteStart(drinkDetailStore) {
    const favoritesFromStorage = getStorage('favoriteRecipes');
    const zero = 0;
    if (favoritesFromStorage.length !== zero) {
      favoritesFromStorage.forEach((item) => {
        if (item.id === drinkDetailStore[0].idDrink) {
          this.setState({ isFavorite: true });
        }
      });
    }
  }

  handleFavoriteClick(drinkDetailStore) {
    const favoritesFromStorage = getStorage('favoriteRecipes');
    const { isFavorite } = this.state;
    if (isFavorite) {
      const newLocalStorage = favoritesFromStorage
        .filter((curr) => curr.id !== drinkDetailStore.idDrink);
      setStorage('favoriteRecipes', newLocalStorage);
      this.setState({ isFavorite: false });
    } else {
      const newLocalStorageObj = {
        id: drinkDetailStore.idDrink,
        type: 'bebida',
        area: drinkDetailStore.strArea,
        category: drinkDetailStore.strCategory,
        alcoholicOrNot: '',
        name: drinkDetailStore.strDrink,
        image: drinkDetailStore.strDrinkThumb,
      };
      favoritesFromStorage.push(newLocalStorageObj);
      setStorage('favoriteRecipes', favoritesFromStorage);
      this.setState({ isFavorite: true });
    }
  }

  renderWhiteHeart() {
    return (
      <img
        data-testid="favorite-btn"
        alt="favorite-btn"
        src={ whiteHeartIcon }
      />
    );
  }

  renderBlackHeart() {
    return (
      <img
        data-testid="favorite-btn"
        alt="favorite-btn"
        src={ blackHeartIcon }
      />
    );
  }

  renderDetails(drink) {
    const ingredientsArray = this.handleIngredients(drink);
    const measuresArray = this.handleMeasure(drink);
    const { mealsRecommendStore, drinkDetailStore } = this.props;
    const six = 6;
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
    };
    const { isClicked, isFavorite } = this.state;
    return (
      <div>
        <img
          data-testid="recipe-photo"
          alt="bebida"
          src={ drink[0].strDrinkThumb }
        />
        <h3 data-testid="recipe-title">{drink[0].strDrink}</h3>
        <div
          onClick={ this.handleShareClick }
          onKeyDown={ this.handleShareClick }
          role="button"
          tabIndex={ 0 }
        >
          <img
            data-testid="share-btn"
            alt="share-btn"
            src={ shareIcon }
          />
        </div>
        <tag>
          { (isClicked) ? ('Link copiado!') : (null) }
        </tag>
        <div
          onClick={ () => this.handleFavoriteClick(drinkDetailStore[0]) }
          onKeyDown={ () => this.handleFavoriteClick(drinkDetailStore[0]) }
          role="button"
          tabIndex={ 0 }
        >
          { (!isFavorite) ? (this.renderWhiteHeart()) : (this.renderBlackHeart()) }
        </div>
        <h4 data-testid="recipe-category">{drink[0].strAlcoholic}</h4>
        <div>
          <h4>Ingredients</h4>
          <ul>
            {ingredientsArray.map((item, index) => (
              <li data-testid={ `${index}-ingredient-name-and-measure` } key={ item }>
                {`${item[1]} - ${measuresArray[index][1]}`}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Instructions</h4>
          <p data-testid="instructions">{drink[0].strInstructions}</p>
        </div>
        <Slider { ...settings }>
          {mealsRecommendStore.map((element, index) => {
            if (index < six) {
              return (<RecomendationCardDrink
                key={ element }
                mealRecommended={ element }
                mealIndex={ index }
              />);
            } return null;
          })}
        </Slider>
        <button
          data-testid="start-recipe-btn"
          type="button"
          style={ { position: 'fixed', bottom: '0px' } }
        >
          Iniciar Receita
        </button>
      </div>
    );
  }

  render() {
    const { drinkDetailStore } = this.props;
    if (drinkDetailStore) {
      return this.renderDetails(drinkDetailStore);
    }
    return null;
  }
}

const mapStateToProps = (state) => ({
  drinkDetailStore: state.detalhesDaReceitaBebida.drink.drinks,
  mealsRecommendStore: state.detalhesDaReceitaComida.mealRecommend.meals,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailedDrinkDispatch: (id) => dispatch(getSpecificDrinkById(id)),
  getRecommendationMeals: () => dispatch(getRecommendatedMeals()),
});

TelaDetalheBebida.propTypes = {
  drinkDetailStore: PropTypes.arrayOf(PropTypes.Object).isRequired,
  getDetailedDrinkDispatch: PropTypes.func.isRequired,
  mealsRecommendStore: PropTypes.arrayOf(PropTypes.Object).isRequired,
  getRecommendationMeals: PropTypes.arrayOf(PropTypes.Object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TelaDetalheBebida);
