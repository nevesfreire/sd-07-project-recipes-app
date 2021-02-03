import React, { useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import './style.css';

function ShareButton({ testId, id, type }) {
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
        className="share-button-button"
        onClick={ () => {
          sharedButton();
          copy(`${window.location.origin}/${type}s/${id}`);
        } }
      >
        {(shared) && <span>Link copiado!</span>}
        <img
          data-testid={ (testId ? `${testId}share-btn` : 'share-btn') }
          src={ shareIcon }
          alt="Compartilhar"
          className="share-button-image"
        />
      </button>
    </div>
  );
}

ShareButton.propTypes = {
  testId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ShareButton;
