import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class InProgressMeals extends React.Component {
  constructor() {
    super();
    this.state = {
      ingredientsList: [],
      ingrentsMeasuresList: [],
    };
    this.maracutaia = this.maracutaia.bind(this);
  }

  componentDidMount() {
    this.maracutaia();
  }

  maracutaia() {
    const { inProgressRecipes } = this.props;
    const ingredientsList = [];
    const ingrentsMeasuresList = [];
    Object.entries(inProgressRecipes).filter((item) => (
      item[0].includes('strIngredient') && item[1] !== '' && ingredientsList.push(item[1])
    ));
    Object.entries(inProgressRecipes).filter((item) => (
      (item[0].includes('strMeasure') && item[1] !== ' ' && item[1] !== null)
       && ingrentsMeasuresList.push(item[1])
    ));
    this.setState({ ingredientsList, ingrentsMeasuresList });
  }

  render() {
    const { inProgressRecipes } = this.props;
    const { ingredientsList, ingrentsMeasuresList } = this.state;
    return (
      <div>
        <img
          src={ inProgressRecipes.strMealThumb }
          style={ { width: '20%' } }
          data-testid="recipe-photo"
          alt="someAlt"
        />
        <h3
          data-testid="recipe-title"
        >
          {inProgressRecipes.strMeal}
        </h3>
        <p
          data-testid="recipe-category"
        >
          {inProgressRecipes.strArea}
        </p>
        { ingredientsList.map((item, index) => (
          <div
            data-testid={ `${index}-ingredient-step` }
            key={ index }
          >
            <p>
              {`${item} ${ingrentsMeasuresList[index]}`}
            </p>
          </div>
        ))}
        <span data-testid="instructions">{inProgressRecipes.strInstructions}</span>
        <button
          type="button"
          data-testid="share-btn"
        >
          Compartilhar
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favorite
        </button>
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finalizar
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ recipes: { inProgressRecipes } }) => (
  { inProgressRecipes }
);

InProgressMeals.propTypes = {
  inProgressRecipes: PropTypes.shape(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(InProgressMeals);
