import React, { useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { Button, CopiedMSG } from './Contructors';
import { shareIcon } from '../images';

export default function ShareButton({ URL, 'data-testid': testid }) {
  const [copied, setState] = useState(false);
  const treeSecond = 3000;
  return (
    <>
      { copied && (<CopiedMSG />)}
      <Button
        testid={ testid }
        icon={ shareIcon }
        func={ () => {
          copy(URL);
          setState(true);
          setTimeout(() => {
            setState(false);
          }, treeSecond);
        } }
      />
    </>
  );
}

ShareButton.defaultProps = {
  'data-testid': '',
};

ShareButton.propTypes = {
  URL: PropTypes.string.isRequired,
  'data-testid': PropTypes.string,
};
