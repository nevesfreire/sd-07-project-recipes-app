import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchFoodDetailById } from '../services/foodApiFunctions';
import './recipedetails.css';

function RecipesDetails() {
  const {
    foodDetail,
    setFoodDetail,
  } = useContext(RecipesContext);

  const fetchDetails = async () => {
    const details = await fetchFoodDetailById(52771);
    setFoodDetail(details.meals[0]);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      {console.log(foodDetail.idMeal)}
      <img
        data-testid="recipe-photo"
        alt="Imagem da comida"
        src={ foodDetail.strMealThumb }
      />
      <h2
        data-testid="recipe-title"
      >
        {foodDetail.strMeal}
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
        {foodDetail.strCategory}
      </p>
      <p
        data-testid="0-ingredient-name-and-measure"
      >
        Ingredientes {foodDetail.strIngredient1}
      </p>
      <p
        data-testid="instructions"
      >
        {foodDetail.strInstructions}
      </p>
      <video
        data-testid="video"
        src={foodDetail.strYoutube}
      />
      <div
        data-testid="0-recomendation-card"
      >
        receitas recomendadas
      </div>
      <button
        className="button"
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar receita
      </button>
    </div>
  );
}

export default RecipesDetails;
