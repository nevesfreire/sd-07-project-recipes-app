import React, { useContext, useState } from 'react';
import RecipeContext from '../../Context/RecipeContext';

const Searcher = () => {
  const { dispatch } = useContext(RecipeContext);
  const [textFind, setTextFind] = useState('');
  const [typeFind, setTypeFind] = useState('');

  const setFilterParams = () => {
    if (typeFind === 'f' && textFind.length > 1) {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      dispatch({
        type: 'SEARCH_FILTER',
        value: textFind,
        typeSearch: typeFind,
      });
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        name="findText"
        value={ textFind }
        onChange={ (e) => setTextFind(e.target.value) }
        data-testid="search-input"
      />
      <label htmlFor="s">
        Nome
        <input
          type="radio"
          name="findBy"
          id="s"
          value="s"
          onClick={ () => setTypeFind('s') }
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
          onClick={ () => setTypeFind('f') }
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
          onClick={ () => setTypeFind('i') }
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
