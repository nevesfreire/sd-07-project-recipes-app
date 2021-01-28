import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchDrinkDetailById } from '../services/drinkApiFunctions';

function DrinksDetails() {
  const {
    drinkDetail,
    setDrinkDetail,
  } = useContext(RecipesContext);

  const fetchDrinksDetails = async () => {
    const details = await fetchDrinkDetailById(178319);
    setDrinkDetail(details.drinks[0]);
  };

  useEffect(() => {
    fetchDrinksDetails();
  }, []);

  return (
    <div>
      {console.log(drinkDetail.idDrink)}
      <img
        data-testid="recipe-photo"
        alt="Imagem da comida"
        src={ drinkDetail.strDrinkThumb }
      />
      <h2
        data-testid="recipe-title"
      >
        {drinkDetail.strDrink}
      </h2>
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
      <p
        data-testid="recipe-category"
      >
        {drinkDetail.strCategory}
      </p>
      <p
        data-testid="0-ingredient-name-and-measure"
      >
        Ingredientes {drinkDetail.strIngredient1}
      </p>
      <p
        data-testid="instructions"
      >
        {drinkDetail.strInstructions}
      </p>
      <video
        data-testid="video"
        src={drinkDetail.strYoutube}
      />
      <div
        data-testid="0-recomendation-card"
      >
        receitas recomendadas
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar receita
      </button>
    </div>
  );
}

export default DrinksDetails;
