import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ShareIcon from '../../images/shareIcon.svg';
import copyLink from '../../services/clipBoard';

export default function ShareButton({ path, id }) {
  const [showCopied, setShowCopied] = useState(false);

  const shareLink = () => {
    const { length } = path;
    const zero = 0;
    const one = 1;
    const type = path.substring(zero, length - one);
    copyLink(id, type);
    setShowCopied(true);
  };

  return (
    <div className="recipe-buttons">
      <button type="button">
        <img
          onClick={ shareLink }
          role="presentation"
          data-testid="share-btn"
          src={ ShareIcon }
          alt="share"
        />
      </button>
      { !showCopied || <p>Link copiado!</p>}
    </div>
  );
}

ShareButton.propTypes = {
  path: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
