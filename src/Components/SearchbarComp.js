import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../providers/Context/Context';
import { DrinkContext } from '../providers/DrinkProvider';
import Cards from './Cards';

const SearchBarComp = ({ context }) => {
  const history = useHistory();
  const whichContext = context === 'Comidas' ? RecipesContext : DrinkContext;
  const whichId = context === 'Comidas' ? 'idMeal' : 'idDrink';
  const { searchWithFilter, setInputText, setRadioType, data } = useContext(
    whichContext,
  );

  useEffect(() => {
    if (data && data.length === 1) {
      history.push(`/${context.toLowerCase()}/${data[0][whichId]}`);
    }
  }, [data, history, whichId, context]);

  const renderCards = () => {
    const maximo = 12;
    const tweelveCards = data.filter((card, index) => index < maximo);
    return tweelveCards.map((card, index) => (
      <Cards key={ index } index={ index } context={ context } card={ card } />
    ));
  };

  const inputSearch = () => searchWithFilter();

  const valid = 0;
  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ ({ target }) => {
          setInputText(target.value);
        } }
      />
      <div>
        <label htmlFor="Ingredient">
          <input
            type="radio"
            id="Ingredient"
            name="elementsForSearch"
            value="Ingrediente"
            data-testid="ingredient-search-radio"
            onClick={ () => {
              setRadioType('Ingrediente');
            } }
          />
          Ingrediente
        </label>
        <label htmlFor="Nome">
          <input
            type="radio"
            id="Nome"
            name="elementsForSearch"
            value="Nome"
            data-testid="name-search-radio"
            onClick={ () => {
              setRadioType('Nome');
            } }
          />
          Nome
        </label>
        <label htmlFor="firtLetter">
          <input
            type="radio"
            id="firtLetter"
            name="elementsForSearch"
            value="Primeira letra"
            data-testid="first-letter-search-radio"
            onClick={ () => {
              setRadioType('firtLetter');
            } }
          />
          Primeira letra
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => {
          inputSearch();
        } }
      >
        Buscar
      </button>
      {data && data.length > valid && renderCards()}
    </div>
  );
};

SearchBarComp.propTypes = {
  context: PropTypes.string.isRequired,
};

export default SearchBarComp;
