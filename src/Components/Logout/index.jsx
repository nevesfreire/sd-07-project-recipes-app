import React from 'react';

const LogoutButton = () => {
  const logout = () => console.log('saiu');

  return (
    <button
      type="button"
      className="btn-logout"
      data-testid="profile-logout-btn"
      onClick={ logout() }
    >
      Sair
    </button>
  );
};

export default LogoutButton;
