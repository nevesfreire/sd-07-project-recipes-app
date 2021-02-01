import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { copy } from 'clipboard-copy';
import RequestData from '../../services/RequestAPI';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import './style.css';
import { getStorage, setStorage } from '../../services/localStorage';

function RecipeDetails() {
  const [details, setDetails] = useState();
  const [favorite, setFavorite] = useState(false);
  const [recomendation, setRecomendation] = useState();
  const [inProgress, setInProgress] = useState(false);
  const { category, idReceita } = useParams();

  useEffect(() => {
    if (category === 'comidas') {
      RequestData(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceita}`,
      ).then((response) => {
        setDetails(...response.meals);
      });
    } else if (category === 'bebidas') {
      RequestData(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceita}`,
      ).then((response) => {
        setDetails(...response.drinks);
      });
    }
  }, [category, idReceita]);

  useEffect(() => {
    if (category === 'comidas') {
      RequestData(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      ).then((response) => {
        setRecomendation(...response.drinks);
      });
    } else if (category === 'bebidas') {
      RequestData(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      ).then((response) => {
        setRecomendation(...response.meals);
      });
    }
  }, [category]);

  useEffect(() => {
    const recipe = getStorage('inProgressRecipes');
    if (category === 'comidas' && recipe.meals) {
      const bool = recipe.meals.find((id) => id === idReceita);
      setInProgress(bool);
    } else if (category === 'bebidas' && recipe.cocktails) {
      const bool = recipe.cocktails.find((id) => id === idReceita);
      setInProgress(bool);
    }
  }, [category, idReceita]);

  function takeIngredients() {
    if (!details) return undefined;
    return Object.keys(details).filter(
      (info) => info.includes('Ingredient')
        && details[info] !== null
        && details[info] !== '',
    );
  }

  function takeMeasure() {
    if (!details) return undefined;
    return Object.keys(details).filter(
      (info) => info.includes('Measure')
        && details[info] !== null
        && details[info] !== '',
    );
  }

  function handleFavorite() {
  //   [{
  //     id: id-da-receita,
  //     type: comida-ou-bebida,
  //     area: area-da-receita-ou-texto-vazio,
  //     category: categoria-da-receita-ou-texto-vazio,
  //     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
  //     name: nome-da-receita,
  //     image: imagem-da-receita
  // }]
    const localFavorite = getStorage('favoriteRecipes');
    if (!favorite) {
      const addItem = [...localFavorite, details];
      setStorage('favoriteRecipes', addItem);
      setFavorite(true);
    } else {

    }
  }

  return (
    <div>
      {!details && 'Loading...'}
      {details && (
        <div>
          <img
            data-testid="recipe-photo"
            src={ details.strDrinkThumb || details.strMealThumb }
            alt="drink"
          />
          <h3 data-testid="recipe-title">
            {details.strDrink || details.strMeal}
          </h3>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => copy('Link copiado!') }
          >
            <img
              src={ shareIcon }
              alt="Compartilhar"
            />
          </button>
          {!favorite && (
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ () => handleFavorite() }
            >
              <img
                src={ whiteHeartIcon }
                alt="favoritar"
              />
            </button>
          )}
          {favorite && (
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ () => handleFavorite() }
            >
              <img
                src={ blackHeartIcon }
                alt="favoritar"
              />
            </button>
          )}
          <p data-testid="recipe-category">
            {details.strAlcoholic || details.strCategory}
          </p>
          {takeIngredients().map((ingredients, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ ingredients }
            >
              {`${details[ingredients]}  ${
                details[takeMeasure()[index]]
              }`}
            </p>
          ))}
          <p data-testid="instructions">{details.strInstructions}</p>
          {category === 'comidas' && (
            // <img data-testid="video" src={ details.strVideo } alt="video" />
            // <iframe
            //   data-testid="video"
            //   title="video"
            //   width="420"
            //   height="315"
            //   src={ details.strYoutube }
            // />
            <object
              data-testid="video"
              aria-labelledby="video"
              width="425"
              height="344"
              data={ details.strYoutube }
            />
          )}
          <p data-testid="0-recomendation-card">outros cards</p>
          { !inProgress && (
            <Link to={ `/${category}/${idReceita}/in-progress` }>
              <button
                className="footer-button"
                type="button"
                data-testid="start-recipe-btn"
              >
                Iniciar Receita
              </button>
            </Link>
          )}
          {inProgress && (
            <button
              className="footer-button"
              type="button"
              data-testid="start-recipe-btn"
            >
              Continuar Receita
            </button>

          )}
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
