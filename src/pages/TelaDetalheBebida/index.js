import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { RecomendationCardDrink } from '../../components';
import {
  getSpecificDrinkById,
  getRecommendatedDrinks,
} from '../../store/ducks/getDetailedDrink/actions';

class TelaDetalheBebida extends Component {
  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { getDetailedDrinkDispatch, getRecommendationDrinks } = this.props;
    await getRecommendationDrinks();
    await getDetailedDrinkDispatch(id);
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
    const { drinksRecommendStore } = this.props;
    const six = 6;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
    };

    return (
      <div>
        <img
          data-testid="recipe-photo"
          alt="bebida"
          src={ drink[0].strDrinkThumb }
        />
        <h3 data-testid="recipe-title">{drink[0].strDrink}</h3>
        <img data-testid="share-btn" alt="share-btn" src={ shareIcon } />
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
          {drinksRecommendStore.map((element, index) => {
            if (index < six) {
              return (<RecomendationCardDrink
                key={ element }
                drinkRecommended={ element }
                drinkIndex={ index }
              />);
            } return null;
          })}
        </Slider>
        <button data-testid="start-recipe-btn" type="button">
          Click on me
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
  drinksRecommendStore: state.detalhesDaReceitaBebida.drinkRecommend.drinks,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailedDrinkDispatch: (id) => dispatch(getSpecificDrinkById(id)),
  getRecommendationDrinks: () => dispatch(getRecommendatedDrinks()),
});

TelaDetalheBebida.propTypes = {
  drinkDetailStore: PropTypes.arrayOf(PropTypes.Object).isRequired,
  getDetailedDrinkDispatch: PropTypes.func.isRequired,
  drinksRecommendStore: PropTypes.arrayOf(PropTypes.Object).isRequired,
  getRecommendationDrinks: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TelaDetalheBebida);
