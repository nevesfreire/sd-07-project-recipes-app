import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from '../components/SearchBar';

class MainRecipes extends React.Component {
  render() {
    return (
      <div>
        <SearchBar search="meals" />
        <h1>Tela Principal de Receitas!</h1>
        <Link to="/perfil">
          <img src={ profileIcon } alt="Foto Perfil" />
        </Link>
        <Footer />
      </div>
    );
  }
}

export default MainRecipes;
