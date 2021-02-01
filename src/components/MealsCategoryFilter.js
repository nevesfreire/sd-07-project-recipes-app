import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCategories, setCategory } from '../actions';
import '../css/food.css';

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
    // setar a categoria no estado
    // pra ser filtrado no MealRecepies
    const category = event.target.value;
    // const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    selectCategory(category);
    // getRecipesByCategory(URL);
    // console.log(event.target.value);
    // seta uma variavel para para deixar botoes disable
    // se clicar nele novamete vai voltar ao filter normal
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
              value={ meal.strCategory }
              data-testid={ `${meal.strCategory}-category-filter` }
              onClick={ this.handleClick }
            >
              { meal.strCategory }
            </button>
          ))}
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
  getCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectCategory: PropTypes.func.isRequired,
};
