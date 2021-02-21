import React, { useContext } from 'react';
// import { Input } from '@material-ui/core';
import context from '../contextApi/context';

const InputSenha = () => {
  const { setPassword } = useContext(context);
  return (
    <div className="input-senha">
      <input
        data-testid="password-input"
        type="password"
        placeholder="Sua senha aqui."
        onChange={ (e) => setPassword(e.target.value) }
      />
    </div>
  );
};

export default InputSenha;
