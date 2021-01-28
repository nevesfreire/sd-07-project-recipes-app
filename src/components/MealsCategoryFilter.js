import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCategories } from '../actions';
import '../css/food.css';

class MealsCategoryFilter extends Component {
  componentDidMount() {
    const { requestCategories, endPoint } = this.props;
    requestCategories(endPoint);
  }

  render() {
    const { getCategories } = this.props;
    const MEALS_LENGTH = 5;

    if (getCategories.meals) {
      const filterArray = getCategories.meals
        .filter((_meal, index) => index < MEALS_LENGTH);
      return (
        <div>
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
    return (
      <div>
        Loading...
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestCategories: (endPoint) => dispatch(fetchCategories(endPoint)),
});

const mapStateToProps = ({ categories }) => ({
  getCategories: categories.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(MealsCategoryFilter);

MealsCategoryFilter.propTypes = {
  endPoint: PropTypes.string.isRequired,
  requestCategories: PropTypes.func.isRequired,
  getCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
};
