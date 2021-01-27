import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

class MainRecipes extends React.Component {
  render() {
    return (
      <div>
        <h1>Tela Principal de Receitas!</h1>
        <Link to="/perfil">
          <img src={ profileIcon } alt="Foto Perfil" />
        </Link>
      </div>
    );
  }
}

export default MainRecipes;
