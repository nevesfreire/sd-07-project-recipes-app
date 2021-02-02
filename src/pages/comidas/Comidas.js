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
      loading: false,
    };
    this.showCards = this.showCards.bind(this);
    this.searchCategory = this.searchCategory.bind(this);
  }

  componentDidMount() {
    const { fetchRandomFood } = this.props;
    fetchRandomFood();
  }

  async searchCategory(category) {
    this.setState({
      loading: true,
    }, async () => {
      const ZERO = 0;
      const TWELVE = 12;
      const responseAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const response = await responseAPI.json();
      const copyResponse = [...response.meals];
      const recipes = copyResponse.splice(ZERO, TWELVE);
      this.setState({
        recipes,
        loading: false,
      });
    });
  }

  showCards(card) {
    return card.map((food, index) => {
      const DOZE = 12;
      if (index < DOZE) {
        return (
          <div data-testid={ `${index}-recipe-card` } key={ food.idMeal }>
            <img
              src={ food.strMealThumb }
              alt="recipe pic"
              data-testid={ `${index}-card-img` }
              width="50%"
            />
            <h4 data-testid={ `${index}-card-name` }>{food.strMeal}</h4>
          </div>
        );
      }
      return null; // referência: Brenda Lima;
    });
  }

  render() {
    const {
      toggle,
      history,
      toggleFood,
      resultApiByName,
      resultFood } = this.props;
    const { recipes, loading } = this.state;
    console.log(recipes);
    return (
      <div>
        <Header title="Comidas" history={ history } />
        {toggle && <BarraBuscaComidas history={ history } />}
        <button
          type="button"
          data-testid="Beef-category-filter"
          onClick={ () => this.searchCategory('Beef') }
        >
          Beef
        </button>
        <button
          type="button"
          data-testid="Breakfast-category-filter"
          onClick={ () => this.searchCategory('Breakfast') }
        >
          Breakfast
        </button>
        <button
          type="button"
          data-testid="Chicken-category-filter"
          onClick={ () => this.searchCategory('Chicken') }
        >
          Chicken
        </button>
        <button
          type="button"
          data-testid="Dessert-category-filter"
          onClick={ () => this.searchCategory('Dessert') }
        >
          Dessert
        </button>
        <button
          type="button"
          data-testid="Goat-category-filter"
          onClick={ () => this.searchCategory('Goat') }
        >
          Goat
        </button>
        {loading ? 'Loading' : this.showCards(recipes)}
        {toggleFood && !loading
          ? this.showCards(resultApiByName) : this.showCards(resultFood)}
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
