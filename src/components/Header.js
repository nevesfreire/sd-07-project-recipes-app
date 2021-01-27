import React from 'react';

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

    </div>
  );
}

export default Header;
