<<<<<<< HEAD
import React from 'react';
import SearchBar from '../../components/SearchBar';

class RecipesPrincipalScreen extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
=======
import React, { Component } from 'react';
import { HeaderS } from '../../components';

class TelaPrincipalReceitasComidas extends Component {
  render() {
    const title = 'Comidas';
    return (
      <div>
        <HeaderS title={ title } />
>>>>>>> 9377cce30b0885da3044cf40103827911c71c9f6
      </div>
    );
  }
}

<<<<<<< HEAD
export default RecipesPrincipalScreen;
=======
export default TelaPrincipalReceitasComidas;
>>>>>>> 9377cce30b0885da3044cf40103827911c71c9f6
