import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import shareIcon from '../../images/shareIcon.svg';

function ShareButton() {
  const [smShow, setSmShow] = useState(false);

  const history = useHistory();
  const path = history.location.pathname;
  const zero = 0;
  const catorze = 14;
  const quinze = 15;
  const vinteSeis = 26;

  const copyLink = () => {
    if (path.length <= quinze) {
      copy(`http://localhost:3000${path}`);
    } else if (path.length === vinteSeis) {
      const newPath = path.substring(zero, catorze);
      console.log(newPath);
      copy(`http://localhost:3000${newPath}`);
    } else {
      const newPath = path.substring(zero, quinze);
      copy(`http://localhost:3000${newPath}`);
    }
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
