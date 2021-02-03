import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCategories, setCategory } from '../actions';
import '../css/recipe.css';

class MealsCategoryFilter extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { requestCategories, endPoint } = this.props;
    requestCategories(endPoint);
  }

  handleClick(event) {
    const { selectCategory } = this.props;
    const category = event.target.value;
    selectCategory(category);
  }

  render() {
    const { getCategories } = this.props;
    const MEALS_LENGTH = 5;

    if (getCategories.meals) {
      const filterArray = getCategories.meals
        .filter((_meal, index) => index < MEALS_LENGTH);
      return (
        <div className="category-button-container">
          {filterArray.map((meal) => (
            <button
              type="button"
              key={ meal.strCategory }
              value={ meal.strCategory }
              data-testid={ `${meal.strCategory}-category-filter` }
              onClick={ this.handleClick }
            >
              { meal.strCategory }
            </button>
          ))}
          <button
            type="button"
            value="All"
            onClick={ this.handleClick }
            data-testid="All-category-filter"
          >
            All
          </button>
        </div>
      );
    }
    return (
      <div />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestCategories: (endPoint) => dispatch(fetchCategories(endPoint)),
  selectCategory: (category) => dispatch(setCategory(category)),
});

const mapStateToProps = ({ categoriesReducer }) => ({
  getCategories: categoriesReducer.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(MealsCategoryFilter);

MealsCategoryFilter.propTypes = {
  endPoint: PropTypes.string.isRequired,
  requestCategories: PropTypes.func.isRequired,
  selectCategory: PropTypes.func.isRequired,
  getCategories: PropTypes.shape({
    meals: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
