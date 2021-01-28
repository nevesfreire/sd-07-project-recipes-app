import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { sendSearchInput, fetchRecipes } from '../actions';
import '../css/food.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.changeDisplayInput = this.changeDisplayInput.bind(this);
    this.alertFilter = this.alertFilter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEndPoint = this.handleEndPoint.bind(this);
    this.state = {
      showInputSearch: false,
      searchInput: '',
      filterRadioButton: '',
      endPoint: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.handleEndPoint());
  }

  handleEndPoint() {
    const { searchInput, filterRadioButton } = this.state;
    // const { requestRecipes } = this.props
    if (filterRadioButton === 'ingredient') {
      this.setState({
        endPoint: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`,
      });
    } else if (filterRadioButton === 'foodName') {
      this.setState({
        endPoint: `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`,
      });
    } else if (filterRadioButton === 'firstLetterName') {
      this.setState({
        endPoint: `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`,
      });
    }
  }

  alertFilter() {
    const { searchInput, filterRadioButton } = this.state;
    console.log(searchInput.length);
    if (filterRadioButton === 'firstLetterName' && searchInput.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter'); // eslint-disable-line no-alert
    }
  }

  changeDisplayInput() {
    const { showInputSearch } = this.state;
    if (showInputSearch) {
      this.setState({ showInputSearch: false });
    } else this.setState({ showInputSearch: true });
  }

  render() {
    const { history, catchSearchValue, title, requestRecipes } = this.props;
    const { showInputSearch, searchInput, endPoint } = this.state;
    // console.log(history);
    return (
      <div>
        <header className="header-food-container">
          <button
            type="button"
            data-testid="profile-top-btn"
            onClick={ () => history.push('/perfil') }
          >
            <img src={ profileIcon } alt="profileIcon" />
          </button>

          <h1 data-testid="page-title">{title}</h1>
          <button
            type="button"
            data-testid="search-top-btn"
            onClick={ this.changeDisplayInput }
          >
            <img src={ searchIcon } alt="searchIcon" />
          </button>
        </header>
        {showInputSearch && (
          <section>
            <div>
              <label htmlFor="ingredient">
                Ingrediente
                <input
                  type="radio"
                  id="ingredient"
                  name="filterRadioButton"
                  value="ingredient"
                  data-testid="ingredient-search-radio"
                  onClick={ this.handleChange }
                />
              </label>
              <label htmlFor="foodName">
                Nome
                <input
                  type="radio"
                  id="foodName"
                  name="filterRadioButton"
                  value="foodName"
                  data-testid="name-search-radio"
                  onClick={ this.handleChange }
                />
              </label>
              <label htmlFor="firstLetterName">
                Primeira letra
                <input
                  type="radio"
                  id="firstLetterName"
                  name="filterRadioButton"
                  value="firstLetterName"
                  data-testid="first-letter-search-radio"
                  onClick={ this.handleChange }
                />
              </label>
              <button
                type="button"
                data-testid="exec-search-btn"
                onClick={ () => {
                  catchSearchValue(searchInput);
                  this.alertFilter();
                  // this.handleEndPoint();
                  requestRecipes(endPoint);
                } }
              >
                Buscar
              </button>
            </div>
            <div className="search-food-container">
              <input
                name="searchInput"
                data-testid="search-input"
                className="search-food-input"
                placeholder="Buscar Receita"
                value={ searchInput }
                onChange={ this.handleChange }
              />
            </div>
          </section>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  catchSearchValue: (value) => dispatch(sendSearchInput(value)),
  requestRecipes: (endPoint) => dispatch(fetchRecipes(endPoint)),
});

export default connect(null, mapDispatchToProps)(Header);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  catchSearchValue: PropTypes.func.isRequired,
  requestRecipes: PropTypes.func.isRequired,
};
