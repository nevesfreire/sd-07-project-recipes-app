import React, { useEffect, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function FoodDetails() {
  const {
    fetchMealId,
    isFetching,
    mealDescription: { meals },
  } = useContext(RecipesContext);

  useEffect(() => {
    fetchMealId('52773');
  }, [fetchMealId]);

  const listIgredient = () => {
    const list = [];
    const mealsReceived = meals[0];

    for (let index = 1; mealsReceived[`strIngredient${index}`] !== ''; index += 1) {
      list.push(`${mealsReceived[`strIngredient${index}`]}`);
    }
    return list;
  };

  if (isFetching) return <span>Carregando...</span>;

  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt="Imagem da receita"
        src={ meals[0].strMealThumb }
      />
      <p data-testid="recipe-title">{meals[0].strMeal}</p>
      <div>
        <button data-testid="share-btn" type="button">Compartilhar</button>
        <button data-testid="favorite-btn" type="button">Favoritar</button>
        <p data-testid="recipe-category">{meals[0].strCategory}</p>
        <ol className="list-ingredients">
          {listIgredient().map((content, index) => (
            <li
              key={ index }
              data-testid={ `${index + 1}-ingredient-name-and-measure` }
            >
              {content}
            </li>
          ))}
        </ol>
        <p data-testid="instructions">
          {meals[0].strInstructions}
        </p>
        <iframe
          data-testid="video"
          title={ meals[0].strMeal }
          id="ytplayer"
          type="text/html"
          width="640"
          height="360"
          src={ meals[0].strYoutube }
          frameBorder="0"
        />
      </div>
    </div>
  );
}
