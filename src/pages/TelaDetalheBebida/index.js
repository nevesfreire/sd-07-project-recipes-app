import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import clipboard from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
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
    };
    this.handleShareClick = this.handleShareClick.bind(this);
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { getDetailedDrinkDispatch, getRecommendationMeals } = this.props;
    await getRecommendationMeals();
    await getDetailedDrinkDispatch(id);
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

  renderDetails(drink) {
    const ingredientsArray = this.handleIngredients(drink);
    const measuresArray = this.handleMeasure(drink);
    const { mealsRecommendStore } = this.props;
    const six = 6;
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
    };
    const { isClicked } = this.state;

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
          {
            (isClicked) ? ('Link copiado!') : (null)
          }
        </tag>
        <img
          data-testid="favorite-btn"
          alt="favorite-btn"
          src={ whiteHeartIcon }
        />
        <h4 data-testid="recipe-category">{drink[0].strAlcoholic}</h4>
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
          <p data-testid="instructions">{drink[0].strInstructions}</p>
        </div>
        <Slider { ...settings }>
          {mealsRecommendStore.map((element, index) => {
            if (index < six) {
              console.log(index);
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
