import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/header/Header';
import BarraBuscaComidas from '../../components/searchbar/BarraBuscaComidas';
import Footer from '../../components/footer/Footer';
import { resultRandomFood } from '../../redux/actionsComidas';

class Comidas extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      currentCategory: undefined,
    };
    this.showCards = this.showCards.bind(this);
    this.searchCategory = this.searchCategory.bind(this);
    this.conditionalRender = this.conditionalRender.bind(this);
    this.allCategories = this.allCategories.bind(this);
    this.detailRecipe = this.detailRecipe.bind(this);
  }

  componentDidMount() {
    const { fetchRandomFood } = this.props;
    fetchRandomFood();
  }

  async searchCategory(category) {
    const { currentCategory } = this.state;
    if (currentCategory && currentCategory === category) {
      this.setState({
        currentCategory: undefined,
      });
      return;
    }

    const ZERO = 0;
    const TWELVE = 12;
    const responseAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const response = await responseAPI.json();
    const copyResponse = [...response.meals];
    const recipesResult = copyResponse.splice(ZERO, TWELVE);
    this.setState({
      recipes: recipesResult,
      currentCategory: category,
    });
  }

  detailRecipe(id) {
    const { history } = this.props;
    history.push(`/comidas/${id}`);
  }

  showCards(card) {
    return card.map((food, index) => {
      const DOZE = 12;
      if (index < DOZE) {
        return (
          <button
            type="button"
            data-testid={ `${index}-recipe-card` }
            key={ food.idMeal }
            onClick={ () => this.detailRecipe(food.idMeal) }
            className="border-card"
          >
            <img
              src={ food.strMealThumb }
              alt="recipe pic"
              data-testid={ `${index}-card-img` }
              width="50%"
            />
            <h4 data-testid={ `${index}-card-name` }>{food.strMeal}</h4>
          </button>
        );
      }
      return null; // referência: Brenda Lima;
    });
  }

  conditionalRender() {
    const { currentCategory, recipes } = this.state;
    const { toggleFood, resultApiByName, resultFood } = this.props;
    if (currentCategory) {
      return (
        this.showCards(recipes)
      );
    }
    if (toggleFood) {
      return (
        this.showCards(resultApiByName)
      );
    }
    return (
      this.showCards(resultFood)
    );
  }

  allCategories() {
    const { resultFood } = this.props;
    this.setState({
      recipes: resultFood,
    });
  }

  render() {
    const { toggle, history } = this.props;
    return (
      <div>
        <Header title="Comidas" history={ history } />
        {toggle && <BarraBuscaComidas history={ history } />}
        <button
          type="button"
          data-testid="Beef-category-filter"
          onClick={ () => this.searchCategory('Beef') }
          className="btn btn-secondary"
        >
          Beef
        </button>
        <button
          type="button"
          data-testid="Breakfast-category-filter"
          onClick={ () => this.searchCategory('Breakfast') }
          className="btn btn-secondary"
        >
          Breakfast
        </button>
        <button
          type="button"
          data-testid="Chicken-category-filter"
          onClick={ () => this.searchCategory('Chicken') }
          className="btn btn-secondary"
        >
          Chicken
        </button>
        <button
          type="button"
          data-testid="Dessert-category-filter"
          onClick={ () => this.searchCategory('Dessert') }
          className="btn btn-secondary"
        >
          Dessert
        </button>
        <button
          type="button"
          data-testid="Goat-category-filter"
          onClick={ () => this.searchCategory('Goat') }
          className="btn btn-secondary"
        >
          Goat
        </button>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => this.allCategories() }
          className="btn btn-primary"
        >
          All
        </button>
        <div>
          {this.conditionalRender()}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  toggle: state.reducerSearchBar.toggle,
  toggleFood: state.reducerSearchBar.toggleFood,
  resultFood: state.reducerComidas.recipesByRadomFood,
  resultApiByName: state.reducerComidas.recipesByName,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRandomFood: () => dispatch(resultRandomFood()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comidas);

Comidas.propTypes = {
  toggle: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  toggleFood: PropTypes.bool.isRequired,
  resultFood: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRandomFood: PropTypes.func.isRequired,
  resultApiByName: PropTypes.arrayOf(PropTypes.object).isRequired,
};
