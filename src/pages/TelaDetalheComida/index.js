import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { RecomendationCardMeal } from '../../components';
import {
  getSpecificMealById,
  getRecommendatedMeals,
} from '../../store/ducks/getDetailedMeal/actions';

class TelaDetalheComida extends Component {
  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { getDetailedMealDispatch, getRecommendationMeals } = this.props;
    await getRecommendationMeals();
    await getDetailedMealDispatch(id);
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

  renderDetails(meal) {
    const ingredientsArray = this.handleIngredients(meal);
    const measuresArray = this.handleMeasure(meal);
    const six = 6;
    const { mealsRecommendStore } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
    };
    return (
      <>
        <img
          data-testid="recipe-photo"
          alt="comida"
          src={ meal[0].strMealThumb }
        />
        <h3 data-testid="recipe-title">{meal[0].strMeal}</h3>
        <img data-testid="share-btn" alt="share-btn" src={ shareIcon } />
        <img
          data-testid="favorite-btn"
          alt="favorite-btn"
          src={ whiteHeartIcon }
        />
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
          {mealsRecommendStore.map((element, index) => {
            if (index < six) {
              return (
                <RecomendationCardMeal
                  key={ element }
                  data-testid={ `${index}-recomendation-card` }
                  mealRecommended={ element }
                  mealIndex={ index }
                />
              );
            }
            return null;
          })}
        </Slider>
        <button data-testid="start-recipe-btn" type="button">
          Click on me
        </button>
      </>
    );
  }

  render() {
    const { meal } = this.props;
    if (meal) {
      return this.renderDetails(meal);
    }
    return <div>teste</div>;
  }
}

TelaDetalheComida.propTypes = {
  meal: PropTypes.arrayOf(PropTypes.Object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getDetailedMealDispatch: PropTypes.func.isRequired,
  mealsRecommendStore: PropTypes.arrayOf(PropTypes.Object).isRequired,
  getRecommendationMeals: PropTypes.arrayOf(PropTypes.Object).isRequired,
};

const mapStateToProps = (state) => ({
  meal: state.detalhesDaReceitaComida.meal.meals,
  mealsRecommendStore: state.detalhesDaReceitaComida.mealRecommend.meals,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailedMealDispatch: (id) => dispatch(getSpecificMealById(id)),
  getRecommendationMeals: () => dispatch(getRecommendatedMeals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TelaDetalheComida);
