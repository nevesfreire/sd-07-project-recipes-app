import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { RecomendationCard } from '../../components';
import { getSpecificMealById } from '../../store/ducks/getDetailedMeal/actions';

class TelaDetalheComida extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleIngredients = this.handleIngredients.bind(this);
    this.handleMeasure = this.handleMeasure.bind(this);
  }

  handleIngredients(meal) {
    const mealArray = Object.entries(meal);
    const ingredientsArray = [];
    for (let i = 0; i < mealArray.length; i += 1) {
      if (mealArray[i][0].startsWith('strIngredient') && mealArray[i][1] !== '') {
        ingredientsArray.push(mealArray[i]);
      }
    }
    return ingredientsArray;
  }

  handleMeasure(meal) {
    const mealArray = Object.entries(meal);
    const measuresArray = [];
    for (let i = 0; i < mealArray.length; i += 1) {
      if (mealArray[i][0].startsWith('strMeasure') && mealArray[i][1] !== '') {
        measuresArray.push(mealArray[i]);
      }
    }
    return measuresArray;
  }

  render() {
    const { meal } = this.props;
    console.log(meal);
    const ingredientsArray = this.handleIngredients(meal[0]);
    const measuresArray = this.handleMeasure(meal[0]);

    return (
      <>
        <img data-testid="recipe-photo" alt="comida" src={ meal[0].strMealThumb } />
        <h3 data-testid="recipe-title">{ meal.strMeal }</h3>
        <img data-testid="share-btn" alt="share-btn" src={ shareIcon } />
        <img data-testid="favorite-btn" alt="favorite-btn" src={ whiteHeartIcon } />
        <h4 data-testid="recipe-category">{ meal.strCategory }</h4>
        <div>
          <h4>Ingredients</h4>
          <ul>
            {
              ingredientsArray.map((item, index) => (
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ item }
                >
                  {`${item[1]} - ${measuresArray[index][1]}`}
                </li>
              ))
            }
          </ul>
        </div>
        <div>
          <h4>Instructions</h4>
          <p data-testid="instructions">{ meal.strInstructions }</p>
        </div>
        <div data-testid="video">{ meal.strYoutube }</div>
        <RecomendationCard data-testid="0-recomendation-card" />
        <button data-testid="start-recipe-btn" type="button">
          Click on me
        </button>
      </>
    );
  }
}

TelaDetalheComida.propTypes = {
  meal: PropTypes.objectOf(PropTypes.string).isRequired,
  getDetailedMealDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  meal: state.detalhesDaReceitaComida.meal.meals,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailedMealDispatch: (id) => dispatch(getSpecificMealById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TelaDetalheComida);
