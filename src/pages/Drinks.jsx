import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CustomCardDrink, CustomCartegory, CustomFooter } from '../components';
import CustomHeader from '../components/CustomHeader';
import {
  listRecipes, requestRecipes,
} from '../redux/actions';
import { getDrinkRecipes, getAllDrinksCategories } from '../services';

class Drinks extends Component {
  constructor() {
    super();
    this.handleRecipes = this.handleRecipes.bind(this);
    this.redirectToRecipeDetail = this.redirectToRecipeDetail.bind(this);
    this.renderAlertError = this.renderAlertError.bind(this);
    this.renderRecipes = this.renderRecipes.bind(this);
    this.handleCategories = this.handleCategories.bind(this);
    this.state = {
      drinksCategories: [],
    };
  }

  componentDidMount() {
    const { dispatchDrinksRecipes, currentCategoryDrink } = this.props;
    if (currentCategoryDrink === 'all') {
      dispatchDrinksRecipes({});
    } else {
      const ingredientsObj = {
        searchInput: currentCategoryDrink,
        searchRadio: 'i',
      };
      dispatchDrinksRecipes(ingredientsObj);
    }
    this.handleCategories();
  }

  async handleCategories() {
    const { drinks } = await getAllDrinksCategories();
    if (drinks) {
      this.setState({
        drinksCategories: Object.values(drinks),
      });
    }
  }

  handleRecipes() {
    const { drinks, isFetching } = this.props;
    const numberToComper = 1;
    if (drinks && drinks.length === numberToComper) {
      return <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />;
    }
    if (drinks && !drinks.length && !isFetching) return this.renderAlertError();
    if (drinks && drinks.length === 1) return this.redirectToRecipeDetail();
    return this.renderRecipes();
  }

  redirectToRecipeDetail() {
    const { drinks } = this.props;
    return <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />;
  }

  renderAlertError() {
    const { dispatchUpdateDrinkIsFetching } = this.props;
    dispatchUpdateDrinkIsFetching();
    return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  renderRecipes() {
    const { drinks } = this.props;
    if (drinks) {
      const LENGTH = 12;
      const INITIAL_LENGTH = 0;
      const MAX_LENGTH = (drinks.length > LENGTH) ? LENGTH : drinks.length;
      return (
        <div>
          { drinks.slice(INITIAL_LENGTH, MAX_LENGTH)
            .map((drink, index) => (
              <CustomCardDrink key={ drink.idDrink } index={ index } drink={ drink } />))}
        </div>
      );
    }
  }

  renderCategories() {
    const { dispatchDrinksRecipes } = this.props;
    const { drinksCategories } = this.state;
    const MAX_LENGTH = 5;
    const INITIAL_LENGTH = 0;
    if (drinksCategories !== undefined) {
      return (
        <div>
          <button
            data-testid="All-category-filter"
            type="button"
            onClick={ () => dispatchDrinksRecipes({}) }
          >
            All
          </button>
          { drinksCategories.slice(INITIAL_LENGTH, MAX_LENGTH)
            .map((category, index) => (
              <CustomCartegory
                key={ index }
                index={ index }
                category={ category }
                title="Bebidas"
              />))}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <CustomHeader title="Bebidas" />
        { this.renderCategories()}
        { this.handleRecipes()}
        <CustomFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.recipesReducer.isFetching,
  drinks: state.recipesReducer.recipes,
  currentCategoryDrink: state.recipesReducer.currentCategory,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDrinksRecipes: (searchHeader) => dispatch(getDrinkRecipes(searchHeader)),
  dispatchInitialCards: (JSONRequestAllCategories) => {
    dispatch(listRecipes(JSONRequestAllCategories));
  },
  dispatchUpdateDrinkIsFetching: () => dispatch(requestRecipes()),
});

Drinks.propTypes = {
  dispatchUpdateDrinkIsFetching: PropTypes.func.isRequired,
  dispatchDrinksRecipes: PropTypes.func.isRequired,
  currentCategoryDrink: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  drinks: PropTypes.shape({
    length: PropTypes.number.isRequired,
    slice: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
