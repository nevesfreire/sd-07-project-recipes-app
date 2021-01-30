import React, { useEffect, useState, useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import ButtonsShareAndFavFood from './ButtonsShareAndFavFood';
import ProgressIngredients from './ProgressIngredients';
import RecipesContext from '../context/RecipesContext';
import FinishButtonDrink from './FinishButtonDrink';

function ProgressFood() {
  const {
    setIdParams,
    recipe,
    setRecipe,
    recipeIngredients,
    setRecipeIngredients,
    counter,
    finishRecipe,
    setFinisRecipe,
  } = useContext(RecipesContext);
  const [loading, setLoading] = useState(true);
  const [finished, setFinnished] = useState(false);
  const [fav, setFav] = useState(false);
  const { id } = useParams();
  const zero = 0;
  const fifteen = 15;
  const twentyOne = 21;
  const fiftyOne = 51;
  useEffect(() => {
    setIdParams(id);
  }, []);

  useEffect(() => {
    if (recipeIngredients.length > zero && counter >= recipeIngredients.length) {
      setFinisRecipe(true);
    }
  }, [counter]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const drink = await response.json();
      setRecipe(drink.drinks[0]);
      setLoading(false);
      const array = Object.values(drink.drinks[0]).slice(twentyOne, fiftyOne);
      const pos = array.indexOf(null || '');
      const ingredients = array.map((ingredient, index) => {
        if (array[index + fifteen] === null) {
          return { [ingredient]: '' };
        }
        return { [ingredient]: array[index + fifteen] };
      });
      const allingredients = ingredients.slice(zero, pos);
      setRecipeIngredients(allingredients);
      // const storageIngredients = JSON.parse(
      //   window.localStorage.getItem('inProgressRecipes'),
      // );
      // if (storageIngredients) {
      //   const { meals } = storageIngredients;
      //   if (meals[id]) {
      //     setRecipeIngredients(meals[id]);
      //   }
      // }
    };
    fetchRecipe();
  }, [id]);

  if (finished) {
    return <Redirect to="/receitas-feitas" />;
  }

  if (!loading) {
    const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = recipe;
    return (
      <div>
        <img src={ strDrinkThumb } data-testid="recipe-photo" alt="" />
        <ButtonsShareAndFavFood fav={ fav } setFav={ setFav } recipe={ recipe } />
        <h1 data-testid="recipe-title">{strDrink}</h1>
        <h3 data-testid="recipe-category">{strAlcoholic}</h3>
        <ProgressIngredients recipeIngredients={ recipeIngredients } />
        <p data-testid="instructions">{strInstructions}</p>
        <FinishButtonDrink
          finishRecipe={ finishRecipe }
          setFinnished={ setFinnished }
          recipe={ recipe }
        />
      </div>
    );
  }
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export default ProgressFood;

// import React, { useEffect, useState, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import ButtonsShareAndFavDrinks from './ButtonsShareAndFavDrinks';
// import RecipeIngredients from './RecipeIngredients';
// import RecomendationCards from './RecomendationCards';
// import RecipesContext from '../context/RecipesContext';

// function ProgressDrink() {
//   const {
//     setIdParams,
//     recipe,
//     setRecipe,
//     recipeIngredients,
//     setRecipeIngredients,
//   } = useContext(RecipesContext);
//   const [loading, setLoading] = useState(true);
//   const [fav, setFav] = useState(false);
//   // const [recipeIngredients, setRecipeIngredients] = useState([]);
//   const { id } = useParams();
//   const zero = 0;
//   const fifteen = 15;
//   const twentyOne = 21;
//   const fiftyOne = 51;
//   useEffect(() => {
//     const fetchRecipe = async () => {
//       const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
//       const drinks = await response.json();
//       setRecipe(drinks.drinks[0]);
//       setLoading(false);
//       const array = Object.values(drinks.drinks[0]).slice(twentyOne, fiftyOne);
//       const pos = array.indexOf(null);
//       const ingredients = array.map((ingredient, index) => {
//         if (array[index + fifteen] === null) {
//           return { [ingredient]: '' };
//         }
//         return { [ingredient]: array[index + fifteen] };
//       });
//       const allingredients = ingredients.slice(zero, pos);
//       setRecipeIngredients(allingredients);
//     };
//     fetchRecipe();
//     setIdParams(id);
//   }, [id]);

//   if (!loading) {
//     const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = recipe;
//     return (
//       <div>
//         <img src={ strDrinkThumb } data-testid="recipe-photo" alt="" />
//         <ButtonsShareAndFavDrinks fav={ fav } setFav={ setFav } recipe={ recipe } />
//         <h1 data-testid="recipe-title">{strDrink}</h1>
//         <h3 data-testid="recipe-category">{ strAlcoholic }</h3>
//         <RecipeIngredients recipeIngredients={ recipeIngredients } />
//         <p data-testid="instructions">{strInstructions}</p>
//         <RecomendationCards type="bebida" />
//       </div>
//     );
//   }
//   return (
//     <div>
//       <h1>Loading...</h1>
//     </div>
//   );
// }

// export default ProgressDrink;
