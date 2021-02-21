import React, { useContext } from 'react';
// import { Input } from '@material-ui/core';
import context from '../contextApi/context';

const InputEmail = () => {
  const { setEmail } = useContext(context);
  return (
    <div className="input-email">
      <input
        data-testid="email-input"
        type="email"
        placeholder="email@email.com"
        onChange={ (e) => setEmail(e.target.value) }
      />
    </div>
  );
};

export default InputEmail;
