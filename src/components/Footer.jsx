import React from 'react';

function Footer() {
  return (
    <footer data-testid="footer">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
      >
        Bebidas
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
      >
        Explorar
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
      >
        Comidas
      </button>
    </footer>
  );
}

export default Footer;
