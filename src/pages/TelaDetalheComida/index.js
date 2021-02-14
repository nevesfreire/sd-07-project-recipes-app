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
import { RecomendationCardMeal } from '../../components';
import { getSpecificMealById } from '../../store/ducks/getDetailedMeal/actions';
import { getRecommendatedDrinks } from '../../store/ducks/getDetailedDrink/actions';

class TelaDetalheComida extends Component {
  constructor(props) {
    super(props);
    this.state = { isClicked: false, isFavorite: false };
    this.handleShareClick = this.handleShareClick.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { getDetailedMealDispatch, getRecommendationDrinks } = this.props;
    await getRecommendationDrinks();
    await getDetailedMealDispatch(id);
  }

  componentDidUpdate() {
    const favoritesFromStorage = getStorage('favoriteRecipes');
    const { isFavorite } = this.state;
    const { meal } = this.props;
    if (meal) {
      if (!favoritesFromStorage) {
        setStorage('favoriteRecipes', []);
      } else if (!isFavorite) {
        this.handleFavoriteStart(meal);
      }
    }
  }

  componentWillUnmount() {
    this.setState({ isFavorite: false });
  }

  handleShareClick() {
    this.setState({ isClicked: true });
    clipboard(`${document.URL}`);
  }

  handleIngredients(meal) {
    const drinkArray = Object.entries(meal[0]);
    const ingredientsArray = drinkArray.filter(
      (element) => element[0].startsWith('strIngredient') && element[1],
    );
    return ingredientsArray;
  }

  handleMeasure(meal) {
    const drinkArray = Object.entries(meal[0]);
    const measuresArray = drinkArray.filter(
      (element) => element[0].startsWith('strMeasure') && element[1],
    );
    return measuresArray;
  }

  handleFavoriteStart(meal) {
    const favoritesFromStorage = getStorage('favoriteRecipes');
    const zero = 0;
    if (favoritesFromStorage.length !== zero) {
      favoritesFromStorage.forEach((item) => {
        if (item.id === meal[0].idMeal) {
          this.setState({ isFavorite: true });
        }
      });
    }
  }

  handleFavoriteClick(meal) {
    const favoritesFromStorage = getStorage('favoriteRecipes');
    const { isFavorite } = this.state;
    if (isFavorite) {
      const newLocalStorage = favoritesFromStorage.filter(
        (curr) => curr.id !== meal.idMeal,
      );
      setStorage('favoriteRecipes', newLocalStorage);
      this.setState({ isFavorite: false });
    } else {
      const newLocalStorageObj = {
        id: meal.idMeal,
        type: 'comida',
        area: meal.strArea,
        category: meal.strCategory,
        alcoholicOrNot: '',
        name: meal.strMeal,
        image: meal.strMealThumb,
      };
      favoritesFromStorage.push(newLocalStorageObj);
      setStorage('favoriteRecipes', favoritesFromStorage);
      this.setState({ isFavorite: true });
    }
  }

  startsRecipe() {
    const { history } = this.props;
    const { match: { params: { id } } } = this.props;
    history.push(`/comidas/${id}/in-progress`);
  }

  renderWhiteHeart() {
    return (
      <img data-testid="favorite-btn" alt="favorite-btn" src={ whiteHeartIcon } />
    );
  }

  renderBlackHeart() {
    return (
      <img data-testid="favorite-btn" alt="favorite-btn" src={ blackHeartIcon } />
    );
  }

  renderDetails(meal) {
    const ingredientsArray = this.handleIngredients(meal);
    const measuresArray = this.handleMeasure(meal);
    const six = 6;
    const { drinksRecommendStore } = this.props;
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 2,
    };
    const { isClicked, isFavorite } = this.state;
    return (
      <>
        <img
          data-testid="recipe-photo"
          alt="comida"
          src={ meal[0].strMealThumb }
        />
        <h3 data-testid="recipe-title">{meal[0].strMeal}</h3>
        <div
          onClick={ this.handleShareClick }
          onKeyDown={ this.handleShareClick }
          role="button"
          tabIndex={ 0 }
        >
          <img data-testid="share-btn" alt="share-btn" src={ shareIcon } />
        </div>
        <tag>{isClicked ? 'Link copiado!' : null}</tag>
        <div
          onClick={ () => this.handleFavoriteClick(meal[0]) }
          onKeyDown={ () => this.handleFavoriteClick(meal[0]) }
          role="button"
          tabIndex={ 0 }
        >
          {!isFavorite ? this.renderWhiteHeart() : this.renderBlackHeart()}
        </div>
        <h4 data-testid="recipe-category">{meal[0].strCategory}</h4>
        <div>
          <h4>Ingredients</h4>
          <ul>
            {ingredientsArray.map((item, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ item }
              >
                {`${item[1]} - ${measuresArray[index][1]}`}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Instructions</h4>
          <p data-testid="instructions">{meal[0].strInstructions}</p>
          <iframe
            title="teste"
            data-testid="video"
            width="560"
            height="315"
            src={ meal[0].strYoutube }
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div data-testid="video">{meal.strYoutube}</div>
        <Slider { ...settings }>
          {drinksRecommendStore.map((element, index) => {
            if (index < six) {
              return (
                <RecomendationCardMeal
                  key={ element }
                  drinkRecommended={ element }
                  drinkIndex={ index }
                />
              );
            } return null;
          })}
        </Slider>
        <button
          data-testid="start-recipe-btn"
          type="button"
          style={ { position: 'fixed', bottom: '0px' } }
          onClick={ () => this.startsRecipe() }
        >
          Iniciar Receita
        </button>
      </>
    );
  }

  render() {
    const { meal } = this.props;
    if (meal) return this.renderDetails(meal);
    return <div>loading...</div>;
  }
}

TelaDetalheComida.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  meal: PropTypes.arrayOf(PropTypes.Object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getDetailedMealDispatch: PropTypes.func.isRequired,
  drinksRecommendStore: PropTypes.arrayOf(PropTypes.Object).isRequired,
  getRecommendationDrinks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  meal: state.detalhesDaReceitaComida.meal.meals,
  drinksRecommendStore: state.detalhesDaReceitaBebida.drinkRecommend.drinks,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailedMealDispatch: (id) => dispatch(getSpecificMealById(id)),
  getRecommendationDrinks: () => dispatch(getRecommendatedDrinks()),
});
export default connect(mapStateToProps, mapDispatchToProps)(TelaDetalheComida);
