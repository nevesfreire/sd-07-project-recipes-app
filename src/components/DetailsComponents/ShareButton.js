import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import shareIcon from '../../images/shareIcon.svg';

function ShareButton() {
  const [smShow, setSmShow] = useState(false);

  const history = useHistory();
  const path = history.location.pathname;

  const copyLink = () => {
    copy(`http://localhost:3000${path}`);
  };

  const handleShareBtn = () => {
    copyLink();
    setSmShow(true);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShareBtn }
      >
        <img
          src={ shareIcon }
          alt="Share Icon"
        />
      </button>
      <Modal
        size="sm"
        show={ smShow }
        onHide={ () => setSmShow(false) }
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Link copiado!
          </Modal.Title>
        </Modal.Header>
      </Modal>
    </div>
  );
}

export default ShareButton;
