import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';
import { fetchingFoods } from '../../services/mandaFoods';
import '../../App.css';

export default function SearchBar() {
  const { inputValues, setInputValues, setMeals } = useContext(RecipesContext);

  const handleInputRadio = ({ target: { value } }) => {
    setInputValues({ ...inputValues, radio: value });
  };

  const handleChangeInput = ({ target: { value } }) => {
    setInputValues({ ...inputValues, input: value });
  };

  const teste = () => {
    fetchingFoods(inputValues.radio, inputValues.input).then(setMeals);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar Receita"
        data-testid="search-input"
        onChange={ handleChangeInput }
      />
      <label htmlFor="ingrediente">
        <input
          type="radio"
          name="search"
          value="Ingrediente"
          id="1"
          data-testid="ingredient-search-radio"
          onClick={ handleInputRadio }
        />
        Ingrediente
      </label>

      <label htmlFor="nome">
        <input
          type="radio"
          name="search"
          value="Nome"
          id="2"
          data-testid="name-search-radio"
          onClick={ handleInputRadio }
        />
        Nome
      </label>

      <label htmlFor="PrimeiraLetra">
        <input
          type="radio"
          name="search"
          value="PrimeiraLetra"
          id="3"
          data-testid="first-letter-search-radio"
          onClick={ handleInputRadio }
        />
        Primeira Letra
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ teste }
      >
        Buscar
      </button>
    </div>
  );
}
