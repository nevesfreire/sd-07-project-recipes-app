import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/header/Header';
import BarraBuscaBebidas from '../../components/searchbar/BarraBuscaBebidas';
import Footer from '../../components/footer/Footer';
import { resultRandomDrink } from '../../redux/actionsBebidas';

class Bebidas extends React.Component {
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
    const { fetchRandomDrink } = this.props;
    fetchRandomDrink();
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
    const responseAPI = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const response = await responseAPI.json();
    const copyResponse = [...response.drinks];
    const recipes = copyResponse.splice(ZERO, TWELVE);
    this.setState({
      recipes,
      currentCategory: category,
    });
  }

  detailRecipe(id) {
    const { history } = this.props;
    history.push(`bebidas/${id}`);
  }

  showCards(cards) {
    return cards.map((drink, index) => {
      const DOZE = 12;
      if (index < DOZE) {
        return (
          <button
            type="button"
            data-testid={ `${index}-recipe-card` }
            key={ drink.idDrink }
            onClick={ () => this.detailRecipe(drink.idDrink) }
            className="border-card"
          >
            <img
              src={ drink.strDrinkThumb }
              alt="recipe pic"
              data-testid={ `${index}-card-img` }
              width="50%"
            />
            <h4 data-testid={ `${index}-card-name` }>{drink.strDrink}</h4>
          </button>
        );
      }
      return null; // referência: Brenda Lima;
    });
  }

  conditionalRender() {
    const { currentCategory, recipes } = this.state;
    const { toggleDrink, resultApiByName, resultDrink } = this.props;
    if (currentCategory) {
      return (
        this.showCards(recipes)
      );
    }
    if (toggleDrink) {
      return (
        this.showCards(resultApiByName)
      );
    }
    return (
      this.showCards(resultDrink)
    );
  }

  allCategories() {
    const { resultDrink } = this.props;
    this.setState({
      recipes: resultDrink,
    });
  }

  render() {
    const { toggle, history } = this.props;
    return (
      <div>
        <Header title="Bebidas" history={ history } />
        {toggle && <BarraBuscaBebidas history={ history } />}
        <button
          type="button"
          data-testid="Ordinary Drink-category-filter"
          onClick={ () => this.searchCategory('Ordinary Drink') }
          className="btn btn-secondary"
        >
          Ordinary Drink
        </button>
        <button
          type="button"
          data-testid="Cocktail-category-filter"
          onClick={ () => this.searchCategory('Cocktail') }
          className="btn btn-secondary"
        >
          Cocktail
        </button>
        <button
          type="button"
          data-testid="Milk / Float / Shake-category-filter"
          onClick={ () => this.searchCategory('Milk / Float / Shake') }
          className="btn btn-secondary"
        >
          Milk / Float / Shake
        </button>
        <button
          type="button"
          data-testid="Other/Unknown-category-filter"
          onClick={ () => this.searchCategory('Other/Unknown') }
          className="btn btn-secondary"
        >
          Other/Unknown
        </button>
        <button
          type="button"
          data-testid="Cocoa-category-filter"
          onClick={ () => this.searchCategory('Cocoa') }
          className="btn btn-secondary"
        >
          Cocoa
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
  toggleDrink: state.reducerSearchBar.toggleDrink,
  resultDrink: state.reducerBebidas.recipesByRadomBebida,
  resultApiByName: state.reducerBebidas.recipesByNameBebida,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRandomDrink: () => dispatch(resultRandomDrink()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bebidas);

Bebidas.propTypes = {
  toggle: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  toggleDrink: PropTypes.bool.isRequired,
  resultDrink: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRandomDrink: PropTypes.func.isRequired,
  resultApiByName: PropTypes.arrayOf(PropTypes.object).isRequired,
};
