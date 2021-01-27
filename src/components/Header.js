import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

// eslint-disable-next-line max-lines-per-function
function Header(props) {
  const { title, profileButton, searchButton } = props;

  const renderProfileTopBtn = () => (
    <div>
      { profileButton
        ? (
          <Link to="/perfil">
            <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
          </Link>
        )
        : null }
    </div>
  );

  const renderPageTitle = () => (
    <div>
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );

  const renderSearchTopBtn = () => (
    <div>
      { searchButton
        ? (
          <div>
            <button type="button" onClick={ (e) => showHeaderSerchBar(e) }>
              <img
                src={ searchIcon }
                alt="searchIcon"
                data-testid="search-top-btn"
              />
            </button>
          </div>
        )
        : null }
    </div>
  );

  const showHeaderSerchBar = (event) => {
    event.target
  }

  const render = () => (
    <div>
      {renderProfileTopBtn()}
      {renderPageTitle()}
      {renderSearchTopBtn()}
    </div>
  );

  return render();
}

const mapStateToProps = (state) => ({
  siteMap: state.sitemap,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
