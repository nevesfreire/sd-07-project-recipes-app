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

  componentWillUnmount() {
    this.renderSearchBar();
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
          style={ { background: 'none', border: 'none', marginTop: '-9px' } }
          type="button"
          onClick={ () => {
            this.setState({
              searchBar: !searchBar,
            });
          } }
        >
          <img
            style={ { background: 'none' } }
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
        <header className="header">
          <Link to="/perfil">
            <img
              style={{ marginTop: '30px' }}
              className="mt-2"
              alt="profile icon"
              data-testid="profile-top-btn"
              src={ profileIcon }
            />
          </Link>
          <h1 data-testid="page-title">
            { pageTitle }
          </h1>
          {this.renderSearchIcon()}
        </header>
        <div className="header">
          { searchBar && this.renderSearchBar() }
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  shouldRenderSearchIcon: PropTypes.string,
  search: PropTypes.string,
};

Header.defaultProps = {
  shouldRenderSearchIcon: undefined,
  search: undefined,
};

export default Header;
