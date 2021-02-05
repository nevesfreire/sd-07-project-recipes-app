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
    if (data === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (headerText === 'Comidas' && data.length === 1) {
      const id = data[0].idMeal;
      history.push(`/comidas/${id}`);
    } else if (headerText === 'Bebidas' && data.length === 1) {
      const id = data[0].idDrink;
      history.push(`/bebidas/${id}`);
    }
  };

  return (
    <div className="header-search-bar">
      <div className="container-serch">
        <input
          type="text"
          className="search-input"
          data-testid="search-input"
          onChange={ ({ target }) => setSearchTerm(target.value) }
        />
        <button
          type="button"
          className="search-btn"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Buscar
        </button>
      </div>
      <div className="header-radio">
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
      </div>
    </div>

  );
}

export default HeaderSearchBar;

HeaderSearchBar.propTypes = {
  headerText: PropTypes.string.isRequired,
};
