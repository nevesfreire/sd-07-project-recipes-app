import React, { useState } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import './style.css';

function ShareButton() {
  const [shared, setShared] = useState(false);

  function sharedButton() {
    setShared(true);
    const time = 3000;
    setTimeout(() => setShared(false), time);
  }

  return (
    <div className="share-button-container">
      <button
        type="button"
        data-testid="share-btn"
        className="share-button-button"
        onClick={ () => {
          sharedButton();
          copy(window.location.href);
        } }
      >
        {(shared) && <span>Link copiado!</span>}
        <img
          src={ shareIcon }
          alt="Compartilhar"
          className="share-button-image"
        />
      </button>
    </div>
  );
}

export default ShareButton;
