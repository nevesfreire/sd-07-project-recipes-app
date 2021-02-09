import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';

export default function IngredientsDrinks() {
  const contextGlobal = useContext(GlobalContext);
  const { setTitle, setSearchByingredient, redirect } = contextGlobal;
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsImg, setIngredientsImg] = useState([]);

  const mountImage = (array) => {
    const path = 'https://www.thecocktaildb.com/images/ingredients/';
    const correctIngredientsNames = array.map((item) => item);
    const correctPaths = correctIngredientsNames
      .map((item) => `${path}${item}-Small.png`);
    setIngredientsImg(correctPaths);
  };

  const fetchIngredients = async () => {
    const path = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const response = await fetch(path);
    const result = await response.json();
    const numberOfCards = 12;
    const zero = 0;
    const listOfIngredients = [];
    for (let index = zero; index < numberOfCards; index += 1) {
      listOfIngredients.push(result.drinks[index].strIngredient1);
    }
    setIngredients(listOfIngredients);
    mountImage(listOfIngredients);
  };

  useEffect(() => {
    setTitle('Tela de explorar bebidas por ingredientes');
    fetchIngredients();
  }, []);

  return (
    <div className="ingredient-container">
      {ingredients.map((item, index) => (
        <button
          key={ index }
          type="button"
          onClick={ (event) => {
            setSearchByingredient(event.target.id);
            redirect('/bebidas');
          } }
          className="ingredient-btn"
        >
          <div
            className="ingredient-card"
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              src={ ingredientsImg[index] }
              alt={ item }
              data-testid={ `${index}-card-img` }
              id={ item }
            />
            <p
              data-testid={ `${index}-card-name` }
              className="ingredient-name"
            >
              { item }
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
