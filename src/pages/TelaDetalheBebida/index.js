import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { RecomendationCard } from '../../components';

class TelaDetalheBebida extends Component {

  handleIngredients(drink) {
    const drinkArray = Object.entries(drink[0]);
    const ingredientsArray = drinkArray.filter((element) => (
      (element[0].startsWith('strIngredient')
        && element[1])));
    return ingredientsArray;
  }

  handleMeasure(drink) {
    const drinkArray = Object.entries(drink[0]);
    const measuresArray = drinkArray.filter((element) => (
      (element[0].startsWith('strMeasure')
        && element[1])));
    return measuresArray;
  }

  renderDetails(drink) {
    const ingredientsArray = this.handleIngredients(drink);
    const measuresArray = this.handleMeasure(drink);

    return (
      <div>
        <img data-testid="recipe-photo" alt="bebida" src={ drink[0].strDrinkThumb } />
        <h3 data-testid="recipe-title">{drink[0].strDrink}</h3>
        <img data-testid="share-btn" alt="share-btn" src={ shareIcon } />
        <img
          data-testid="favorite-btn"
          alt="favorite-btn"
          src={ whiteHeartIcon }
        />
        <h4 data-testid="recipe-category">{drink[0].strCategory}</h4>
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
          <p data-testid="instructions">recipe-instructions-from-props</p>
        </div>
        <RecomendationCard data-testid="0-recomendation-card" />
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
});

TelaDetalheBebida.propTypes = {
  drinkDetailStore: PropTypes.arrayOf(PropTypes.Object).isRequired,
};

export default connect(mapStateToProps, null)(TelaDetalheBebida);
