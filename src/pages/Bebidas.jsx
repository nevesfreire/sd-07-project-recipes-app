import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuInferior from '../components/MenuInferior';

function Bebidas(props) {
  const [beverageCards, setBeverageCards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [catSelected, setCatSelected] = useState();

  useEffect(() => {
    async function grabFoodItems() {
      const fetched = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((data) => data.json());
      const fetchCategories = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        .then((data) => data.json());
      const min = 0;
      const max = 5;
      const max2 = 12;
      setCategories(fetchCategories.drinks.slice(min, max));
      setBeverageCards(fetched.drinks.slice(min, max2));
    }
    if (!catSelected) {
      grabFoodItems();
    }
  }, [catSelected]);

  useEffect(() => {
    async function grabByCategory() {
      const fetchByCategory = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${catSelected}`)
        .then((data) => data.json());
      console.log('catSelected');
      const min = 0;
      const max = 12;
      setBeverageCards(fetchByCategory.drinks.slice(min, max));
    }
    console.log(catSelected);
    if (catSelected !== undefined) {
      grabByCategory();
    }
  }, [catSelected]);

  function onClick(string) {
    if (catSelected === string) {
      setCatSelected();
    } else {
      setCatSelected(string);
    }
  }
  const { history } = props;
  return (
    <div>
      <div>
        <button
          onClick={ () => onClick() }
          type="button"
          data-testid="All-category-filter"
        >
          Todas Categorias
        </button>
        {categories.map((card, index) => (
          <button
            data-testid={ `${card.strCategory}-category-filter` }
            onClick={ () => onClick(card.strCategory) }
            key={ index }
            type="button"
          >
            {card.strCategory}
          </button>
        ))}
      </div>
      <div className="gallery">
        {beverageCards.map((card, index) => (
          <div
            tabIndex="0"
            role="button"
            onClick={ () => history.push(`/bebidas/${card.idDrink}`) }
            onKeyDown={ () => console.log('a') }
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <p data-testid={ `${index}-card-name` }>{card.strDrink}</p>
            <img
              className="thumb"
              src={ card.strDrinkThumb }
              alt={ index }
              data-testid={ `${index}-card-img` }
            />
          </div>))}
      </div>
      <MenuInferior />
    </div>
  );
}

Bebidas.propTypes = {
  history: PropTypes.objectOf().isRequired,
};

export default withRouter(Bebidas);
