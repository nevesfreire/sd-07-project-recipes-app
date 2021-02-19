import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getFoodId } from '../services/Api';
import DrinkRecom from '../components/DrinkRecom';
import getArrayIngredientsAndMeasures from '../helpers/getArrayIngredientsAndMeasures';
import './details.css';

function DetailsFood() {
  const [dataFood, setDataFood] = useState([]);
  const [done] = useState(false);
  const [copied, setCopied] = useState(false);
  const [start] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const history = useHistory();
  const { push } = useHistory();
  const path = history.location.pathname;
  const idPathName = path.split('/');
  const ZERO = 0;

  useEffect(() => {
    async function calledIdFood() {
      setDataFood(await getFoodId(idPathName[2]));
    }
    calledIdFood();
  }, []);

  const shareClicker = () => {
    setCopied(true);
    return copy(`http://localhost:3000/comidas/${idPathName[2]}`);
  };

  const getFavorited = () => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipes) {
      return recipes[0].id === idPathName[2]
        ? setFavorited(!favorited)
        : setFavorited(false);
    } setFavorited(false);
  };

  useEffect(() => {
    function favorit() {
      getFavorited();
    }
    favorit();
  }, []);

  const favoriteRecipe = () => {
    const recipeFavorited = [{
      id: dataFood[0].idMeal,
      type: 'comida',
      area: dataFood[0].strArea,
      category: dataFood[0].strCategory,
      alcoholicOrNot: '',
      name: dataFood[0].strMeal,
      image: dataFood[0].strMealThumb,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeFavorited));
    return getFavorited();
  };

  const startRecipe = () => (
    <button
      className="startRecipeBtn"
      type="button"
      data-testid="start-recipe-btn"
      onClick={ () => push({
        pathname: `/comidas/${idPathName[2]}/in-progress`,
        state: dataFood[0],
      }) }
    >
      {start ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>
  );

  const cardFood = () => (
    <div>
      <img
        style={ { width: '30%' } }
        src={ dataFood[0].strMealThumb }
        alt="imagem da receita"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ dataFood[0].strMeal }</h1>
      <label htmlFor="shareBtn">
        <input
          type="image"
          src={ shareIcon }
          alt="share icon"
          data-testid="share-btn"
          id="shareBtn"
          onClick={ () => shareClicker() }
        />
      </label>

      <label htmlFor="favoriteBtn">
        <input
          type="image"
          src={ favorited ? blackHeartIcon : whiteHeartIcon }
          alt="favorite icon"
          data-testid="favorite-btn"
          id="favoriteBtn"
          onClick={ () => favoriteRecipe() }
        />
      </label>

      <h3 data-testid="recipe-category">{ dataFood[0].strCategory }</h3>

      {copied && <h3>Link copiado!</h3>}

      <h3>
        Ingredientes
      </h3>

      {
        getArrayIngredientsAndMeasures(dataFood).map((obj, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {JSON.stringify(obj)}
          </p>
        ))
      }

      <h2>Instruções</h2>
      <p data-testid="instructions">{ dataFood[0].strInstructions }</p>
      <embed
        data-testid="video"
        type="video/quicktime"
        src={ dataFood[0].strYoutube }
      />
      <div>
        <h2>Recomendadas</h2>
        {DrinkRecom()}
      </div>
      <br />
      <br />
      { !done && startRecipe() }
    </div>
  );
  return (
    <div>
      {
        dataFood.length > ZERO ? cardFood() : 'Carregando...'
      }
    </div>
  );
}

export default DetailsFood;
