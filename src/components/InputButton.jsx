import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import context from '../contextApi/context';
import useRedirect from '../hooks/useRedirect';

function InputButton() {
  const [setPath] = useRedirect();
  const { disabled } = useContext(context);

  const PATH = '/comidas';
  const handleClick = () => setPath(PATH);

  return (
    <div className="input-button">
      <Button
        type="button"
        data-testid="login-submit-btn"
        variant="contained"
        color="primary"
        disabled={ disabled }
        onClick={ handleClick }
      >
        Entrar
      </Button>
    </div>
  );
}

export default InputButton;
