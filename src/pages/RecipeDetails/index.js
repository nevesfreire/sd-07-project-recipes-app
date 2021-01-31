import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RequestData from '../../services/RequestAPI';

function RecipeDetails() {
  const [details, setDetails] = useState();
  const { category, idReceita } = useParams();
  useEffect(() => {
    if (category === 'comidas') {
      RequestData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceita}`).then((response) => {
        setDetails(...response.meals);
      });
    } else if (category === 'bebidas') {
      RequestData(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceita}`).then((response) => {
        setDetails(...response.drinks);
      });
    }
  }, [category, idReceita]);

  return (
    <div>
      {!details && 'Loading...'}
      {details && (
        <div>
          <img data-testid="recipe-photo" src={ details.strDrinkThumb } alt="drink" />
          <h3 data-testid="recipe-title">{details.strDrink}</h3>
          <button type="button" data-testid="share-btn">Compartilhar</button>
          <button type="button" data-testid="favorite-btn">Favoritar</button>
          <p data-testid="recipe-category">{details.strCategory}</p>
          {Object.keys(details).filter((info) => info.includes('Ingredient'))
            .map((ingedient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {details[ingedient]}
              </li>
            ))}
          <p data-testid="instructions">{details.strInstructions}</p>
          {category === 'comidas' && (
            <img data-testid="video" src={ details.strVideo } alt="video" />
          )}
          <p data-testid="0-recomendation-card">outros cards</p>
          <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
