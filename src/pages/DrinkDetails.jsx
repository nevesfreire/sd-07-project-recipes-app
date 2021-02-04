import React, { useEffect, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function DrinkDetails(props) {
  const {
    fetchMealId,
    isFetching,
    mealDescription: { drinks },
    recomendation: { meals },
  } = useContext(RecipesContext);

  useEffect(() => {
    const { id } = props.match.params;
    fetchMealId(id);
  }, []);

  const listIgredient = () => {
    const list = [];
    const mealsReceived = drinks[0];

    for (let index = 1; mealsReceived[`strIngredient${index}`] !== null; index += 1) {
      list.push(`${mealsReceived[`strIngredient${index}`]} - ${mealsReceived[`strMeasure${index}`]}`);
    }
    return list;
  };

  if (isFetching || drinks === undefined) return <span>Carregando...</span>;

  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt="Imagem da receita"
        src={ drinks[0].strDrinkThumb }
      />
      <p data-testid="recipe-title">{drinks[0].strDrink}</p>
      <div>
        <button data-testid="share-btn" type="button">Compartilhar</button>
        <button data-testid="favorite-btn" type="button">Favoritar</button>
        <p data-testid="recipe-category">{drinks[0].strAlcoholic}</p>
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
          {drinks[0].strInstructions}
        </p>
        <iframe
          data-testid="video"
          title={ drinks[0].strDrink }
          id="ytplayer"
          type="text/html"
          width="640"
          height="360"
          src={ drinks[0].strYoutube }
          frameBorder="0"
        />
        <div>
          {meals.map((mealRecomendation, index) => (
            <div key={ index } data-testid={ `${index}-recomendation-card` }>
              <img alt="Recomendation Photo" src={mealRecomendation.strMealThumb}/>
              <p data-testid={`${index}-recomendation-title`}>{mealRecomendation.strMeal}</p>
            </div>
          )).slice(0, 6)}
        </div>
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
      </div>
    </div>
  );
}
