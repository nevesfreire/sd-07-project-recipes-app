import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
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
    };
    this.handleSearch = this.handleSearch.bind(this);
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
    const { searchParam, searchType, searchText } = this.state;
    const { search, sendMealRecipesDispatch, sendDrinkRecipesDispatch } = this.props;
    if (searchType === 'search.php?f=' && searchText.length > 1) {
      // eslint-disable-next-line no-alert
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (search === 'meals') {
      const result = await apiTheMealDB(searchParam);
      if (!result || !result.meals) {
        // eslint-disable-next-line no-alert
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      // this.setState({ meals: result.meals });
      sendMealRecipesDispatch(result.meals);
    }
    if (search === 'drinks') {
      const result = await apiTheCocktailDB(searchParam);
      if (!result || !result.drinks) {
        // eslint-disable-next-line no-alert
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      // this.setState({ drinks: result.drinks });
      sendDrinkRecipesDispatch(result.drinks);
    }
  }

  render() {
    return (
      <div>
        <Row>
          <input
            style={ { borderRadius: '5px', border: '1px solid rgb(224,224,224)' } }
            type="text"
            id="searchInput"
            data-testid="search-input"
            placeholder="Busar Receita"
            name="searchText"
            onChange={ this.handleSearch }
          />
          <Button
            className="ml-1"
            variant="danger"
            type="button"
            data-testid="exec-search-btn"
            onClick={ this.submitSearch }
          >
            Buscar
          </Button>
        </Row>
        <Row>
          <Row className="mr-4">
            <label htmlFor="ingredients">
              <input
                className="mr-1"
                type="radio"
                id="ingredients"
                name="searchType"
                value="ingrediente"
                onClick={ this.handleSearch }
                data-testid="ingredient-search-radio"
              />
              Ingrediente
            </label>
          </Row>
          <Row className="mr-4">
            <label htmlFor="name">
              <input
                className="mr-1"
                type="radio"
                id="name"
                name="searchType"
                value="nome"
                onClick={ this.handleSearch }
                data-testid="name-search-radio"
              />
              Nome
            </label>
          </Row>
          <Row className="mr-3">
            <label htmlFor="firtLetter">
              <input
                className="mr-1"
                type="radio"
                id="firtLetter"
                name="searchType"
                value="primeiraLetra"
                onClick={ this.handleSearch }
                data-testid="first-letter-search-radio"
              />
              Primeira letra
            </label>
          </Row>
        </Row>
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
};

export default connect(null, mapDispatchToProps)(SearchBar);
