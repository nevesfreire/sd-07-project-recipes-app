import React, { useContext, useState } from 'react';
import RecipeContext from '../../Context/RecipeContext';

const Searcher = () => {
  const initState = {
    findText: '',
    findBy: '',
  };

  const { dispatch } = useContext(RecipeContext);

  const [searcher, setSearcher] = useState(initState);

  const handleSearch = ({ target }) => {
    const { name, value } = target;

    setSearcher({ ...searcher, [name]: value });
  };

  const setFilterParams = () => {
    if (searcher.findBy === 'f' && searcher.findText.length > 1) {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      dispatch({
        type: 'SEARCH_FILTER',
        value: searcher.findText,
        typeSearch: searcher.findBy,
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        name="findText"
        value={ searcher.findText }
        onChange={ handleSearch }
        data-testid="search-input"
      />
      <label htmlFor="s">
        Nome
        <input
          type="radio"
          name="findBy"
          id="s"
          value="s"
          onClick={ handleSearch }
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="f">
        Primeira Letra
        <input
          type="radio"
          name="findBy"
          id="f"
          value="f"
          onClick={ handleSearch }
          data-testid="first-letter-search-radio"
        />
      </label>
      <label htmlFor="i">
        Ingrediente
        <input
          type="radio"
          name="findBy"
          id="i"
          value="i"
          onClick={ handleSearch }
          data-testid="ingredient-search-radio"
        />
      </label>
      <button type="button" data-testid="exec-search-btn" onClick={ setFilterParams }>
        Pesquisar
      </button>
    </div>
  );
};

export default Searcher;
