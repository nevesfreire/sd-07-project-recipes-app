import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { RecomendationCard } from '../../components';
import { getSpecificMealById } from '../../store/ducks/getDetailedMeal/actions';

class TelaDetalheComida extends Component {
  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { getDetailedMealDispatch } = this.props;
    await getDetailedMealDispatch(id);
  }

  handleIngredients(meal) {
    const drinkArray = Object.entries(meal[0]);
    const ingredientsArray = drinkArray.filter((element) => (
      (element[0].startsWith('strIngredient')
        && element[1])));
    return ingredientsArray;
  }

  handleMeasure(meal) {
    const drinkArray = Object.entries(meal[0]);
    const measuresArray = drinkArray.filter((element) => (
      (element[0].startsWith('strMeasure')
        && element[1])));
    return measuresArray;
  }

  renderDetails(meal) {
    const ingredientsArray = this.handleIngredients(meal);
    const measuresArray = this.handleMeasure(meal);
    console.log(this.props);

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
};

const mapStateToProps = (state) => ({
  meal: state.detalhesDaReceitaComida.meal.meals,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailedMealDispatch: (id) => dispatch(getSpecificMealById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TelaDetalheComida);
