import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import './recipedetails.css';
import { fetchFoodDetailById } from '../services/foodApiFunctions';
import { fetchAllDrinkRecipes } from '../services/drinkApiFunctions';

import './recipes.css';

function RecipesDetails(props) {
  const [ingredients, setIngredients] = useState([]);
  const [recomended, setRecomendedDrinks] = useState([]);

  const {
    foodDetail,
    setFoodDetail,
    setId,
    id,
  } = useContext(RecipesContext);

  const copyCliboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/comidas/${id}`);
    window.alert('Link copiado!');
  };

  const recomendedDrink = async () => {
    const allDrinks = await fetchAllDrinkRecipes();
    const sixDrinks = allDrinks.drinks.slice(0, 6);
    console.log(sixDrinks);
    setRecomendedDrinks(sixDrinks);
  };

  const recipesIngredients = () => {
    const allIngredients = [];
    for (let i = 0; i <= 50 ; i++) {
      if (foodDetail[`strIngredient${i}`]) {
        allIngredients.push({ nomeIngrediente: foodDetail[`strIngredient${i}`], medida: foodDetail[`strMeasure${i}`]});
      }
    }

    setIngredients(allIngredients);
  };

  const randomId = async () => {
    const { match } = props;
    const id = match.params.id
    setId(id);
    const details = await fetchFoodDetailById(id);
    console.log(details);
    setFoodDetail(details.meals[0]);
  };

  useEffect(() => {
    recomendedDrink();
    randomId();
  }, []);

  useEffect(() => {
    recipesIngredients();
  }, [foodDetail]);

  return (
    <div>
      {console.log('Console do Food Detail', foodDetail)}
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
        onClick={ copyCliboard }
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
      <div>
        Ingredientes
        {
          ingredients.map(
            (item, index) => (
              <span
                key={ index }
              >
                <p
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { `${item.nomeIngrediente} ${item.medida}` }
                </p>
              </span>
            ),
          )
        }
      </div>
      <p
        data-testid="instructions"
      >
        {foodDetail.strInstructions}
      </p>
      <video
        data-testid="video"
        src={foodDetail.strYoutube}
      />
      <div>
        Receitas recomendadas
        {
          recomended.map(
            (item, index) => (
              <span
                data-testid={ `${index}-recomendation-card` }
                key={ index }
              >
                <img alt="recomendadas" src={ item.strDrinkThumb } />
              </span>
            ),
          )
        }
      </div>
      <Link to={ `/comidas/${id}/in-progress` }>
        <button
          className="iniciarReceita"
          type="button"
          data-testid="start-recipe-btn"
        >
          Iniciar receita
        </button>
      </Link>
    </div>
  );
}

export default RecipesDetails;
