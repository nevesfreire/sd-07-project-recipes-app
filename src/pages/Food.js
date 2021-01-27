import React, { Component } from 'react';
import profileIcon from '../images/profileIcon.svg'
import searchIcon from '../images/searchIcon.svg'
import '../css/food.css';

class Food extends Component {
  constructor(props) {
    super(props);
    this.changeDisplayInput = this.changeDisplayInput.bind(this);
  }

  changeDisplayInput() {
    const inputSearch = document.querySelector('.search-food-input');
    // console.log(inputSearch.style.display);
    if (inputSearch.style.display === 'block') {
      return inputSearch.style.display = 'none';
    }
    return inputSearch.style.display = 'block';
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <header className="header-food-container">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profileIcon"
            onClick={ () => history.push('/perfil') }
          />
          <h1 data-testid="page-title">FOOD</h1>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="searchIcon"
            onClick={ this.changeDisplayInput }
          />
        </header>
        <section>
          <div className="search-food-container">
            <input 
              name="searchFood"
              className="search-food-input"
              placeholder="Buscar Receita"
            />
          </div>
        </section>
      </div>
    );
  }
}

export default Food;
