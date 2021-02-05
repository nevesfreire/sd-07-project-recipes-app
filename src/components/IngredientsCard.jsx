import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import { fetchAPIFoodsIngredient, fetchAPIDrinksIngredient } from '../services/api';

function IngredientsCard() {
  const {
    foodsIngredientsList,
    drinksIngredientsList,
    setFoodsOrDrinksList,
    setIsUse,
  } = useContext(RecipesContext);
  const path = useHistory().location.pathname;
  const [list, setList] = useState([]);
  const urlFoods = '/explorar/comidas/ingredientes';
  const zero = 0;
  const maxMeals = 12;

  useEffect(() => {
    if (path === urlFoods) {
      setList(foodsIngredientsList);
    } else {
      setList(drinksIngredientsList);
    }
    setIsUse(true);
  }, [foodsIngredientsList, drinksIngredientsList]);

  async function redirectMainScreen(nameFood, nameDrink) {
    if (path === urlFoods) {
      const ingredientFoods = await fetchAPIFoodsIngredient(nameFood);
      setFoodsOrDrinksList(ingredientFoods);
    } else {
      const ingredientDrinks = await fetchAPIDrinksIngredient(nameDrink);
      setFoodsOrDrinksList(ingredientDrinks);
    }
  }

  function renderPaths(drink, food) {
    if (path !== urlFoods) return drink;
    return food;
  }

  return (
    <div className="row" style={ { width: '23.4rem' } }>
      {list !== undefined ? (
        list.map((item, index) => (
          <Link
            to={ path === urlFoods ? '/comidas/' : '/bebidas' }
            onClick={ () => redirectMainScreen(item.strIngredient, item.strIngredient1) }
            key={ renderPaths(item.strIngredient1, item.strIngredient) }
            className="card col-6"
            style={ { width: '8rem' } }
          >
            <div
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                className="card-img-top"
                src={ path === urlFoods
                  ? `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png`
                  : `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
                alt="Imagem de capa do card"
              />
              <div className="card-body">
                <p
                  data-testid={ `${index}-card-name` }
                  className="card-text"
                >
                  { renderPaths(item.strIngredient1, item.strIngredient) }
                </p>
              </div>
            </div>
          </Link>
        )).slice(zero, maxMeals)
      ) : (
        []
      )}
    </div>
  );
}

export default IngredientsCard;
