import React, { Component } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Searchbar from './searchbar';
import Categories from './categories';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      estilo: 'hidden',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { estilo } = this.state;
    if (estilo === 'hidden') {
      this.setState({
        estilo: 'visible',
      });
    } else {
      this.setState({
        estilo: 'hidden',
      });
    }
  }

  render() {
    const { title, searchOn, history } = this.props;
    const { estilo } = this.state;
    if (searchOn === 'on') {
      return (
        <header>
          <input
            type="image"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Imagem de perfil"
            onClick={ () => history.push('/perfil') }
          />
          <h3 data-testid="page-title">{title}</h3>
          <input
            type="image"
            data-testid="search-top-btn"
            onClick={ () => this.handleClick() }
            src={ searchIcon }
            alt="Buscar"
          />
          { estilo === 'visible' ? <Searchbar /> : <Categories /> }
        </header>
      );
    }
    return (
      <header>
        <input
          type="image"
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Imagem de perfil"
          onClick={ () => history.push('/perfil') }
        />
        <h3 data-testid="page-title">{title}</h3>
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchOn: PropTypes.string.isRequired,
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

export default Header;
