import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';

function Login() {
  const { } = useContext(RecipesContext);
  return (
    <div>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Nick"
          data-testid="input-player-name"
          onChange={ this.handleInputs }
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleInputs }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ buttonDisable }
          onClick={ this.startGame }
        >
          Jogar
        </button>
        <Link to="./config">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </form>
    </div>
  );
}
export default Login;
