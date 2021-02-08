/* eslint-disable no-alert */
import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import RecipesContext from '../context/RecipesContext';
import fetchRecipes from '../services/recipesApi';

function SearchBar(props) {
  const { setGlobalRecipes, globalRecipes } = useContext(RecipesContext);
  const [selectedOption, setSelectedOption] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { pageId } = props;
  const handleRadioInputs = ({ target: { value } }) => {
    setSelectedOption(value);
  };

  useEffect(() => {
    if (globalRecipes.meals === null || globalRecipes.drinks === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [globalRecipes]);

  useEffect(() => {
    if (selectedOption === 'byFirstLetter' && searchInput.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      setSearchInput('');
    }
  }, [selectedOption, searchInput]);

  const convertToQuery = (option, value) => {
    switch (option) {
    case 'byIngredient':
      return `filter.php?i=${value}`;
    case 'byName':
      return `search.php?s=${value}`;
    case 'byFirstLetter':
      return `search.php?f=${value}`;
    default:
      return null;
    }
  };

  return (
    <form
      style={ {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '10px',
      } }
    >
      <input
        name="searchInput"
        type="text"
        data-testid="search-input"
        value={ searchInput }
        placeholder="Buscar Receita"
        onChange={ (e) => setSearchInput(e.target.value) }
        style={ { width: '95% ', marginBottom: '8px' } }
      />
      <div
        style={ {
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        } }
      >
        <div
          style={ {
            display: 'flex',
            flexDirection: 'row',
          } }
        >
          <label htmlFor="ingredientRadio">
            <input
              name="ingredientRadio"
              value="byIngredient"
              type="radio"
              checked={ selectedOption === 'byIngredient' }
              data-testid="ingredient-search-radio"
              onChange={ (e) => handleRadioInputs(e) }
            />
            Ingrediente
          </label>
        </div>
        <div
          style={ {
            display: 'flex',
            flexDirection: 'row',
          } }
        >
          <label htmlFor="nameRadio">
            <input
              name="nameRadio"
              value="byName"
              type="radio"
              checked={ selectedOption === 'byName' }
              data-testid="name-search-radio"
              onChange={ (e) => handleRadioInputs(e) }
            />
            Nome
          </label>
        </div>
        <div
          style={ {
            display: 'flex',
            flexDirection: 'row',
          } }
        >
          <label htmlFor="firstLetterRadio">
            <input
              name="firstLetterRadio"
              value="byFirstLetter"
              type="radio"
              checked={ selectedOption === 'byFirstLetter' }
              data-testid="first-letter-search-radio"
              onChange={ (e) => handleRadioInputs(e) }
            />
            Primeira Letra
          </label>
        </div>
      </div>
      <div
        style={ {
          display: 'flex',
          flexDirection: 'row',
          marginLeft: '15px',
          width: '100%',
        } }
      >
        <Button
          variant="success"
          size="sm"
          data-testid="exec-search-btn"
          onClick={ async () => {
            const recipes = await fetchRecipes(
              pageId, convertToQuery(
                selectedOption, searchInput,
              ),
            );
            setGlobalRecipes(recipes);
          } }
        >
          Buscar
        </Button>
      </div>
    </form>

  );
}

SearchBar.propTypes = {
  pageId: PropTypes.string.isRequired,
};

export default SearchBar;
