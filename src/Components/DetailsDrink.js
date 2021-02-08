/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ButtonsShareAndFavDrinks from './ButtonsShareAndFavDrinks';
import RecipeIngredients from './RecipeIngredients';
import RecomendationCards from './RecomendationCards';
import RecipesContext from '../context/RecipesContext';

function DetailsDrink() {
  const {
    setIdParams,
    recipe,
    setRecipe,
    recipeIngredients,
    setRecipeIngredients,
  } = useContext(RecipesContext);
  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useState(false);
  const { id } = useParams();
  const zero = 0;
  const fifteen = 15;
  const twentyOne = 21;
  const fiftyOne = 51;
  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const drinks = await response.json();
      setRecipe(drinks.drinks[0]);
      setLoading(false);
      const array = Object.values(drinks.drinks[0]).slice(twentyOne, fiftyOne);
      const pos = array.indexOf(null);
      const ingredients = array.map((ingredient, index) => {
        if (array[index + fifteen] === null) {
          return { [ingredient]: '' };
        }
        return { [ingredient]: array[index + fifteen] };
      });
      const allingredients = ingredients.slice(zero, pos);
      setRecipeIngredients(allingredients);
    };
    fetchRecipe();
    setIdParams(id);
  }, [id]);

  if (!loading) {
    const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = recipe;
    return (
      <div
        style={ {
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        } }
      >
        <img
          src={ strDrinkThumb }
          data-testid="recipe-photo"
          alt="recipe"
          style={ { marginTop: '10px', width: '80%', borderRadius: '15px' } }
        />
        <ButtonsShareAndFavDrinks fav={ fav } setFav={ setFav } recipe={ recipe } />
        <h1 data-testid="recipe-title">{strDrink}</h1>
        <h5
          style={ { margin: '15px', fontStyle: 'italic' } }
          data-testid="recipe-category"
        >
          { strAlcoholic }
        </h5>
        <h5 style={ { margin: '2px', color: 'maroon' } }>Ingredientes:</h5>
        <RecipeIngredients recipeIngredients={ recipeIngredients } />
        <h5 style={ { margin: '15px 2px 2px 2px', color: 'maroon' } }>Instruções:</h5>
        <p
          data-testid="instructions"
          style={ {
            backgroundColor: '#c4c4c4',
            margin: '2px 10px 30px 10px',
            padding: '3px',
            borderRadius: '0 0 20px 20px',
            width: '100%' } }
        >
          {strInstructions}
        </p>
        <RecomendationCards type="bebida" />
      </div>
    );
  }
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export default DetailsDrink;
