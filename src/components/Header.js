import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { sendSearchInput } from '../actions';
import '../css/food.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.changeDisplayInput = this.changeDisplayInput.bind(this);
    this.alertFilter = this.alertFilter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      showInputSearch: false,
      searchInput: '',
      filterRadioButton: '',
    };
  }

  changeDisplayInput() {
    const { showInputSearch } = this.state;
    if (showInputSearch) {
      this.setState({ showInputSearch: false });
    } else this.setState({ showInputSearch: true });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  alertFilter() {
    const {searchInput, filterRadioButton} =  this.state;
    console.log(searchInput.length);
    if (filterRadioButton === 'firstLetterName' && searchInput.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter')
    }
  }

  render() {
    const { history, catchSearchValue } = this.props;
    const { showInputSearch, searchInput } = this.state;
    console.log(history);
    return (
      <div>
        <header className="header-food-container">
          <button
            type="button"
            data-testid="profile-top-btn"
            onClick={() => history.push('/perfil')}
          >
            <img src={profileIcon} alt="profileIcon" />
          </button>

          <h1 data-testid="page-title">Comidas</h1>
          <button
            type="button"
            data-testid="search-top-btn"
            onClick={this.changeDisplayInput}
          >
            <img src={searchIcon} alt="searchIcon" />
          </button>
        </header>
        {showInputSearch && (
          <section>
            <div>
              <input
                type="radio"
                id="ingredient"
                name="filterRadioButton"
                value="ingredient"
                data-testid="ingredient-search-radio"
                onClick={this.handleChange}
              />
              <label for="ingredient">Ingrediente</label>
              <input
                type="radio"
                id="foodName"
                name="filterRadioButton"
                value="foodName"
                data-testid="name-search-radio"
                onClick={this.handleChange}
              />
              <label for="foodName">Nome</label>
              <input
                type="radio"
                id="firstLetterName"
                name="filterRadioButton"
                value="firstLetterName"
                data-testid="first-letter-search-radio"
                onClick={this.handleChange}
              />
              <label for="firstLetterName">Primeira letra</label>
              <button
                type="button"
                data-testid="exec-search-btn"
                onClick={() => {
                  catchSearchValue(searchInput);
                  this.alertFilter();
                }}
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
                value={searchInput}
                onChange={this.handleChange}
              />
            </div>
          </section>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  catchSearchValue: (value) => dispatch(sendSearchInput(value))
})

export default connect(null, mapDispatchToProps)(Header);

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
