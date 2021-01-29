import React, { useState, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function HeaderSearchBar() {
  const {
    pathName,
    fetchByIngredients,
    fetchByName,
    fetchByFirstLetter,
  } = useContext(RecipesContext);
  const [radioButtonValue, setRadioButtonValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const searchByText = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };

  const getRadioValue = (e) => {
    setRadioButtonValue(e.target.value);
    console.log(radioButtonValue);
  };
  const getApiData = () => {
    console.log(pathName);
    if (inputValue.length > 1 && radioButtonValue === 'primeiraLetra') {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      switch (radioButtonValue) {
      case 'ingrediente':
        fetchByIngredients(inputValue);
        break;
      case 'nome':
        fetchByName(inputValue);
        break;

      default:
        fetchByFirstLetter(inputValue);
        break;
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        id="searchInput"
        placeholder="Buscar Receita"
        data-testid="search-input"
        name="searchText"
        onChange={ (e) => searchByText(e) }
      />
      <div>
        <label htmlFor="ingredients">
          <input
            type="radio"
            id="ingredients"
            name="searchType"
            value="ingrediente"
            data-testid="ingredient-search-radio"
            onChange={ (e) => getRadioValue(e) }
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            name="searchType"
            value="nome"
            data-testid="name-search-radio"
            onChange={ (e) => getRadioValue(e) }
          />
          Nome
        </label>
        <label htmlFor="firstLetter">
          <input
            type="radio"
            if="firstLetter"
            name="searchType"
            value="primeiraLetra"
            data-testid="first-letter-search-radio"
            onChange={ (e) => getRadioValue(e) }
          />
          Primeira Letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => getApiData() }
      >
        Buscar
      </button>
    </div>
  );
}

export default HeaderSearchBar;
