import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeAppContext from '../../context/index';

function HeaderSearchBar(props) {
  const {
    searchButtonAPIRequest,
    setSearchTerm,
    setRadioButton,
    setSearchType,
  } = useContext(RecipeAppContext);

  const history = useHistory();

  useEffect(() => {
    const { headerText } = props;
    if (headerText === 'Comidas') {
      setSearchType('Comidas');
    }
    if (headerText === 'Bebidas') {
      setSearchType('Bebidas');
    }
  }, [setSearchType, props]);

  const handleClick = async () => {
    const { headerText } = props;
    const data = await searchButtonAPIRequest();
    if (headerText === 'Comidas' && data.meals.length === 1) {
      const id = data.meals[0].idMeal;
      history.push(`/comidas/${id}`);
    }
    if (headerText === 'Bebidas' && data.drinks.length === 1) {
      const id = data.drinks[0].idDrink;
      history.push(`/bebidas/${id}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ ({ target }) => setSearchTerm(target.value) }
      />
      <br />
      <label htmlFor="ingredient">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
          value="ingredient"
          placeholder="Ingrediente"
          name="radio-buttons"
          onChange={ ({ target }) => setRadioButton(target.value) }
        />
        Ingrediente
      </label>
      <br />
      <label htmlFor="name">
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name"
          placeholder="Nome"
          value="name"
          name="radio-buttons"
          onChange={ ({ target }) => setRadioButton(target.value) }
        />
        Nome
      </label>
      <br />
      <label htmlFor="first-letter">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter"
          placeholder="Primeira letra"
          value="first-letter"
          name="radio-buttons"
          onChange={ ({ target }) => setRadioButton(target.value) }
        />
        Primeira letra
      </label>
      <br />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </div>

  );
}

export default HeaderSearchBar;

HeaderSearchBar.propTypes = {
  headerText: PropTypes.string.isRequired,
};
