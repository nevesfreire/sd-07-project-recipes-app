import React, { useState } from 'react';

function HeaderSearchBar() {
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

  const getApiData = (e) => {
    if (inputValue.length > 1 && radioButtonValue === 'primeiraLetra') {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      return console.log('Busca na API');
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
        onClick={ (e) => getApiData(e) }
      >
        Buscar
      </button>
    </div>
  );
}

export default HeaderSearchBar;
