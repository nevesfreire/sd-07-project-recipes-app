import React/* , { useEffect } */ from 'react';
import { useParams, useLocation } from 'react-router-dom';
// import { /* useSelector, */ useDispatch } from 'react-redux';

import { FavoriteButton } from '../../components';
import { mapIngredientsAndMeasuresToList } from '../../services/helper';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const { pathname } = useLocation();
  // const dispatch = useDispatch();
  // const detailsRecipe = useSelector((state) => state.recipes.detailsRecipe);

  console.log('recipeId:', recipeId);
  console.log('pathname:', pathname);

  const mockRecipeDetails = {
    type: 'meal',
    id: '52772',
    name: 'Teriyaki Chicken Casserole',
    strDrinkAlternate: null,
    strCategory: 'Chicken',
    strArea: 'Japanese',
    strInstructions: `Preheat oven to 350° F. Spray a 9x13-inch baking pan 
    with non-stick spray.
    Combine soy sauce, ½ cup water, brown sugar, ginger and garlic in a small 
    saucepan and cover. Bring to a boil over medium heat. Remove lid and cook 
    for one minute once boiling.\r
    Meanwhile, stir together the corn starch and 2 tablespoons of water in a 
    separate dish until smooth. Once sauce is boiling, add mixture to the saucepan
    and stir to combine. Cook until the sauce starts to thicken then remove from heat.\r
    Place the chicken breasts in the prepared pan. Pour one cup of the sauce over top 
    of chicken. Place chicken in oven and bake 35 minutes or until cooked through. 
    Remove from oven and shred chicken in the dish using two forks.\r
    *Meanwhile, steam or cook the vegetables according to package directions.\r
    Add the cooked vegetables and rice to the casserole dish with the chicken. 
    Add most of the remaining sauce, reserving a bit to drizzle over the top 
    when serving. 
    Gently toss everything together in the casserole dish until combined. 
    Return to oven and cook 15 minutes. Remove from oven and let stand 5 minutes 
    before serving. 
    Drizzle each serving with remaining sauce. Enjoy!`,
    strThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strTags: 'Meat,Casserole',
    strYoutube: 'https://www.youtube.com/watch?v=4aZr5hZXP_s',
    strIngredient1: 'soy sauce',
    strIngredient2: 'water',
    strIngredient3: 'brown sugar',
    strIngredient4: 'ground ginger',
    strIngredient5: 'minced garlic',
    strIngredient6: 'cornstarch',
    strIngredient7: 'chicken breasts',
    strIngredient8: 'stir-fry vegetables',
    strIngredient9: 'brown rice',
    strIngredient10: '',
    strIngredient11: '',
    strIngredient12: '',
    strIngredient13: '',
    strIngredient14: '',
    strIngredient15: '',
    strIngredient16: null,
    strIngredient17: null,
    strIngredient18: null,
    strIngredient19: null,
    strIngredient20: null,
    strMeasure1: '3/4 cup',
    strMeasure2: '1/2 cup',
    strMeasure3: '1/4 cup',
    strMeasure4: '1/2 teaspoon',
    strMeasure5: '1/2 teaspoon',
    strMeasure6: '4 Tablespoons',
    strMeasure7: '2',
    strMeasure8: '1 (12 oz.)',
    strMeasure9: '3 cups',
    strMeasure10: '',
    strMeasure11: '',
    strMeasure12: '',
    strMeasure13: '',
    strMeasure14: '',
    strMeasure15: '',
    strMeasure16: null,
    strMeasure17: null,
    strMeasure18: null,
    strMeasure19: null,
    strMeasure20: null,
    strSource: null,
    dateModified: null,
  };

  // VERIFICAR ROTA PARA SABER SE É DETALHE OU PROGRESSO

  // OBTER RECEITA PELO ID >> MAPEAR EM DATAILS_RECIPE
  // fetch da receita por ID caso o detalhe no redux não esteja preenchido
  /*  useEffect(() => {
    dispatch('USAR FETCH GET RECIPE BY ID' recipeId);
  }, [recipeId]); */

  // VERIFICAR SE RECEITA É FAVORITA
  // MAPEIA DO REDUX >> favoriteRecipes
  // VERIFICA SE O ARRAY TEM UM OBJETO COM O ID DA RECEITA, SE SIM, SALVA NO ESTADO

  // VERIFICAR SE RECEITA ESTÁ EM PROGRESSO
  // MAPEIA DO REDUX >> inProgressRecipes
  // SE FOR COMIDA >> inProgressRecipes.meals[recipeId]
  // SE FOR COMIDA >> inProgressRecipes.meals[recipeId]
  // SE ESTIVER EM PROGRESSO - COMPARAR INGREDIENTES

  return (
    <>
      <img src={ mockRecipeDetails.strThumb } alt="Recipe" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{mockRecipeDetails.name}</h1>
      <FavoriteButton recipeId={ mockRecipeDetails.id } />
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <h3 data-testid="recipe-category">
        {mockRecipeDetails.strCategory || 'Tipo Bebida'}
      </h3>
      <ul>
        {
          mapIngredientsAndMeasuresToList(mockRecipeDetails).map(({ text }, index) => (
            <li
              key={ text }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {text}
            </li>
          ))
        }
        <h3 data-testid="instructions">
          {mockRecipeDetails.strInstructions}
        </h3>
        { pathname.includes('comidas')
          && <iframe
            title="RecipeVideo"
            width="320"
            height="315"
            src={ mockRecipeDetails.strYoutube }
          />}
      </ul>
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar receita
      </button>
    </>
  );
};

export default RecipeDetails;
