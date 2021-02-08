import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

function ListCardsItens(cardsFoods) {
  const history = useHistory();
  const path = history.location.pathname;
  const titleArray = path.split('/');
  const pathPage = titleArray[2];

  const { data, setData } = useContext(RecipeContext);
  const MAX_ARRAY = 12;
  if (cardsFoods.length > MAX_ARRAY) cardsFoods.length = MAX_ARRAY;

  function foodCardsItens() {
    return !Array.isArray(cardsFoods) ? []
      : cardsFoods.map((item, index) => (
        <Link
          key={ item.idIngredient }
          to="/comidas"
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => setData({ ...data, ingredient: item.strIngredient }) }
        >
          <img
            style={ { width: '30%' } }
            src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
            alt={ item.strIngredient }
            data-testid={ `${index}-card-img` }
          />
          <h5
            data-testid={ `${index}-card-name` }
          >
            {item.strIngredient}
          </h5>
        </Link>
      ));
  }

  function drinkCardsItens() {
    return cardsFoods.map((item, index) => (
      <Link
        key={ index }
        to="/bebidas"
        data-testid={ `${index}-ingredient-card` }
        onClick={ () => setData({ ...data, ingredient: item.strIngredient1 }) }
      >
        <img
          style={ { width: '30%' } }
          src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
          alt={ item.strIngredient1 }
          data-testid={ `${index}-card-img` }
        />
        <h5
          data-testid={ `${index}-card-name` }
        >
          {item.strIngredient1}
        </h5>
      </Link>
    ));
  }

  return (
    <div>
      {(pathPage === 'comidas') ? foodCardsItens() : drinkCardsItens()}
    </div>
  );
}

export default ListCardsItens;
