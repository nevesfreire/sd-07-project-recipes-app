import React from 'react';
import PropTypes from 'prop-types';
import apiTheCocktailDB from '../services/apiTheCocktailDB';
import apiTheMealDB from '../services/apiTheMealDB';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchType: '',
      searchText: '',
      searchParam: '',
      meals: [],
      drinks: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  handleSearch({ target: { value, name } }) {
    const { searchType } = this.state;
    if (name === 'searchType') {
      switch (value) {
      case 'ingrediente':
        return this.setState({ searchType: 'filter.php?i=' });
      case 'nome':
        return this.setState({ searchType: 'search.php?s=' });
      case 'primeiraLetra':
        return this.setState({ searchType: 'search.php?f=' });
      default:
        return searchType;
      }
    }
    if (name === 'searchText') this.setState({ searchText: value });
  }

  async submitSearch() {
    const { searchType, searchText } = this.state;
    const searchParam = `${searchType}${searchText}`;
    if (searchType === 'search.php?f=' && searchText.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter.');
    }
    if (searchText && searchType) {
      await this.setState({ searchParam });
      this.callApi();
    }
  }

  async callApi() {
    const { searchParam } = this.state;
    const { search } = this.props;
    if (search === 'meals') {
      const result = await apiTheMealDB(searchParam);
      if (!result.meals) {
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      this.setState({ meals: result.meals });
    }
    if (search === 'drinks') {
      const result = await apiTheCocktailDB(searchParam);
      if (!result || !result.drinks) {
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      this.setState({ drinks: result.drinks });
    }
  }

  renderResults() {
    const { meals, drinks } = this.state;
    if (meals) {
      return (
        meals.map((item) => (
          <div key={ item.idMeal }>
            <p>{item.strMeal}</p>
            <img src={ item.strMealThumb } alt="thumbMeal" />
          </div>))
      );
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
        {this.renderResults()}
      </div>
    );
  }
}

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
};

export default SearchBar;
