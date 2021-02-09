import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import './style/searchHeader.css';

function SearchHeader() {
  const { pathname } = useLocation();
  const [type, setType] = useState('nome');
  const {
    upSearchBar,
    setUpSearchBar,
    selectedTypeFood,
    selectedTypeDrink,
  } = useContext(
    GlobalContext,
  );

  const handleClick = () => {
    console.log(upSearchBar);
    if (type === 'firstLetter' && upSearchBar.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (pathname === '/comidas') {
      return selectedTypeFood(type);
    }
    return selectedTypeDrink(type);
  };
  const handleChange = (e) => setType(e.target.value);

  return (
    <form className="search-header-container">
      <div>
        <input
          className="search-header-search-bar"
          name="input"
          placeholder="Buscar receita"
          type="text"
          data-testid="search-input"
          value={ upSearchBar }
          onChange={ ({ target }) => setUpSearchBar(target.value) }
        />

        <button
          className="search-header-search-btn"
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Buscar
        </button>
      </div>
      <div className="search-header-radio-btn-container">
        <label htmlFor="ingredients">
          <input
            name="input"
            value="ingredients"
            id="ingredients"
            type="radio"
            data-testid="ingredient-search-radio"
            checked={ type === 'ingredients' }
            onChange={ handleChange }
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            name="input"
            value="name"
            id="name"
            type="radio"
            data-testid="name-search-radio"
            checked={ type === 'name' }
            onChange={ handleChange }
          />
          Nome
        </label>
        <label htmlFor="firstLetter">
          <input
            name="input"
            value="firstLetter"
            id="firstLetter"
            type="radio"
            data-testid="first-letter-search-radio"
            checked={ type === 'firstLetter' }
            onChange={ handleChange }
          />
          Primeira letra
        </label>
      </div>
    </form>
  );
}
export default SearchHeader;
