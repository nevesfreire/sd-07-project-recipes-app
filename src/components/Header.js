import React from 'react';
import SearchHeaderBar from './SearchHeaderBar';

function Header() {
  return (
    <div>
      <button
        type="button"
        data-testid="profile-top-btn"
        id="profileBtn"
      >
        Profile
      </button>

      <h1 data-testid="page-title">Header</h1>

      <button
        type="button"
        data-testid="search-top-btn"
        id="searchBtn"
      >
        Search
      </button>
      <SearchHeaderBar />

    </div>
  );
}

export default Header;
