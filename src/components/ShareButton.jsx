import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Button, CopiedMSG } from './Contructors';
import { shareIcon } from '../images';

export default function ShareButton({ URL }) {
  const [copied, setState] = useState(false);
  const treeSecond = 3000;
  return (
    <>
      { copied && (<CopiedMSG />)}
      <Button
        testid="share-btn"
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
