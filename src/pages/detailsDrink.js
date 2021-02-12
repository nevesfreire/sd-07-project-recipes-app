import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getDrinkId } from '../services/Api';
import FoodRecom from '../components/FoodRecom';
import shareClicker from '../helpers/shareClicer';
import getArrayIngredientsAndMeasures from '../helpers/getArrayIngredientsAndMeasures';
import './details.css';

function DetailsDrink() {
  const [dataDrink, setDataDrink] = useState([]);
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
    async function calledIdDrink() {
      setDataDrink(await getDrinkId(idPathName[2]));
    }
    calledIdDrink();
  }, []);

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
      id: dataDrink[0].idDrink,
      type: 'bebida',
      area: dataDrink[0].strArea,
      category: dataDrink[0].strCategory,
      alcoholicOrNot: dataDrink[0].strAlcoholic,
      name: dataDrink[0].strDrink,
      image: dataDrink[0].strDrinkThumb,
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
        pathname: `/bebidas/${idPathName[2]}/in-progress`,
        state: dataDrink[0],
      }) }
    >
      {start ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>
  );
  console.log(dataDrink);

  const cardDrink = () => (
    <div>
      <img
        style={ { width: '30%' } }
        src={ dataDrink[0].strDrinkThumb }
        alt="imagem da receita"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ dataDrink[0].strDrink }</h1>
      <label htmlFor="shareBtn">
        <input
          type="image"
          src={ shareIcon }
          alt="share icon"
          data-testid="share-btn"
          id="shareBtn"
          onClick={ () => shareClicker('bebidas', setCopied, idPathName[2]) }
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
      {copied && <h3>Link copiado!</h3>}

      <h3 data-testid="recipe-category">{ dataDrink[0].strCategory }</h3>

      <h3>
        Ingredientes
      </h3>

      {
        getArrayIngredientsAndMeasures(dataDrink).map((obj, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {JSON.stringify(obj)}
          </p>

        ))
      }

      <h2>Instruções</h2>
      <p data-testid="instructions">{ dataDrink[0].strInstructions }</p>
      <embed
        data-testid="video"
        type="video/quicktime"
        src={ dataDrink[0].strYoutube }
      />
      <div>
        <h2>Recomendadas</h2>
        {FoodRecom()}
      </div>
      <br />
      <br />
      { !done && startRecipe() }
    </div>
  );
  return (
    <div>
      {
        dataDrink.length > ZERO ? cardDrink() : 'Carregando...'
      }
    </div>
  );
}

export default DetailsDrink;
