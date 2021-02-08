import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { fetchAPIFoodsSurprise, fetchAPIDrinksSurprise } from '../services/api';

function ExplorerButtons() {
  const [idFood, setIdFood] = useState('');
  const [idDrink, setIdDrink] = useState('');
  const [render, setRender] = useState();
  const path = useHistory().location.pathname;
  const urlFoods = '/explorar/comidas';

  const getIdFoodsAndDrinks = async () => {
    const food = await fetchAPIFoodsSurprise();
    const drink = await fetchAPIDrinksSurprise();
    setIdFood(food[0].idMeal);
    setIdDrink(drink[0].idDrink);
  };

  useEffect(() => {
    getIdFoodsAndDrinks();

    if (path === urlFoods) {
      setRender(true);
    } else {
      setRender(false);
    }
  }, []);

  return (
    <div className="profile-buttons">
      <Link to={ path === urlFoods ? `${path}/ingredientes` : `${path}/ingredientes` }>
        <button
          data-testid="explore-by-ingredient"
          type="button"
          className="btn btn-sm color-button"
          style={ { width: '22rem' } }
        >
          Por Ingredientes
        </button>
      </Link>
      {render ? (
        <Link to={ `${path}/area` }>
          <button
            data-testid="explore-by-area"
            type="button"
            className="btn btn-sm color-button"
            style={ { width: '22rem' } }
          >
            Por Local de Origem
          </button>
        </Link>
      ) : (
        <span />
      )}
      <Link
        to={ path === urlFoods ? `/comidas/${idFood}` : `/bebidas/${idDrink}` }
        onClick={ () => console.log('hi') }
      >
        <button
          data-testid="explore-surprise"
          type="button"
          className="btn btn-sm color-button"
          style={ { width: '22rem' } }
        >
          Me Surpreenda!
        </button>
      </Link>
    </div>
  );
}

export default ExplorerButtons;
