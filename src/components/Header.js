import React, { Component } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../css/food.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.changeDisplayInput = this.changeDisplayInput.bind(this);
    this.state = {
      showInputSearch: false,
    };
  }

  changeDisplayInput() {
    const { showInputSearch } = this.state;
    if (showInputSearch) {
      this.setState({ showInputSearch: false });
    } else this.setState({ showInputSearch: true });
  }

  render() {
    const { history } = this.props;
    const { showInputSearch } = this.state;
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
                id="ingrediente"
                name="Filter"
                value="ingrediente"
                data-testid="ingredient-search-radio"
              />
              <label for="ingrediente">Ingrediente</label>
              <input
                type="radio"
                id="foodName"
                name="Filter"
                value="foodName"
                data-testid="name-search-radio"
              />
              <label for="foodName">Name</label>
              <input
                type="radio"
                id="firstLetterName"
                name="Filter"
                value="firstLetterName"
                data-testid="first-letter-search-radio"
              />
              <label for="firstLetterName">First Letter</label>
              <button
                type="button"
                data-testid="exec-search-btn"
                // onClick={}
              >
                Search
              </button>
            </div>
            <div className="search-food-container">
              <input
                name="searchFood"
                data-testid="search-input"
                className="search-food-input"
                placeholder="Buscar Receita"
                data-testid="search-input"
              />
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default Header;

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
