import React, { useEffect, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function FoodDetails(props) {
  const {
    fetchMealId,
    isFetching,
    mealDescription: { meals },
    recomendation: { drinks },
  } = useContext(RecipesContext);

  useEffect(() => {
    const { id } = props.match.params;
    fetchMealId(id, 'comida');
  }, []);

  const listIgredient = () => {
    const list = [];
    const mealsReceived = meals[0];

    for (let index = 1; mealsReceived[`strIngredient${index}`] !== ''; index += 1) {
      list.push(`${mealsReceived[`strIngredient${index}`]} - ${mealsReceived[`strMeasure${index}`]}`);
    }
    return list;
  };

  if (isFetching || meals === undefined) return <span>Carregando...</span>;

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
              data-testid={ `${index}-ingredient-name-and-measure` }
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
        <div>
          {drinks.map((drinkRecomendation, index) => (
            <div key={ index } data-testid={ `${index}-recomendation-card` }>
              <img alt="Recomendation Photo" src={drinkRecomendation.strDrinkThumb}/>
              <p data-testid={`${index}-recomendation-title`}>{drinkRecomendation.strDrink}</p>
            </div>
          )).slice(0, 6)}
        </div>
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
      </div>
    </div>
  );
}
