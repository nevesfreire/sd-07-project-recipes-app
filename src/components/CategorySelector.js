import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { apiTheMealDB, apiTheCocktailDB } from '../services';
import { sendDrinkRecipes, sendMealRecipes } from '../redux/actions';

class CategorySelector extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      currentCategory: 'All',
    };
  }

  async componentDidMount() {
    const magicZero = 0;
    const { mealRecipes } = this.props;
    if (mealRecipes.length === magicZero) {
      await this.updateItems('All');
    }
    await this.getCategories();
  }

  async getCategories() {
    const apiSearchPath = 'list.php?c=list';
    let api;
    const { search } = this.props;

    if (search === 'drinks') {
      api = apiTheCocktailDB;
    } else {
      api = apiTheMealDB;
    }

    const result = await api(apiSearchPath);

    this.setState({ categories: result[search] });
  }

  async updateItems(currentCategory) {
    let apiSearchPath;
    if (currentCategory === 'All') {
      apiSearchPath = 'search.php?s=';
    } else {
      apiSearchPath = `filter.php?c=${currentCategory}`;
    }

    let api;
    let dispatchFunc;
    const { search, sendMealRecipesDispatch, sendDrinkRecipesDispatch } = this.props;

    if (search === 'drinks') {
      api = apiTheCocktailDB;
      dispatchFunc = sendDrinkRecipesDispatch;
    } else {
      api = apiTheMealDB;
      dispatchFunc = sendMealRecipesDispatch;
    }

    const result = await api(apiSearchPath);

    dispatchFunc(result[search]);
  }

  selectCategory(categoryName) {
    const { currentCategory } = this.state;
    let nextCategory = categoryName;
    if (currentCategory === categoryName) {
      nextCategory = 'All';
    }

    this.setState({ currentCategory: nextCategory });

    this.updateItems(nextCategory);
  }

  render() {
    let { categories } = this.state;
    const { currentCategory } = this.state;

    const maxCategories = 5;
    const firstCategory = 0;

    categories = categories.slice(firstCategory, maxCategories);

    return (
      <div className="categories">
        <Row style={ { margin: 30 } }>
          <button
            className={ (currentCategory === 'All' ? 'current' : '') }
            key="all"
            type="button"
            data-testid="All-category-filter"
            onClick={ () => this.selectCategory('All') }
          >
            All
          </button>
          {categories.map((category) => (
            <button
              className={ (currentCategory === category.strCategory ? 'current' : '') }
              key={ category.strCategory }
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => this.selectCategory(category.strCategory) }
            >
              {category.strCategory}
            </button>
          ))}
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendMealRecipesDispatch: (e) => dispatch(sendMealRecipes(e)),
  sendDrinkRecipesDispatch: (e) => dispatch(sendDrinkRecipes(e)),
});
const mapStateToProps = ({ recipes: { mealRecipes } }) => (
  { mealRecipes }
);
CategorySelector.propTypes = {
  search: PropTypes.string.isRequired,
  sendMealRecipesDispatch: PropTypes.func.isRequired,
  sendDrinkRecipesDispatch: PropTypes.func.isRequired,
  mealRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelector);
