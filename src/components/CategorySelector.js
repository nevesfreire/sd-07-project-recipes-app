import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Row, Button } from 'react-bootstrap';
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
    const { mealRecipes, drinkRecipes, location: { pathname } } = this.props;
    if (mealRecipes.length === magicZero && pathname === '/comidas') {
      await this.updateItems('All');
    }
    if (drinkRecipes.length === magicZero && pathname === '/bebidas') {
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
    // const { currentCategory } = this.state;
    const maxCategories = 5;
    const firstCategory = 0;

    categories = categories.slice(firstCategory, maxCategories);

    return (
      <div className="categories">
        <Row style={ { margin: 30 } }>
          <Button
            className="mr-1 mb-1"
            variant="warning"
            key="all"
            type="button"
            data-testid="All-category-filter"
            onClick={ () => this.selectCategory('All') }
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              className="mr-1 mb-1"
              variant="warning"
              key={ category.strCategory }
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => this.selectCategory(category.strCategory) }
            >
              {category.strCategory}
            </Button>
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
const mapStateToProps = ({ recipes: { mealRecipes, drinkRecipes } }) => (
  { mealRecipes, drinkRecipes }
);
CategorySelector.propTypes = {
  search: PropTypes.string.isRequired,
  sendMealRecipesDispatch: PropTypes.func.isRequired,
  sendDrinkRecipesDispatch: PropTypes.func.isRequired,
  mealRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  drinkRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategorySelector));
