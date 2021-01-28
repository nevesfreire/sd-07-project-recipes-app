import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchBar: false,
    };

    this.renderSearchBar = this.renderSearchBar.bind(this);
    this.renderSearchIcon = this.renderSearchIcon.bind(this);
  }

  renderSearchBar() {
    const { search } = this.props;
    return (
      <SearchBar search={ search } />
    );
  }

  renderSearchIcon() {
    const { shouldRenderSearchIcon } = this.props;
    const { searchBar } = this.state;
    if (shouldRenderSearchIcon === 'yes') {
      return (
        <button
          type="button"
          onClick={ () => {
            this.setState({
              searchBar: !searchBar,
            });
          } }
        >
          <img
            alt="search icon"
            data-testid="search-top-btn"
            src={ searchIcon }
          />
        </button>
      );
    }
  }

  render() {
    const { pageTitle } = this.props;
    const { searchBar } = this.state;
    return (
      <div>
        <header>
          <Link to="/perfil" replace>
            <button
              type="button"
            >
              <img
                alt="profile icon"
                data-testid="profile-top-btn"
                src={ profileIcon }
              />
            </button>
          </Link>
          <h1 data-testid="page-title">
            { pageTitle }
          </h1>
          {this.renderSearchIcon()}
          { searchBar && this.renderSearchBar() }
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  shouldRenderSearchIcon: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};

export default Header;
