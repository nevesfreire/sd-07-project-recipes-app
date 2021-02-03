import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../context/GlobalContext';

function SearchHeader() {
  const [dataFiltered, setDataFiltered] = useState([]);
  const [type, setType] = useState('nome');
  const {
    data,
    upSearchBar,
    setUpSearchBar,
    selectedTypeFood,
    // selectedTypeDrink,
  } = useContext(
    GlobalContext,
  );
  useEffect(() => {
    selectedTypeFood(type);
  }, [selectedTypeFood, type]);
  useEffect(() => {
    const maxNumbCard = 12;
    if (data) setDataFiltered(data.filter((food, index) => index < maxNumbCard));
  }, [data]);
  const handleClick = () => {
    if (type === 'letra' && type.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    return selectedTypeFood(type);
  };
  const handleChange = (e) => setType(e.target.value);
  return (
    <form>
      <div>
        <input
          name="input"
          placeholder="Buscar receita"
          type="text"
          data-testid="search-input"
          value={ upSearchBar }
          onChange={ ({ target }) => setUpSearchBar(target.value) }
        />
        {console.log(setUpSearchBar)}
      </div>
      <div>
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
      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Buscar
        </button>
        {dataFiltered.map((food) => (
          <>
            <h3>{food.strMeal}</h3>
            <img
              src={ food.strMealThumb }
              width="50"
              alt={ `${food.strMeal} thumb` }
            />
          </>
        ))}
      </div>
    </form>
  );
}
export default SearchHeader;
