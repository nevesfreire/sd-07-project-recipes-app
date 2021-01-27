import React from 'react';
import SearchBar from '../components/SearchBar';

class MainRecipes extends React.Component {
  render() {
    return (
      <div>
        <SearchBar search="meals" />
        <h1>Tela Principal de Receitas!</h1>
      </div>
    );
  }
}

export default MainRecipes;
