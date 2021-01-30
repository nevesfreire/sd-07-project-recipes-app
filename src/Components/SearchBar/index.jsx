import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  getAPIFoodIngredients,
  getAPIFoodFilterFirstLetter,
  getAPIFoodName } from '../../API/apiMeals';
import {
  getAPIIngredientsDrinks,
  getAPINameDrinks,
  getAPIFilterFirstLetterDrinks,
} from '../../API/apiCocktails';
import RecipeContext from '../../Context/RecipeContext';

function SearchBar(props) {
  const [searchText, setText] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const { dispatch } = useContext(RecipeContext);
  const { name } = props;

  // const { state: { search: { searchText } } } = useContext(RecipeContext);
  // const { state: { data } } = useContext(RecipeContext);
  const firstLetter = 'primeira-letra';
  const handleSearchFood = () => {
    if (radioValue === 'ingredientes' && searchText !== '') {
      return getAPIFoodIngredients(searchText);
    }
    if (radioValue === 'nome' && searchText !== '') {
      return getAPIFoodName(searchText);
    }
    if (radioValue === firstLetter && searchText.length === 1) {
      return getAPIFoodFilterFirstLetter(searchText);
    }
    if (radioValue === firstLetter) {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const handleSearchDrinks = () => {
    if (radioValue === 'ingredientes' && searchText !== '') {
      return getAPIIngredientsDrinks(searchText);
    }
    if (radioValue === 'nome' && searchText !== '') {
      return getAPINameDrinks(searchText);
    }
    if (radioValue === firstLetter && searchText.length === 1) {
      return getAPIFilterFirstLetterDrinks(searchText);
    }
    if (radioValue === firstLetter) {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const handleSearchOnClick = async () => {
    if (name === 'Comidas' && await handleSearchFood() !== undefined) {
      const response = await handleSearchFood();
      dispatch({ type: 'SET_MEALS', data: response });
    } else if (await handleSearchDrinks() !== undefined) {
      const response = await handleSearchDrinks();
      dispatch({ type: 'SET_COCKTAILS', data: response });
    }
  };

  const handleChangeInput = ({ target }) => {
    setText(target.value);
    //  dispatch({ type: 'SEARCH_TEXT', searchText: target.value });
  };

  const handleChangeRadio = ({ target }) => {
    setRadioValue(target.value);
  };

  return (
    <div>
      <div>
        <input
          data-testid="search-input"
          type="text"
          placeholder="Buscar Receita"
          onBlur={ handleChangeInput }
        />
        <label htmlFor="radioIngrediente">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            value="ingredientes"
            onChange={ handleChangeRadio }
          />
          Ingrediente
        </label>
        <label htmlFor="radioNome">
          <input
            type="radio"
            data-testid="name-search-radio"
            onChange={ handleChangeRadio }
            value="nome"
          />
          Nome
        </label>
        <label htmlFor="radioLetra">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            value="primeira-letra"
            onChange={ handleChangeRadio }
          />
          Primeira Letra
        </label>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ handleSearchOnClick }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SearchBar;
