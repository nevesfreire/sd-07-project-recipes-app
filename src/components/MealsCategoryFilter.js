import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/recipe.css';

class MealsCategoryFilter extends Component {
  render() {
    const { getCategories } = this.props;
    const MEALS_LENGTH = 5;
    const filterArray = getCategories.meals
      .filter((_meal, index) => index < MEALS_LENGTH);
    return (
      <div className="category-button-container">
        {filterArray.map((meal) => (
          <button
            type="button"
            key={ meal.strCategory }
            data-testid={ `${meal.strCategory}-category-filter` }
          >
            { meal.strCategory }
          </button>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  getCategories: categories.categories,
});

export default connect(mapStateToProps)(MealsCategoryFilter);

MealsCategoryFilter.propTypes = {
  getCategories: PropTypes.shape({
    meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
