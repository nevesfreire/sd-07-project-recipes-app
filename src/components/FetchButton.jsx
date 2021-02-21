import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import context from '../contextApi/context';
import useSendRequestBtn from '../hooks/useSendRequestBtn';

function FetchButton({ textInput }) {
  const [setGetEvent] = useSendRequestBtn();
  const { search } = useContext(context);
  const { change } = search;
  const focusRef = () => {
    setGetEvent(Math.random());
    textInput.current.focus();
  };

  return change ? (
    <div className="search-container">
      <Button
        data-testid="exec-search-btn"
        color="primary"
        variant="contained"
        onClick={ () => focusRef() }
      >
        Buscar
      </Button>
    </div>
  ) : null;
}

export default FetchButton;
