import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import apiTheCocktailDB from '../services/apiTheCocktailDB';
import apiTheMealDB from '../services/apiTheMealDB';
import { sendDrinkRecipes, sendMealRecipes } from '../redux/actions';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: '',
      searchText: '',
      searchParam: '',
      meals: [],
      drinks: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.callApi = this.callApi.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  handleSearch({ target: { value, name } }) {
    const { searchType, searchText } = this.state;
    if (name === 'searchType') {
      switch (value) {
      case 'ingrediente':
        return this.setState(
          { searchType: 'filter.php?i=', searchParam: `filter.php?i=${searchText}` },
        );
      case 'nome':
        return this.setState(
          { searchType: 'search.php?s=', searchParam: `search.php?s=${searchText}` },
        );
      case 'primeiraLetra':
        return this.setState(
          { searchType: 'search.php?f=', searchParam: `search.php?f=${searchText}` },
        );
      default:
        return searchType;
      }
    }
    if (name === 'searchText') {
      this.setState({
        searchText: value,
        searchParam: `${searchType}${value}`,
      });
    }
  }

  async submitSearch() {
    const { searchType, searchText } = this.state;
    if (searchType === 'search.php?f=' && searchText.length > 1) {
      // eslint-disable-next-line no-alert
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    await this.callApi();
    this.renderResults();
  }

  async callApi() {
    const { searchParam } = this.state;
    const { search, sendMealRecipesDispatch, sendDrinkRecipesDispatch } = this.props;
    if (search === 'meals') {
      const result = await apiTheMealDB(searchParam);
      if (!result || !result.meals) {
        // eslint-disable-next-line no-alert
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      this.setState({ meals: result.meals });
      sendMealRecipesDispatch(result.meals);
    }
    if (search === 'drinks') {
      const result = await apiTheCocktailDB(searchParam);
      if (!result || !result.drinks) {
        // eslint-disable-next-line no-alert
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      this.setState({ drinks: result.drinks });
      sendDrinkRecipesDispatch(result.drinks);
    }
  }

  renderResults() {
    const { meals, drinks } = this.state;
    const { history } = this.props;
    if (meals.length === 1) {
      const { idMeal } = meals[0];
      return history.push(`/comidas/${idMeal}`);
    }

    if (drinks.length === 1) {
      const { idDrink } = drinks[0];
      return history.push(`/bebidas/${idDrink}`);
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          id="searchInput"
          data-testid="search-input"
          placeholder="Busar Receita"
          name="searchText"
          onChange={ this.handleSearch }
        />
        <label htmlFor="ingredients">
          Ingrediente
          <input
            type="radio"
            id="ingredients"
            name="searchType"
            value="ingrediente"
            onClick={ this.handleSearch }
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            type="radio"
            id="name"
            name="searchType"
            value="nome"
            onClick={ this.handleSearch }
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="firtLetter">
          Primeira letra
          <input
            type="radio"
            id="firtLetter"
            name="searchType"
            value="primeiraLetra"
            onClick={ this.handleSearch }
            data-testid="first-letter-search-radio"
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ this.submitSearch }
        >
          Buscar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendMealRecipesDispatch: (e) => dispatch(sendMealRecipes(e)),
  sendDrinkRecipesDispatch: (e) => dispatch(sendDrinkRecipes(e)),
});

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
  sendMealRecipesDispatch: PropTypes.func.isRequired,
  sendDrinkRecipesDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(SearchBar));
