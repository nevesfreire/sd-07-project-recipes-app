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
    const { title, searchOn, history, match } = this.props;
    const Style = { border: 0 };
    const { estilo } = this.state;
    if (searchOn === 'on') {
      return (
        <header className="row">
          <div className="col">
            <input
              className="form-control"
              style={ Style }
              type="image"
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="Imagem de perfil"
              onClick={ () => history.push('/perfil') }
            />
          </div>
          <div className="col">
            <h3 data-testid="page-title">{title}</h3>
          </div>
          <div className="col">
            <input
              style={ Style }
              className="form-control"
              type="image"
              data-testid="search-top-btn"
              onClick={ () => this.handleClick() }
              src={ searchIcon }
              alt="Buscar"
            />
          </div>
          {
            estilo === 'visible'
              ? <Searchbar match={ match } />
              : <Categories match={ match } />
          }
        </header>
      );
    }
    return (
      <header className="col">
        <div className="row">
          <input
            type="image"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Imagem de perfil"
            onClick={ () => history.push('/perfil') }
          />
          <div className="col">
            <h3 className="text-center" data-testid="page-title">{title}</h3>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  match: PropTypes.objectOf().isRequired,
  title: PropTypes.string.isRequired,
  searchOn: PropTypes.string.isRequired,
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

export default Header;
