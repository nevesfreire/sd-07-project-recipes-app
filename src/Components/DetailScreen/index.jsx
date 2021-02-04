import React, { useEffect, useState } from 'react';
import { fetchAllCocktails, singleCocktail } from '../../API/apiCocktails';
import { fetchAllRecipes, singleMeal } from '../../API/apiMeals';
import RecomendationCard from '../RecomedationCard';

const DetailScreen = (props) => {
  const { page, id } = props;
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [recommendation, setRecomendation] = useState([]);

  const resolveFetch = (resolve) => {
    setRecipe(resolve);
    setIngredients(resolve.ingredients);
    setMeasure(resolve.measurements);
  };

  useEffect(() => {
    if (page === 'comidas') {
      singleMeal(id).then(resolveFetch);
      fetchAllCocktails('', '', 's').then((resolve) => setRecomendation(resolve));
    } else {
      singleCocktail(id).then(resolveFetch);
      fetchAllRecipes('', '', 's').then((resolve) => setRecomendation(resolve));
    }
  }, [page, id]);

  const recommendationMount = (arrRecommendation) => {
    const maxSize = 6;
    const minSize = 0;
    const keyObject = page === 'comidas' ? 'Drink' : 'Meal';
    if (arrRecommendation.length === minSize) {
      return null;
    }
    return (
      <>
        {arrRecommendation.slice(minSize, maxSize).map((elem, index) => (
          <RecomendationCard
            key={ elem[`str${keyObject}`] }
            thumb={ elem[`str${keyObject}Thumb`] }
            foodName={ elem[`str${keyObject}`] }
            index={ index }
            page={ page }
            idFood={ elem[`id${keyObject}`] }
          />
        ))}
      </>
    );
  };

  return (
    <div>
      <img
        src={ recipe.imgRecipe }
        alt=""
        width="200px"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{recipe.nameRecipe}</p>
      <button type="button" data-testid="share-btn">
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn">
        Favoritar
      </button>
      <p data-testid="recipe-category">
        {`${recipe.categoryRecipe} - ${recipe.alcoholic}`}
      </p>
      <ul>
        {ingredients.map((elem, index) => (
          <li key={ elem } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${elem} - ${measure[index]}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{recipe.instructionRecipe}</p>
      <div className="container-video">
        <div className="video" data-testid="video" />
      </div>
      <div className="container-cards">
        {recommendationMount(recommendation)}
      </div>
      <button
        className="btn-start"
        data-testid="start-recipe-btn"
        type="button"
      >
        Iniciar Receita
      </button>
    </div>
  );
};

export default DetailScreen;
