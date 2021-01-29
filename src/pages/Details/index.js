import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Provider';

import { fetchDetails } from '../../services/api';

function Details({ history, match }) {
  const { results  } = useContext(Context);
  const [detailData, setDetailData] = useState({
    name: '',
    src: '',
    category: '',
    instructions: '',
    ingredients: [],
    video: '',
    tags: [],
    alcoholic: false,
  });
  const { id } = match.params;
  const { pathname } = history.location;

  useEffect(() => {

    const getIngredientsList = (list) => {
      const ingredients = Object.entries(list).reduce(getIngredients,[]);
      const measures = Object.entries(list).reduce(getMeasures,[]);

      const ingredientsList = [];

      ingredients.forEach((_, index) => {
        ingredientsList.push(`${ingredients[index]} - ${measures[index]}`);
      })

      return ingredientsList;
    }

    const getIngredients = (acc, curr) => {
      return curr[0].includes('strIngredient')
      && curr[1] !== ''
      && curr[1] !== null
      ? [...acc, curr[1]] : acc;
    };

    const getMeasures = (acc, curr) => {
      return curr[0].includes('strMeasure')
      && curr[1] !== ''
      && curr[1] !== null
      ? [...acc, curr[1]] : acc;
    };

    const fetchData = async () => {
      const api = pathname.includes('comidas') ? 'meals' : 'drinks';
      const data = await fetchDetails(id, api);
      console.log(data);

      setDetailData({
        name: data.strMeal || data.strDrink,
        src: data.strMealThumb || data.strDrinkThumb,
        category: data.strCategory,
        instructions: data.strInstructions,
        video: data.strYoutube || '',
        ingredients: getIngredientsList(data),
        tags: data.strTags ? data.strTags.trim().split(',') : [],
        alcoholic: data.strAlcoholic !== '' ? true : false,
      });
    };

    if (!results.lenght) fetchData();
    else {
      setDetailData({
        name: results[id].strMeal || results[id].strDrink,
        src: results[id].strMealThumb || results[id].strDrinkThumb,
        category: results[id].strCategory,
        instructions: results[id].strInstructions,
        video: results[id].strYoutube || '',
        ingredients: getIngredientsList(results[id]),
        tags: results[id].strTags ? results[id].strTags.trim().split(',') : [],
        alcoholic: results[id].strAlcoholic !== '' ? true : false,
      });
    }
  }, [id, pathname, results]);

  const { name, src, category, instructions, video, ingredients, tags, alcoholic } = detailData;

  return (
    <article>
      <header>
        <main>
          <p data-testid="recipe-title">{name}</p>
        </main>
        <img
          data-testid="recipe-photo"
          alt="thumbnail"
          src={src}
          width="100px"
        />
        <p data-testid="recipe-category">
          {category}
          
          {alcoholic && ' | Alcoholic'}
        </p>
        <p data-testid="instructions">
          {instructions}
        </p>
        
        {tags.lenght
          ? tags.map((tag, index) => (
            <p data-testid={`${index}-recomendation-card`}>
              {tag}
            </p>
          ))
          : <p data-testid="0-recomendation-card">{tags}</p>
        }
        <ul>
          {ingredients.map((ing, index) => (
            <li
              key={ ing }
              data-testid={`${index}-ingredient-name-and-measure`}
            >
              {ing}
            </li>
          ))}
        </ul>
          <video 
            width="200" 
            height="200"
            controls
            data-testid="video"
            src={video}
          >
            <source src={video} type="video/mp4"/>
          </video>
      </header>
      <section>
        <ul>
          <li>
            <button
              data-testid="share-btn"
            >
              Compartilhar
            </button>
          </li>
          <li>
            <button
              data-testid="favorite-btn"
            >
              Favoritar
            </button>
          </li>
          <li>
            <button
              data-testid="start-recipe-btn"
            >
              Iniciar Receita
            </button>
          </li>
        </ul>
      </section>
    </article>
  );
}

export default Details;
