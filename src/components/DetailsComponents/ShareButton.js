import React from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';

function ShareButton() {
  const history = useHistory();
  const path = history.location.pathname;

  const handleShareBtn = ({ target }) => {
    console.log(target);
    target.addEventListener('click', () => {
      copy(path);
    });
    alert('Link copiado!');
  };

  return (
    <button
      type="button"
      data-testid="share-btn"
      onClick={ (e) => handleShareBtn(e) }
    >
      <img
        src={ shareIcon }
        alt="Share Icon"
      />
    </button>
  );
}

export default ShareButton;
